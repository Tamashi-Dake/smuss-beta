"use client";

import { usePathname } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "../shared/Box";
import SidebarItem from "./SidebarItem";
import Library from "../home/library/Library";
import useCurrentUser from "@/hooks/useCurrentUser";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { FaItunesNote, FaUser, FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { Playlist } from "@/types";
BiSearch;
interface SidebarProps {
  children: React.ReactNode;
  playlists: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, playlists }) => {
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const [role, setRole] = useState("");
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
              icon: FaUser,
              label: "Manage Users",
              active: pathname === "/dashboard/users",
              path: "/dashboard/users",
            },
            {
              icon: FaItunesNote,
              label: "Manage Songs",
              active: pathname === "/songs",
              path: "/dashboard/songs",
            },
            {
              icon: TbPlaylist,
              label: "Manage Playlists",
              active: pathname === "/dashboard/playlists",
              path: "/dashboard/playlists",
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

  return (
    <div className="sidebar flex h-full">
      <div className="sidebar__header hidden md:flex flex-col gap-y-2 bg-black w-[300px] p-2">
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
      </div>
      <main className="flex-1 flex flex-col bg-black overflow-auto py-2 h-full ">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
