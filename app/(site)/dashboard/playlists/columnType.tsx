"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PenSquareIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Playlist } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDeleteModal, useUpdatePlaylistModal } from "@/hooks/useModal";

export const columnType: ColumnDef<Playlist | any>[] = [
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
    id: "Playlist ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Playlist ID
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
    accessorKey: "name",
    id: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Playlist Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    id: "Playlist Description",
    header: "Playlist Description",
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
    accessorKey: "created_at",
    id: "Created At",
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
    accessorKey: "user_id",
    id: "User Type",
    header: "User Type",
    cell: ({ row }) => {
      // replace user id with user role
      const role = row.original.users.role;
      return (
        <div className="text-center">
          <span
            className={
              "text-white p-1 rounded-xl " +
              (role === "admin" ? "bg-red-400" : "bg-green-500")
            }
          >
            {role.toUpperCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "artist_id",
    id: "Artist ID",
    header: "Artist ID",
    // replace artist id with artist name (currently not available)
    // cell: ({ row }) => {
    // },
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
      const playlist = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const updateModal = useUpdatePlaylistModal();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deleteModal = useDeleteModal();
      return (
        <div className="flex justify-center items-center gap-x-2">
          <PenSquareIcon
            className="h-6 w-6 cursor-pointer text-neutral-600"
            onClick={() => updateModal.onOpen(playlist.id)}
          />
          <Trash2Icon
            className="h-6 w-6 cursor-pointer text-red-500"
            onClick={() => deleteModal.onOpen(playlist.id, "playlist")}
          />
        </div>
      );
    },
  },
];
