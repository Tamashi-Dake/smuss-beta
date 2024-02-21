"use client";

import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useAddSongModal } from "@/hooks/useModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUser } from "@/hooks/useUser";
import Modal from "../Modal";
import HeaderButton from "../layout/HeaderButton";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";
import MutipleSelect from "../shared/MutipleSelect";
import { Artist, Category } from "@/types";

const SongModal = ({
  categories,
  artists,
}: // playlists,
{
  categories: Category[];
  artists: Artist[];
  // playlists: any;
}) => {
  const router = useRouter();
  const { onClose, isOpen } = useAddSongModal();
  const supabaseClient = useSupabaseClient();
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      image: null,
      song: null,
      time: "",
      lyrics: "",
    },
  });

  const [categoryOption, setCategoryOption] = useState(null);
  const [artistOption, setArtistOption] = useState(null);

  const handleCategoryChange = (categoryOption: any) => {
    setCategoryOption(categoryOption);
  };
  const handleArtistChange = (artistOption: any) => {
    setArtistOption(artistOption);
  };

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Missing image or song or user");
        return;
      }
      const uniqueID = uniqid();
      if (currentUser?.role !== "admin") {
        setIsLoading(false);
        toast.error("You are not authorized to perform this action");
        return;
      }
      // upload image to storage
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
      // upload image to storage
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload song");
      }
      // insert Song
      const { data: songID, error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          title: values.title,
          song_path: songData.path,
          image_path: imageData.path,
          user_id: user.id,
          time: values.time,
          lyric: values.lyric,
        })
        .select();
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      // insert relationship
      const { error: categoryError } = await supabaseClient
        .from("rel_song_category")
        .insert(
          categoryOption &&
            categoryOption.map((item: any) => ({
              song_id: songID[0].id,
              category_id: item.value,
            }))
        );
      if (categoryError) {
        setIsLoading(false);
        return toast.error(categoryError.message);
      }
      const { error: artistError } = await supabaseClient
        .from("rel_song_artist")
        .insert(
          artistOption &&
            artistOption.map((item: any) => ({
              song_id: songID[0].id,
              artist_id: item.value,
            }))
        );
      if (artistError) {
        setIsLoading(false);
        return toast.error(artistError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song created");
      reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(playlists);
  return (
    <Modal
      title="Add a Song"
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
          <label htmlFor="title">Song Category</label>
          <MutipleSelect
            id="category"
            defaultValue={categoryOption}
            onChange={handleCategoryChange}
            options={categories.map((category) => ({
              value: category.id.toString(),
              label: category.name,
            }))}
            isDisabled={isLoading}
            isMulti
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="artist">Song Artist</label>
          <MutipleSelect
            id="artist"
            options={artists.map((artist) => ({
              value: artist.id.toString(),
              label: artist.name,
            }))}
            onChange={handleArtistChange}
            isDisabled={isLoading}
            isMulti
          />
        </div>
        {/* <div className=" flex flex-col space-y-2">
          <label htmlFor="playlist">Add to Playlist</label>
          <MutipleSelect
            id="playlist"
            options={playlists.map((playlist: any) => ({
              value: playlist.id.toString(),
              label: playlist.name,
            }))}
            isDisabled={isLoading}
            isMulti
          />
        </div> */}
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
              {...register("image", { required: true })}
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
              {...register("song", { required: true })}
            />
          </div>
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="lyric">Song Lyric</label>
          <Textarea
            id="lyric"
            disabled={isLoading}
            placeholder="Lyric"
            {...register("lyric", { required: false })}
          />
        </div>
        <HeaderButton disabled={isLoading} type="submit" className="rounded-md">
          Add
        </HeaderButton>
      </form>
    </Modal>
  );
};

export default SongModal;
