"use client";

import { useAddUserModal } from "@/hooks/useModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../shared/Input";
import HeaderButton from "../layout/HeaderButton";
import supabaseClient from "@/utils/supabaseClient";

const AddUserModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useAddUserModal();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: "",
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

      // Inviting user
      await fetch("/api/invite-user", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ email: values.email }),
      });
      router.refresh();
      setIsLoading(false);
      toast.success("User invited successfully");
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
      title="Invite User"
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
          <label htmlFor="name">User Email</label>
          <Input
            id="email"
            disabled={isLoading}
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
        <HeaderButton disabled={isLoading} type="submit" className="rounded-md">
          {isLoading ? "Loading..." : "Invite User"}
        </HeaderButton>
      </form>
    </Modal>
  );
};

export default AddUserModal;
