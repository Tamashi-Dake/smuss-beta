"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, PenSquareIcon, Trash2Icon, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDeleteModal, useUpdateCategoryModal } from "@/hooks/useModal";
export const columnType: ColumnDef<Category>[] = [
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
    id: "Category ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category ID
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
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    id: "Category Description",
    header: "Category Description",
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
    id: "actions",
    header: ({ column }) => {
      return (
        <div className="text-center" aria-label="Actions">
          Actions
        </div>
      );
    },
    cell: ({ row }) => {
      const category = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const updateModal = useUpdateCategoryModal();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deleteModal = useDeleteModal();
      return (
        <div className="flex justify-center items-center gap-x-2">
          <PenSquareIcon
            className="h-6 w-6 cursor-pointer text-neutral-600"
            onClick={() => updateModal.onOpen(category.id)}
          />
          <Trash2Icon
            className="h-6 w-6 cursor-pointer text-red-500"
            onClick={() => deleteModal.onOpen(category.id, "category")}
          />
        </div>
      );
    },
  },
];
