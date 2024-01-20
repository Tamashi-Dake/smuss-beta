"use client";

import { usePathname } from "next/navigation";
import { use, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
BiSearch;
interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      { icon: HiHome, label: "Home", active: pathname === "/", path: "/" },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        path: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="sidebar flex h-full">
      <div className="sidebar__header hidden md:flex flex-col gap-y-2 bg-black w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box classname="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="flex-1 flex flex-col bg-black overflow-auto py-2 h-full ">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
