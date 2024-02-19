"use client";

import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";
import { useAddCategoryModal } from "@/hooks/useModal";

import Modal from "../Modal";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../shared/Input";
import HeaderButton from "../layout/HeaderButton";
import useCurrentUser from "@/hooks/useCurrentUser";

const CategoryModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useAddCategoryModal();
  const supabaseClient = useSupabaseClient();
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("000000");
  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      color: "#000000",
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
      if (!imageFile) {
        toast.error("Missing image");
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
          .upload(`category/${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload image");
      }
      // insert Category
      const { error: supabaseError } = await supabaseClient
        .from("categories")
        .insert({
          name: values.name,
          description: values.description,
          image_path: imageData.path,
          color: values.color,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Category created");
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
      title="Add a Category"
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
          <label htmlFor="name">Category Name</label>
          <Input
            id="name"
            disabled={isLoading}
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="description">Category Description</label>
          <Input
            id="description"
            disabled={isLoading}
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="color">Category Background Color</label>
          <div className="flex gap-x-2">
            <Input
              id="color"
              value={color}
              disabled={isLoading}
              placeholder="Hex Color"
              {...register("color", { required: true })}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              maxLength={7}
            />
            <Input
              className="w-16 h-16"
              type="color"
              value={color}
              disabled={isLoading}
              onChange={onChangeColor}
            />
          </div>
        </div>
        <div className=" flex flex-col space-y-2">
          <label htmlFor="image">Category Image</label>
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
            {...register("image", { required: true })}
          />
        </div>
        <HeaderButton disabled={isLoading} type="submit" className="rounded-md">
          Add
        </HeaderButton>
      </form>
    </Modal>
  );
};

export default CategoryModal;
