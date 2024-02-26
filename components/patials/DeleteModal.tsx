"use client";

import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useDeleteModal } from "@/hooks/useModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUser } from "@/hooks/useUser";
import Modal from "../Modal";
import HeaderButton from "../layout/HeaderButton";
import { deleteRecord, deleteStogare } from "@/utils/deleteRecord";
import { fetchRecordData } from "@/utils/selectRecord";

const DeleteModal = ({}) => {
  const router = useRouter();
  const { onClose, isOpen, id, type } = useDeleteModal();
  const supabaseClient = useSupabaseClient();
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [recordData, setRecordData] = useState<any>(null);
  const { user } = useUser();
  const { handleSubmit } = useForm();
  const [itemName, setItem] = useState<string>("");
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
      setRecordData(null);
    }
  };

  useEffect(() => {
    const fetchRecord = async () => {
      switch (type) {
        case "artist":
          const data = await fetchRecordData(supabaseClient, "artist", id);
          setRecordData(data);
          break;
        case "category":
          const data2 = await fetchRecordData(supabaseClient, "categories", id);
          setRecordData(data2);
          break;
        case "playlist":
          const data3 = await fetchRecordData(supabaseClient, "playlist", id);
          setRecordData(data3);
          break;
        case "song":
          const data4 = await fetchRecordData(supabaseClient, "songs", id);
          setRecordData(data4);
          break;
        default:
          break;
      }
    };
    if (isOpen) {
      fetchRecord();

      switch (type) {
        case "artist":
          setItem("artist");
          break;
        case "category":
          setItem("category");
          break;
        case "playlist":
          setItem("playlist");
          break;
        case "song":
          setItem("song");
          break;
        default:
          break;
      }
    }
  }, [isOpen, id, type]);
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

      switch (type) {
        case "artist":
          await deleteRecord(supabaseClient, "artist", id, setIsLoading);
          await deleteStogare(supabaseClient, "images", recordData?.image_path);
          break;
        case "category":
          await deleteRecord(supabaseClient, "categories", id, setIsLoading);
          await deleteStogare(supabaseClient, "images", recordData?.image_path);
          break;
        case "playlist":
          await deleteRecord(supabaseClient, "playlist", id, setIsLoading);
          await deleteStogare(supabaseClient, "images", recordData?.image_path);
          break;
        case "song":
          await deleteRecord(supabaseClient, "songs", id, setIsLoading);
          await deleteStogare(supabaseClient, "images", recordData?.image_path);
          await deleteStogare(supabaseClient, "songs", recordData?.song_path);
          break;
        default:
          break;
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
          <label htmlFor="title">
            You about to delete this {itemName}:{" "}
            {recordData?.title ?? recordData?.name}
          </label>
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
