"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { usePathname, useRouter } from "next/navigation";
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Playlist } from "@/types";

import { useUpdatePlaylistModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";

import Modal from "../Modal";
import HeaderButton from "../layout/HeaderButton";
import Input from "../shared/Input";
import MutipleSelect from "../shared/MutipleSelect";

import { deleteStogare } from "@/utils/deleteRecord";
import { mapRelationshipToOption } from "@/utils/mappingRelationship";
import { compareObjects } from "@/utils/compareRelationship";
import useFetchArtists from "@/hooks/useFetchArtists";
import useFetchSongs from "@/hooks/useFetchSongs";

const UpdatePlaylistModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();
  const { onClose, isOpen, id } = useUpdatePlaylistModal();
  const artistsResult = useFetchArtists({ isOpen });
  const songsResult = useFetchSongs({ isOpen });

  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useState<Playlist>();
  const [relationshipSongPlaylist, setRelationshipSongPlaylist] = useState<
    any[]
  >([]);
  const [artistOption, setArtistOption] = useState<any>(null);
  const [songOption, setSongOption] = useState<any>(null);
  const [tempSongOption, setTempSongOption] = useState<any[]>([]);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return playlist;
    }, [playlist]),
  });

  useEffect(() => {
    const fetchCurrentPlaylist = async (id: string) => {
      const { data, error } = await supabaseClient
        .from("playlist")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        return toast.error(error.message);
      }
      setPlaylist(data);
    };
    const fetchRelationshipSongPlaylist = async (id: string) => {
      const { data, error } = await supabaseClient
        .from("rel_song_playlist")
        .select("*")
        .eq("playlist_id", id);
      if (error) {
        return toast.error(error.message);
      }
      setRelationshipSongPlaylist(data || []);
    };
    if (isOpen) {
      setIsLoading(true);
      fetchCurrentPlaylist(id);
      fetchRelationshipSongPlaylist(id);
      setIsLoading(false);
    }
  }, [id, isOpen, supabaseClient]);

  // rerender form to update default value
  useEffect(() => {
    reset(playlist);
  }, [reset, playlist]);

  // get relationship by playlist id
  useEffect(() => {
    const artist = artistsResult.artists.find(
      (artist) => artist.id === playlist?.artist_id
    );
    setArtistOption({
      value: artist?.id.toString(),
      label: artist?.name,
    });
  }, [artistsResult.artists, id, playlist?.artist_id]);

  // map previous options
  useEffect(() => {
    const updatedPlaylistOption = mapRelationshipToOption(
      relationshipSongPlaylist,
      "song_id",
      songsResult.songs
    );
    setSongOption(updatedPlaylistOption);
    setTempSongOption(updatedPlaylistOption);
  }, [relationshipSongPlaylist, songsResult.songs]);

  // map all option to select
  const allArtistOption = artistsResult.artists.map((artist) => ({
    value: artist.id.toString(),
    label: artist.name,
  }));
  const allSongOption = songsResult.songs.map((song) => ({
    value: song.id.toString(),
    label: song.title,
  }));

  const remainingSongOption = allSongOption.filter(
    (song) => !tempSongOption.some((temp) => temp.value === song.value)
  );

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };
  const handleArtistChange = (artistOption: any) => {
    setArtistOption(artistOption);
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
        artist_id: artistOption.value,
      };
      if (imageFile && playlist) {
        // delete old image
        await deleteStogare(supabaseClient, "images", playlist.image_path);
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

      // update playlist
      const { error: supabaseError } = await supabaseClient
        .from("playlist")
        .update(playlistUpdateData)
        .eq("id", id);

      // compare old option with current option
      const [addedSongItems, removedSongItems] = compareObjects(
        tempSongOption,
        songOption
      );

      // update relationship
      // remove deleted relationship
      for (const removedSong of removedSongItems) {
        const { error: removeError } = await supabaseClient
          .from("rel_song_playlist")
          .delete()
          .eq("playlist_id", id)
          .eq("song_id", removedSong.value);
        if (removeError) {
          setIsLoading(false);
          return toast.error("Failed to remove song");
        }
      }
      // add new relationship
      for (const addedSong of addedSongItems) {
        const { error: addError } = await supabaseClient
          .from("rel_song_playlist")
          .insert({
            song_id: addedSong.value,
            playlist_id: id,
          });
        if (addError) {
          setIsLoading(false);
          return toast.error("Failed to add song relationship");
        }
      }

      // refresh page
      router.refresh();
      setIsLoading(false);
      toast.success("Playlist updated!");
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
      title={
        pathname === "/dashboard/playlists"
          ? "Update playlist"
          : "Update your playlist!"
      }
      description=""
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
              value={artistOption}
              options={allArtistOption}
              onChange={handleArtistChange}
              isDisabled={isLoading}
            />
          </div>
        )}
        <div className=" flex flex-col space-y-2">
          <label htmlFor="song">Update Songs</label>
          <MutipleSelect
            id="song"
            value={songOption}
            options={remainingSongOption}
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
