"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ClipboardCopyIcon,
  MoreHorizontal,
  PenSquareIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Song } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import useLoadSong from "@/hooks/useLoadSong";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDeleteModal, useUpdateSongModal } from "@/hooks/useModal";
export const columnType: ColumnDef<Song>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="text-center"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    id: "Song ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Song ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <span className="">{row.original.id}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    id: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Song Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "song_path",
    id: "Song",
    header: ({ column }) => {
      return <p className="w-[14rem]">Song Path</p>;
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const song = useLoadSong(row.original) || "";
      // console.log(song);
      return (
        <div className="w-fit">
          <audio controls>
            <source src={song} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    },
  },
  {
    accessorKey: "image_path",
    id: "Image",
    header: "Image",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const imagePath = useLoadImage(row.original);
      return (
        <div className="flex items-center justify-center">
          <Image
            key={row.original.image_path}
            draggable={false}
            className="object-cover  w-10 h-10 rounded-md overflow-hidden"
            src={imagePath || "/liked.png"}
            width={200}
            height={200}
            alt={row.original.image_path}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    id: "Time",
    header: "Time",
  },
  {
    accessorKey: "lyric",
    id: "Lyrics",
    header: "Lyrics",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return date.toLocaleString("en-GB", { timeZone: "UTC" });
    },
  },
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <div className="text-center" aria-label="Actions">
          Actions
        </div>
      );
    },
    cell: ({ row }) => {
      const song = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const updateModal = useUpdateSongModal();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deleteModal = useDeleteModal();
      return (
        <div className="flex justify-center items-center gap-x-2">
          <PenSquareIcon
            className="h-6 w-6 cursor-pointer text-neutral-600"
            onClick={() => {
              updateModal.onOpen(song.id);
            }}
          />
          <Trash2Icon
            className="h-6 w-6 cursor-pointer text-red-500"
            onClick={() => {
              deleteModal.onOpen(song.id, "song");
            }}
          />
        </div>
      );
    },
  },
];
