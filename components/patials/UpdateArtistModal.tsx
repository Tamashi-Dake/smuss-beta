"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";
import toast from "react-hot-toast";

import Modal from "../Modal";
import Input from "../shared/Input";
import HeaderButton from "../layout/HeaderButton";
import { useUpdateArtistModal } from "@/hooks/useModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchRecordData } from "@/utils/selectRecord";
import { deleteStogare } from "@/utils/deleteRecord";

const UpdateArtistModal = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const currentUser = useCurrentUser();
  const { onClose, isOpen, id } = useUpdateArtistModal();
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState<any>(null);
  // set default value for form
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return artist;
    }, [artist]),
  });
  useEffect(() => {
    reset(artist);
  }, [reset, artist]);
  useEffect(() => {
    const fetchRecord = async () => {
      const data = await fetchRecordData(supabaseClient, "artist", id);
      setArtist(data);
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
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      const uniqueID = uniqid();
      setIsLoading(true);
      const imageFile = values.image?.[0];
      if (currentUser?.role !== "admin") {
        setIsLoading(false);
        toast.error("You are not authorized to perform this action");
        return;
      }
      // update Artist
      const artistUpdateData: any = {
        name: values.name,
        description: values.description,
      };

      if (imageFile) {
        if (artist.image_path) {
          // delete old image
          await deleteStogare(supabaseClient, "images", artist.image_path);
        }

        // update artist with new image
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(`artist/${uniqueID}`, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });
        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed to upload image");
        }
        artistUpdateData.image_path = imageData.path;
      }

      // update Artist
      const { error: supabaseError } = await supabaseClient
        .from("artist")
        .update(artistUpdateData)
        .eq("id", id);
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Artist updated successfully");
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
      title="Update an Artist"
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
          <label htmlFor="name">Artist Name</label>
          <Input
            id="name"
            disabled={isLoading}
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="description">Artist Description</label>
          <Input
            id="description"
            disabled={isLoading}
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="image">Artist Image</label>
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
        <HeaderButton disabled={isLoading} type="submit" className="rounded-md">
          {isLoading ? "Loading..." : "Update"}
        </HeaderButton>
      </form>
    </Modal>
  );
};

export default UpdateArtistModal;
