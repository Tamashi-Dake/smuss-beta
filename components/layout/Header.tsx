"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import supabase from "@/utils/supabaseClient";

import { useAuthModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";

import HeaderButton from "./HeaderButton";
import { FaUserAlt } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { Heart, ListMusic, Stars } from "lucide-react";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className, ...props }) => {
  const router = useRouter();

  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();

  const { user, subscription } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // reset any playing audio
    router.push("/");

    if (error) {
      toast.error(error.message);
    } else {
      window.location.href = "/";
      toast.success("Logged out successfully");
    }
  };

  return (
    <div
      className={twMerge(`
      sticky
      top-0
        h-fit
        flex
        md:justify-between
        bg-neutral-900
        z-[1001]
        p-3
        justify-end
        `)}
      {...props}
    >
      {/* medium screen nav */}
      <div className="navLeft hidden md:flex">
        <RxCaretLeft
          className="rounded-full bg-black flex items-center justify-center opacity-75 hover:opacity-100 transition-all text-neutral-100 cursor-pointer"
          size={35}
          onClick={() => router.back()}
        />
        <RxCaretRight
          className="rounded-full bg-black flex items-center justify-center opacity-75 hover:opacity-100 transition-all text-neutral-100 cursor-pointer"
          size={35}
          onClick={() => router.forward()}
        />
      </div>

      {/* Authentication */}
      <div className="flex flex-row items-center justify-between gap-x-2 px-3">
        {user ? (
          <>
            <HeaderButton
              className="bg-white text-black"
              onClick={handleLogout}
            >
              Logout
            </HeaderButton>

            <DropdownMenu>
              <DropdownMenuTrigger>
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="avatar"
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                ) : (
                  <HeaderButton className="rounded-full p-3  flex items-center justify-center opacity-75 hover:opacity-100 transition-all cursor-pointer">
                    <FaUserAlt />
                  </HeaderButton>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="bg-neutral-800 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1001]"
              >
                <DropdownMenuItem onClick={() => router.push("/favorites")}>
                  <Heart size={20} className="mr-2" />
                  <p>Favorites</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/library")}>
                  <ListMusic size={20} className="mr-2" />
                  <p>Library</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/account")}>
                  <Stars size={20} className="mr-2" />
                  {subscription ? (
                    <p>Your Account</p>
                  ) : (
                    <p>Upgrade to Premium</p>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <HeaderButton onClick={authModal.onOpen}>
              Let&apos;s start
            </HeaderButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
