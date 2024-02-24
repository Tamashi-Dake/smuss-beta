"use client";

import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useDeleteModal } from "@/hooks/useModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUser } from "@/hooks/useUser";
import Modal from "../Modal";
import HeaderButton from "../layout/HeaderButton";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";
import MutipleSelect from "../shared/MutipleSelect";
import { Artist, Category } from "@/types";
import { insertRelationship } from "@/utils/insertRelationship";

// use for all records, it will NOT delete media file from storage so this is a temporary solution
// in order to delete media file, i might have to create modals for each type of records -> match id with record id -> get media link -> delete from storage
const DeleteModal = ({}) => {
  const router = useRouter();
  const { onClose, isOpen, id, type } = useDeleteModal();
  const supabaseClient = useSupabaseClient();
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { handleSubmit } = useForm();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      setIsLoading(true);
      if (!user) {
        toast.error("Missing image or song or user");
        return;
      }
      if (currentUser?.role !== "admin") {
        setIsLoading(false);
        toast.error("You are not authorized to perform this action");
        return;
      }

      if (type === "song") {
        // Delete Song
        const { error: supabaseError } = await supabaseClient
          .from("songs")
          .delete()
          .eq("id", id);
        if (supabaseError) {
          setIsLoading(false);
          return toast.error(supabaseError.message);
        }
      }

      //  refresh page
      router.refresh();
      setIsLoading(false);
      toast.success("Deleted successfully");
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Delete Item"
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
          <label htmlFor="title">You about to delete item with id: {id}</label>
        </div>
        <HeaderButton
          disabled={isLoading}
          type="submit"
          className="rounded-md bg-red-500"
        >
          Yes, I&apos;m sure
        </HeaderButton>
      </form>
    </Modal>
  );
};

export default DeleteModal;
