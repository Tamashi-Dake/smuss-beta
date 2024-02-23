"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PenSquareIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Artist } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import toast from "react-hot-toast";

export const columnType: ColumnDef<Artist>[] = [
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
    id: "Artist ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Artist ID
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
    id: "Artist Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Artist Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    id: "Artist Description",
    header: "Artist Description",
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
            src={
              imagePath && imagePath.endsWith("null")
                ? "/liked.png"
                : imagePath || "/liked.png"
            }
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
    id: "actions",
    header: ({ column }) => {
      return (
        <div className="text-center" aria-label="Actions">
          Actions
        </div>
      );
    },
    cell: ({ row }) => {
      const artist = row.original;

      return (
        <div className="flex justify-center items-center gap-x-2">
          <PenSquareIcon
            className="h-6 w-6 cursor-pointer text-neutral-600"
            onClick={() => toast.success(artist.id)}
          />
          <Trash2Icon className="h-6 w-6 cursor-pointer text-red-500" />
        </div>
      );
    },
  },
];
