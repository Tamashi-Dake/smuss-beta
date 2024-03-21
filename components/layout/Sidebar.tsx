"use client";

import { ElementRef, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";

import useCurrentUser from "@/hooks/useCurrentUser";
import usePlayer from "@/hooks/usePlayer";

import { Playlist } from "@/types";

import Box from "../shared/Box";
import SidebarItem from "./SidebarItem";
import Library from "../home/library/Library";

import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { FaItunesNote, FaUser, FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { cn } from "@/libs/utils";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import useResize from "@/hooks/useResize";

interface SidebarProps {
  children: React.ReactNode;
  playlists: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, playlists }) => {
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const [role, setRole] = useState("");
  const player = usePlayer();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const mainRef = useRef<ElementRef<"main">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const resize = useResize();

  const routes = useMemo(
    () => [
      { icon: HiHome, label: "Home", active: pathname === "/", path: "/" },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        path: "/search",
      },
      ...(role === "admin"
        ? [
            {
              icon: AiOutlineDashboard,
              label: "Dashboard",
              active: pathname === "/dashboard",
              path: "/dashboard",
            },
            {
              icon: FaUsers,
              label: "Manage Artists",
              active: pathname === "/dashboard/artists",
              path: "/dashboard/artists",
            },
            {
              icon: MdCategory,
              label: "Manage Categories",
              active: pathname === "/dashboard/categories",
              path: "/dashboard/categories",
            },
            {
              icon: TbPlaylist,
              label: "Manage Playlists",
              active: pathname === "/dashboard/playlists",
              path: "/dashboard/playlists",
            },
            {
              icon: FaItunesNote,
              label: "Manage Songs",
              active: pathname === "/dashboard/songs",
              path: "/dashboard/songs",
            },

            {
              icon: FaUser,
              label: "Manage Users",
              active: pathname === "/dashboard/users",
              path: "/dashboard/users",
            },
          ]
        : []),
    ],
    [pathname, role]
  );

  useEffect(() => {
    const checkUser = async () => {
      const role = await currentUser.role;
      if (role === "admin") {
        setRole(role);
      } else {
        setRole("");
      }
    };
    checkUser();
  }, [currentUser]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 400) newWidth = 400;

    if (sidebarRef.current && mainRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      resize.onResize(newWidth);
      mainRef.current.style.setProperty("left", `${newWidth}px`);
      mainRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && mainRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      mainRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      mainRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && mainRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      mainRef.current.style.setProperty("width", "100%");
      mainRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <div
      className={twMerge(
        "sidebar flex h-full bg-black",
        player.activeId && "md:h-[calc(100%-100px)] h-[calc(100%-80px)]"
      )}
    >
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar  relative flex w-60 flex-col gap-y-2 bg-black pr-1 select-none",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-7 w-7 flex justify-center items-center md:hidden z-[1002] text-muted-foreground rounded-full active:bg-white absolute top-6 right-5 opacity-0 transition-all ",
            isMobile && "opacity-100 "
          )}
        >
          <X className={"h-5 w-5 "} size={35} />
        </div>
        {/* Logo */}
        <div className="flex items-center justify-center h-20 select-none ">
          <Image
            src="/smuss.png"
            alt="logo"
            draggable={false}
            width={500}
            height={700}
            priority={true}
            className="h-20 w-40 object-contain "
          />
        </div>
        <Box classname={` ${role !== "admin" ? "" : "overflow-y-auto h-full"}`}>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        {role !== "admin" && (
          <Box classname="overflow-y-auto h-full">
            <Library playlists={playlists} />
          </Box>
        )}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-grab h-full w-1 bg-neutral-500 right-0 top-0 absolute"
        ></div>
      </aside>
      <main
        ref={mainRef}
        className={cn(
          "absolute top-0 left-60 flex-1 flex flex-col bg-black ",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full",
          player.activeId
            ? "md:h-[calc(100%-100px)] h-[calc(100%-80px)]"
            : "h-full"
        )}
      >
        {isCollapsed && (
          <div
            onClick={resetWidth}
            className="h-6 w-6 flex justify-center items-center md:hidden z-[1002] text-muted-foreground rounded-full active:bg-white absolute top-3 left-2 opacity-75 hover:opacity-100 transition-all"
          >
            <MenuIcon
              role="button"
              className="h-5 w-5 text-white active:text-green-400"
            />
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
