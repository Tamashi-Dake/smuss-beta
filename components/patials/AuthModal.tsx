"use client";

import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthModal } from "@/hooks/useModal";

import Modal from "../Modal";

const AuthModal = () => {
  // const pathname = usePathname();
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      onClose();
      // router.push("/");
      router.refresh();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal title="Welcome " description="" isOpen={isOpen} onChange={onChange}>
      <Auth
        supabaseClient={supabaseClient}
        providers={["google"]}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        localization={{
          variables: {
            sign_up: {
              email_label: "Your email address",
            },
            sign_in: {
              button_label: "Login",
              loading_button_label: "Logging in...",
              link_text: "Already have an account? Login",
            },
            magic_link: {
              link_text: "Use email instead",
            },
          },
        }}
        theme="dark"
      />
    </Modal>
  );
};

export default AuthModal;
