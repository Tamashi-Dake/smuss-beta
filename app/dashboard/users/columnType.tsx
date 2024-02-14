"use client";
import { UserDetails } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
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
export const columnType: ColumnDef<UserDetails>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "avatar_url",
    header: "Avatar",
  },
  {
    accessorKey: "billing_address",
    header: "Billing Address",
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
      );
    },
  },
];
