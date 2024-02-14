"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ClipboardCopyIcon, MoreHorizontal, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Artist } from "@/types";
export const columnType: ColumnDef<Artist>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "name",
    header: "Artist Name",
  },
  {
    accessorKey: "description",
    header: "Artist Description",
  },
  {
    accessorKey: "image_path",
    header: "Image Path",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const artist = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(artist.id)}
            >
              <ClipboardCopyIcon className="w-4 h-4 mr-2" />
              Copy artist ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
