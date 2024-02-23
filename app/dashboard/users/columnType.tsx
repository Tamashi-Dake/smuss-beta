"use client";
import { UserDetails } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ClipboardCopyIcon,
  DollarSignIcon,
  MoreHorizontal,
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
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
export const columnType: ColumnDef<UserDetails>[] = [
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
    id: "User ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "full_name",
    id: "Username/Gmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username/Gmail
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "avatar_url",
    id: "Avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const imagePath = row.original.avatar_url;
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
            alt={imagePath || "Avatar"}
            title={imagePath || "Avatar"}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "billing_address",
    id: "Billing Address",
    header: "Billing Address",
  },
  {
    accessorKey: "payment_method",
    id: "Payment Method",
    header: "Payment Method",
  },
  {
    accessorKey: "role",
    id: "Role",
    header: "Role",
    cell: ({ row }) => {
      const userRole = row.original.role || "Unknown";
      return (
        <div className="text-center">
          <span
            className={
              "text-white p-1 rounded-xl " +
              (userRole === "admin" ? "bg-red-400" : "bg-green-500")
            }
          >
            {userRole.toUpperCase()}
          </span>
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
      const user = row.original;

      return (
        <div className="text-center">
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
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                <ClipboardCopyIcon className="w-4 h-4 mr-2" />
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DollarSignIcon className="w-4 h-4 mr-2" />
                View payment details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
