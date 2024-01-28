"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import HeaderButton from "./HeaderButton";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import supabase from "@/utils/supabaseClient";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className, ...props }) => {
  const router = useRouter();

  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();

  const [account, setAccount] = useState<any>([]);

  const { user } = useUser();

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
  useEffect(() => {
    const getUser = async () => {
      if (user?.id) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        setAccount(data);
      }
    };

    getUser();
  }, [user]);
  return (
    <div
      className={twMerge(`
      sticky
      top-0
        h-fit
        flex
        justify-between
        bg-neutral-900
        z-10
        p-3
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
      {/* small screen nav */}
      <div className="flex md:hidden gap-x-2 items-center">
        <HiHome
          className="rounded-full p-2  flex items-center justify-center opacity-75 hover:opacity-100 transition-all bg-white text-neutral-900 cursor-pointer"
          size={35}
          onClick={() => router.push("/")}
        />
        <BiSearch
          className="rounded-full p-2  flex items-center justify-center opacity-75 hover:opacity-100 transition-all bg-white text-neutral-900 cursor-pointer"
          size={35}
          onClick={() => router.push("/search")}
        />
      </div>

      {/* Authentication */}
      <div className="flex flex-row items-center justify-between gap-x-2 px-3">
        {user ? (
          <>
            {/* {account.role === "admin" && (
              <HeaderButton
                className="bg-green-500 text-white"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </HeaderButton>
            )} */}
            <HeaderButton
              className="bg-white text-black"
              onClick={handleLogout}
            >
              Logout
            </HeaderButton>
            <HeaderButton
              className="rounded-full p-3  flex items-center justify-center opacity-75 hover:opacity-100 transition-all cursor-pointer"
              onClick={() =>
                // router.push("/profile")

                console.log(user)
              }
            >
              <FaUserAlt />
            </HeaderButton>
          </>
        ) : (
          <>
            {/* <HeaderButton onClick={authModal.onOpen}>Sign up</HeaderButton>
            <HeaderButton
              onClick={authModal.onOpen}
              className="bg-white text-black  "
            >
              Log in
            </HeaderButton> */}
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
