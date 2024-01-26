"use client";

import React, { useEffect } from "react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useCreateModal from "@/hooks/useCreateModal";

import Modal from "../Modal";
import toast from "react-hot-toast";

const CreateModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useCreateModal();

  const supabaseClient = useSupabaseClient();

  // useEffect(() => {
  //   if (session) {
  //     onClose();
  //   }
  // }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Add a playlist"
      description="Create your own playlist!"
      isOpen={isOpen}
      onChange={onChange}
    >
      create playlist
    </Modal>
  );
};

export default CreateModal;
