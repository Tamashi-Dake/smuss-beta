"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";

import { useUpdateSongModal } from "@/hooks/useModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUser } from "@/hooks/useUser";
import Modal from "../Modal";
import HeaderButton from "../layout/HeaderButton";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";
import MutipleSelect from "../shared/MutipleSelect";
import { Song } from "@/types";
import { mapRelationshipToOption } from "@/utils/mappingRelationship";
import { compareObjects } from "@/utils/compareRelationship";
import useFetchAlbumAndPlaylist from "@/hooks/useFetchAlbum&Playlist";
import useFetchCategories from "@/hooks/useFetchCategories";
import useFetchArtists from "@/hooks/useFetchArtists";

const UpdateSongModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { onClose, isOpen, id } = useUpdateSongModal();
  const { user } = useUser();
  const currentUser = useCurrentUser();
  const artistsResult = useFetchArtists({ isOpen });
  const categoriesResult = useFetchCategories({ isOpen });
  const playlistsResult = useFetchAlbumAndPlaylist({ isOpen });

  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song>();
  const [relationshipArtist, setRelationshipArtist] = useState<any[]>([]);
  const [relationshipCategory, setRelationshipCategory] = useState<any[]>([]);
  const [relationshipPlaylist, setRelationshipPlaylist] = useState<any[]>([]);
  const [artistOption, setArtistOption] = useState<any[]>([]);
  const [categoryOption, setCategoryOption] = useState<any[]>([]);
  const [playlistOption, setPlaylistOption] = useState<any[]>([]);
  const [tempArtistOption, setTempArtistOption] = useState<any[]>([]);
  const [tempCategoryOption, setTempCategoryOption] = useState<any[]>([]);
  const [tempPlaylistOption, setTempPlaylistOption] = useState<any[]>([]);

  // set default value for form
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return song;
    }, [song]),
  });

  useEffect(() => {
    const fetchCurrentSong = async (id: string) => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        return toast.error(error.message);
      }
      setSong(data);
    };
    const fetchRelationships = async (id: string) => {
      const { data: artistData, error: artistError } = await supabaseClient
        .from("rel_song_artist")
        .select("*")
        .eq("song_id", id);
      if (artistError) {
        return toast.error(artistError.message);
      }
      const { data: categoryData, error: categoryError } = await supabaseClient
        .from("rel_song_category")
        .select("*")
        .eq("song_id", id);
      if (categoryError) {
        return toast.error(categoryError.message);
      }
      const { data: playlistData, error: playlistError } = await supabaseClient
        .from("rel_song_playlist")
        .select("*")
        .eq("song_id", id);
      if (playlistError) {
        return toast.error(playlistError.message);
      }
      setRelationshipArtist(artistData);
      setRelationshipCategory(categoryData);
      setRelationshipPlaylist(playlistData);
    };
    if (isOpen) {
      fetchCurrentSong(id);
      fetchRelationships(id);
    }
  }, [id, isOpen, supabaseClient]);

  // rerender form to update default value
  useEffect(() => {
    reset(song);
    // console.log(song);
  }, [reset, song]);

  // map previous option
  useEffect(() => {
    const updatedArtistOption = mapRelationshipToOption(
      relationshipArtist,
      "artist_id",
      artistsResult.artists
    );
    setArtistOption(updatedArtistOption);
    setTempArtistOption(updatedArtistOption);
  }, [relationshipArtist, artistsResult.artists]);

  useEffect(() => {
    const updatedCategoryOption = mapRelationshipToOption(
      relationshipCategory,
      "category_id",
      categoriesResult.categories
    );
    setCategoryOption(updatedCategoryOption);
    setTempCategoryOption(updatedCategoryOption);
  }, [relationshipCategory, categoriesResult.categories]);

  useEffect(() => {
    const updatedPlaylistOption = mapRelationshipToOption(
      relationshipPlaylist,
      "playlist_id",
      playlistsResult.playlists
    );
    // filter out option with label = null
    setPlaylistOption(
      updatedPlaylistOption.filter((option) => option.label !== "")
    );
    setTempPlaylistOption(
      updatedPlaylistOption.filter((option) => option.label !== "")
    );
  }, [relationshipPlaylist, playlistsResult.playlists]);

  // map all option to select
  const allArtistOption = artistsResult.artists.map((artist) => ({
    value: artist.id.toString(),
    label: artist.name,
  }));
  const allCategoryOption = categoriesResult.categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));
  const allPlaylistOption = playlistsResult.playlists.map((playlist) => ({
    value: playlist.id.toString(),
    label: playlist.name,
  }));

  // filter out existing option
  const remainingArtists = allArtistOption.filter(
    (artist) => !artistOption.some((option) => option.value === artist.value)
  );
  const remainingCategories = allCategoryOption.filter(
    (category) =>
      !categoryOption.some((option) => option.value === category.value)
  );
  const remainingPlaylists = allPlaylistOption.filter(
    (playlist) =>
      !playlistOption.some((option) => option.value === playlist.value)
  );

  // handle option change
  const handleCategoryChange = (categoryOption: any) => {
    setCategoryOption(categoryOption);
  };
  const handleArtistChange = (artistOption: any) => {
    setArtistOption(artistOption);
  };
  const handlePlaylistChange = (playlistOption: any) => {
    setPlaylistOption(playlistOption);
  };

  // close modal
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  // handle form submit
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      const uniqueID = uniqid();
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!user) {
        toast.error("Missing or user");
        return;
      }
      if (currentUser?.role !== "admin") {
        setIsLoading(false);
        toast.error("You are not authorized to perform this action");
        return;
      }

      // update Song
      const songUpdateData: any = {
        title: values.title,
        time: values.time,
        lyric: values.lyric,
      };

      // since update image and song in storage will take the same url
      // => images and songs will be cache and won't be updated unless admin refresh the page
      // so for now, delete the old image and song and upload new one seems to be the only solution
      if (imageFile) {
        // delete old image
        const { data, error } = await supabaseClient.storage
          .from("images")
          .remove([song?.image_path ?? ""]);
        if (error) {
          setIsLoading(false);
          return toast.error("Failed to delete image");
        }

        // update song with new image
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(`song/${uniqueID}`, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });
        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed to upload image");
        }
        songUpdateData.image_path = imageData.path;
      }

      // delete old song
      if (songFile) {
        // delete old song
        const { data, error } = await supabaseClient.storage
          .from("songs")
          .remove([song?.song_path ?? ""]);
        if (error) {
          setIsLoading(false);
          return toast.error("Failed to delete song");
        }

        // update song with new song
        const { data: songData, error: songError } =
          await supabaseClient.storage
            .from("songs")
            .upload(`${uniqueID}`, songFile, {
              cacheControl: "3600",
              upsert: false,
            });
        if (songError) {
          setIsLoading(false);
          return toast.error("Failed to upload song");
        }
        songUpdateData.song_path = songData.path;
      }

      // update Song record
      // NOTE: even when file mp3 is updated, it still need to refresh the page to see the change
      const { data: songUpdatedData, error: supabaseError } =
        await supabaseClient
          .from("songs")
          .update(songUpdateData)
          .eq("id", id)
          .select();
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      // compare old option with current option
      const [addedArtistItems, removedArtistItems] = compareObjects(
        tempArtistOption,
        artistOption
      );
      const [addedCategoryItems, removedCategoryItems] = compareObjects(
        tempCategoryOption,
        categoryOption
      );
      const [addedPlaylistItems, removedPlaylistItems] = compareObjects(
        tempPlaylistOption,
        playlistOption
      );

      // update relationship
      // remove deleted relationship
      for (const removedArtist of removedArtistItems) {
        const { error } = await supabaseClient
          .from("rel_song_artist")
          .delete()
          .eq("song_id", id)
          .eq("artist_id", removedArtist.value);
        if (error) {
          setIsLoading(false);
          return toast.error("Failed to remove artist relationship");
        }
      }
      for (const removedCategory of removedCategoryItems) {
        const { error } = await supabaseClient
          .from("rel_song_category")
          .delete()
          .eq("song_id", id)
          .eq("category_id", removedCategory.value);
        if (error) {
          setIsLoading(false);
          return toast.error("Failed to remove category relationship");
        }
      }
      for (const removedPlaylist of removedPlaylistItems) {
        const { error } = await supabaseClient
          .from("rel_song_playlist")
          .delete()
          .eq("song_id", id)
          .eq("playlist_id", removedPlaylist.value);
        if (error) {
          setIsLoading(false);
          return toast.error("Failed to remove playlist relationship");
        }
      }
      // add new relationship
      for (const addedArtist of addedArtistItems) {
        const { error } = await supabaseClient.from("rel_song_artist").insert({
          song_id: id,
          artist_id: addedArtist.value,
        });
        if (error) {
          setIsLoading(false);
          return toast.error("Failed to add artist relationship");
        }
      }
      for (const addedCategory of addedCategoryItems) {
        const { error } = await supabaseClient
          .from("rel_song_category")
          .insert({
            song_id: id,
            category_id: addedCategory.value,
          });
        if (error) {
          setIsLoading(false);
          return toast.error("Failed to add category relationship");
        }
      }
      for (const addedPlaylist of addedPlaylistItems) {
        const { error } = await supabaseClient
          .from("rel_song_playlist")
          .insert({
            song_id: id,
            playlist_id: addedPlaylist.value,
          });
        if (error) {
          setIsLoading(false);
          return toast.error("Failed to add playlist relationship");
        }
      }

      //  refresh page
      router.refresh();
      setIsLoading(false);
      toast.success("Song Updated Successfully");
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
      title="Update a Song"
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
          <label htmlFor="title">Song Name</label>
          <Input
            id="title"
            disabled={isLoading}
            placeholder="Title"
            {...register("title", { required: true })}
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="artist">Song Artist</label>
          <MutipleSelect
            id="artist"
            value={artistOption}
            options={remainingArtists}
            onChange={handleArtistChange}
            isDisabled={isLoading}
            isMulti
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="title">Song Category</label>
          <MutipleSelect
            id="category"
            value={categoryOption}
            onChange={handleCategoryChange}
            options={remainingCategories}
            isDisabled={isLoading}
            isMulti
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="playlist">Add to Playlist</label>
          <MutipleSelect
            id="playlist"
            value={playlistOption}
            options={remainingPlaylists}
            onChange={handlePlaylistChange}
            isDisabled={isLoading}
            isMulti
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="time">Song Time</label>
          <Input
            id="time"
            disabled={isLoading}
            placeholder="Time"
            {...register("time", { required: true })}
          />
        </div>
        <div className=" flex gap-4">
          <div className=" flex flex-col space-y-2">
            <label htmlFor="image">Song Image</label>
            {/* only accept image files */}
            <Input
              id="image"
              type="file"
              disabled={isLoading}
              accept="
            .png,
            .jpeg,
            .jpg,
            "
              {...register("image", { required: false })}
            />
          </div>
          <div className=" flex flex-col space-y-2">
            <label htmlFor="song">Song File</label>
            {/* only accept mp3 files */}
            <Input
              id="song"
              type="file"
              disabled={isLoading}
              accept="
            .mp3,
            "
              {...register("song", { required: false })}
            />
          </div>
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="lyric">Song Lyric</label>
          <Textarea
            id="lyric"
            disabled={isLoading}
            placeholder="Line 1/ Line 2/ Line 3/ ..."
            {...register("lyric", { required: false })}
          />
        </div>
        <HeaderButton
          disabled={isLoading}
          type="submit"
          className="rounded-md text-white"
        >
          {isLoading ? "Loading..." : "Update"}
        </HeaderButton>
      </form>
    </Modal>
  );
};

export default UpdateSongModal;
