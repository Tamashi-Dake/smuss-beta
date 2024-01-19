"use client";

import { usePathname } from "next/navigation";
import { use, useMemo } from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      { label: "Home", active: pathname === "/", path: "/" },
      { label: "Search", active: pathname === "/Search", path: "/search" },
    ],
    [pathname]
  );

  return <div className="sidebar">{children}</div>;
};

export default Sidebar;
