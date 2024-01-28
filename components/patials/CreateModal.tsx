"use client";

import React, { useEffect, useState } from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";
import useCreateModal from "@/hooks/useCreateModal";

import Modal from "../Modal";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../shared/Input";
import HeaderButton from "../layout/HeaderButton";
import { useUser } from "@/hooks/useUser";

const CreateModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useCreateModal();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  });
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
      if (!imageFile || !user) {
        toast.error("Missing image or user");
        return;
      }
      const uniqueID = uniqid();
      // upload image to storage
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`playlist/${uniqueID}.png`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload image");
      }
      // insert playlist
      const { error: supabaseError } = await supabaseClient
        .from("playlist")
        .insert({
          name: values.name,
          description: values.description,
          image_path: imageData.path,
          user_id: user.id,
        });
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
      title="Add a playlist"
      description="Create your own playlist!"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className=" flex flex-col space-y-4"
      >
        <div className=" flex flex-col space-y-2">
          <label htmlFor="name">Playlist name</label>
          <Input
            id="name"
            disabled={isLoading}
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="description">Description</label>
          <Input
            id="description"
            disabled={isLoading}
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="image">Image</label>
          {/* only accept image files */}
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            placeholder="Image"
            accept="
            image/png,
            image/jpeg,
            image/jpg,
            "
            {...register("image", { required: true })}
          />
        </div>
        <HeaderButton disabled={isLoading} type="submit" className="rounded-md">
          Create
        </HeaderButton>
      </form>
    </Modal>
  );
};

export default CreateModal;
