"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { usePathname, useRouter } from "next/navigation";
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Artist, Song } from "@/types";

import { useUpdatePlaylistModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import Modal from "../Modal";
import HeaderButton from "../layout/HeaderButton";
import Input from "../shared/Input";
import MutipleSelect from "../shared/MutipleSelect";
import { fetchRecordData } from "@/utils/selectRecord";
import { deleteStogare } from "@/utils/deleteRecord";

const UpdatePlaylistModal = ({
  artists,
  songs,
}: {
  artists: Artist[];
  songs: Song[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { onClose, isOpen, id } = useUpdatePlaylistModal();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useState<any>(null);
  const [artistOption, setArtistOption] = useState<any>(null);
  const [songOption, setSongOption] = useState<any>(null);
  // const currentUser = useCurrentUser();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return playlist;
    }, [playlist]),
  });
  // rerender form to update default value
  useEffect(() => {
    reset(playlist);
  }, [reset, playlist]);

  useEffect(() => {
    const fetchRecord = async () => {
      const data = await fetchRecordData(supabaseClient, "playlist", id);
      setPlaylist(data);
    };
    if (isOpen) {
      fetchRecord();
    }
  }, [isOpen, id]);

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };
  const handleArtistChange = (artistOption: any) => {
    setArtistOption(artistOption);
    // console.log(artistOption.label);
  };
  const handleSongChange = (songOption: any) => {
    setSongOption(songOption);
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      const uniqueID = uniqid();
      setIsLoading(true);
      const imageFile = values.image?.[0];
      if (!user) {
        toast.error("Missing user");
        return;
      }
      // update Playlist
      const playlistUpdateData: any = {
        name: values.name,
        description: values.description,
      };
      if (imageFile) {
        if (playlist.image_path) {
          // delete old image
          await deleteStogare(supabaseClient, "images", playlist.image_path);
        }

        // update playlist with new image
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(`playlist/${uniqueID}`, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });
        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed to upload image");
        }
        playlistUpdateData.image_path = imageData.path;
      }

      // TODO: change to update{playlistUpdateData}
      // update playlist
      const { data: playlistID, error: supabaseError } = await supabaseClient
        .from("playlist")
        .insert({
          name: values.name,
          description: values.description,
          user_id: user.id,
          artist_id: artistOption!.value,
          // user_id: currentUser?.role === "admin" ? user.id : "admin",
        })
        .select();
      // insert relationship
      if (playlistID && songOption) {
        const { error: relationshipError } = await supabaseClient
          .from("rel_song_playlist")
          .insert(
            songOption.map((song: any) => ({
              song_id: song.value,
              playlist_id: playlistID[0].id,
            }))
          );
        if (relationshipError) {
          setIsLoading(false);
          return toast.error(relationshipError.message);
        }
      }
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Playlist created");
      reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Update a playlist"
      description={
        pathname === "/dashboard/playlists" ? "" : "Create your own playlist!"
      }
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className=" flex flex-col space-y-4"
      >
        <div className=" flex flex-col space-y-2">
          <label htmlFor="name">Playlist Name</label>
          <Input
            id="name"
            disabled={isLoading}
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="description">Playlist Description</label>
          <Input
            id="description"
            disabled={isLoading}
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="image">Playlist Image</label>
          {/* only accept image files */}
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            placeholder="Image"
            accept="
            .png,
            .jpeg,
            .jpg,
            "
            {...register("image", { required: false })}
          />
        </div>
        {/* only show artist if the path is /dashboard/playlists*/}
        {pathname === "/dashboard/playlists" && (
          <div className=" flex flex-col space-y-2">
            <label htmlFor="artist">Artist (if this is an Album)</label>
            <MutipleSelect
              id="artist"
              options={artists.map((artist) => ({
                value: artist.id.toString(),
                label: artist.name,
              }))}
              onChange={handleArtistChange}
              isDisabled={isLoading}
            />
          </div>
        )}
        <div className=" flex flex-col space-y-2">
          <label htmlFor="song">Update Songs</label>
          <MutipleSelect
            id="song"
            options={songs.map((song) => ({
              value: song.id.toString(),
              label: song.title,
            }))}
            onChange={handleSongChange}
            isDisabled={isLoading}
            isMulti
          />
        </div>
        <HeaderButton disabled={isLoading} type="submit" className="rounded-md">
          Update
        </HeaderButton>
      </form>
    </Modal>
  );
};

export default UpdatePlaylistModal;
