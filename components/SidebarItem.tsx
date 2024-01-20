import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active: boolean;
  path: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  path,
}) => {
  return (
    <Link
      href={path}
      className={twMerge(
        "flex flex-row items-center gap-x-4 text-md font-medium hover:text-white transition-all text-neutral-400 py-1 rounded-lg px-2",
        active && "text-white"
      )}
    >
      <Icon size={20} />
      <span className="truncate ">{label}</span>
    </Link>
  );
};
export default SidebarItem;
