"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";
import { useUpdateCategoryModal } from "@/hooks/useModal";

import Modal from "../Modal";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../shared/Input";
import HeaderButton from "../layout/HeaderButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { fetchRecordData } from "@/utils/selectRecord";
import { deleteStogare } from "@/utils/deleteRecord";

const UpdateCategoryModal = () => {
  const router = useRouter();
  const { onClose, isOpen, id } = useUpdateCategoryModal();
  const supabaseClient = useSupabaseClient();
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#000000");
  const [category, setCategory] = useState<any>(null);
  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return category;
    }, [category]),
  });
  useEffect(() => {
    reset(category);
  }, [reset, category]);

  useEffect(() => {
    const fetchRecord = async () => {
      const data = await fetchRecordData(supabaseClient, "categories", id);
      setCategory(data);
      setColor(data.color);
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

      // update Category
      const categoryUpdateData: any = {
        name: values.name,
        description: values.description,
        color: values.color,
      };

      if (imageFile) {
        if (category.image_path) {
          // delete old image
          await deleteStogare(supabaseClient, "images", category.image_path);
        }

        // update category with new image
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
        categoryUpdateData.image_path = imageData.path;
      }
      // update Category
      const { error: supabaseError } = await supabaseClient
        .from("categories")
        .update(categoryUpdateData)
        .eq("id", id);
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Category updated successfully");
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
      title="Update a Category"
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
            {...register("image", { required: false })}
          />
        </div>
        <HeaderButton disabled={isLoading} type="submit" className="rounded-md">
          Update
        </HeaderButton>
      </form>
    </Modal>
  );
};

export default UpdateCategoryModal;
