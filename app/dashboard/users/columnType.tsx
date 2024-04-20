"use client";
import { UserDetails } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  ClipboardCopyIcon,
  DollarSignIcon,
  MoreHorizontal,
  Trash2,
  X,
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
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useDeleteModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
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
    id: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
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
  // {
  //   accessorKey: "billing_address",
  //   id: "Billing Address",
  //   header: "Billing Address",
  // },
  // {
  //   accessorKey: "payment_method",
  //   id: "Payment Method",
  //   header: "Payment Method",
  // },
  {
    accessorKey: "active",
    id: "Active",
    header: "Active",
    cell: ({ row }) => {
      const status = row.original.active ? "true" : "false";
      return (
        <div className="text-center">
          <span
            className={
              "text-white p-1 rounded-xl " +
              (status === "true" ? "bg-green-500" : "bg-red-400")
            }
          >
            {status.toUpperCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    id: "Role",
    header: "Role",
    cell: ({ row }) => {
      const status = row.original.role || "Unknown";
      return (
        <div className="text-center">
          <span
            className={
              " p-1 rounded-xl " +
              (status === "admin" ? "bg-green-400 text-white" : " text-black")
            }
          >
            {status.toUpperCase()}
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      const user = row.original;
      const status = user.active ? "true" : "false";
      const role = user.role || "Unknown";
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { supabaseClient } = useSessionContext();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deleteModal = useDeleteModal();
      const handleUserStatus = (id: string) => async () => {
        await supabaseClient
          .from("users")
          .update({ active: !user.active })
          .eq("id", id);
        router.refresh();
      };
      const handleUserRole = (id: string) => async () => {
        await supabaseClient
          .from("users")
          .update({ role: user.role === "admin" ? "user" : "admin" })
          .eq("id", id);
        router.refresh();
      };
      const handleDeleteUser = () => {
        deleteModal.onOpen(user.id, "user");
      };
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
              {status === "true" ? (
                <DropdownMenuItem onClick={handleUserStatus(user.id)}>
                  <X className="w-4 h-4 mr-2" />
                  Deactivate user
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={handleUserStatus(user.id)}>
                  <Check className="w-4 h-4 mr-2" />
                  Activate user
                </DropdownMenuItem>
              )}
              {role === "admin" ? (
                <DropdownMenuItem onClick={handleUserRole(user.id)}>
                  <X className="w-4 h-4 mr-2" />
                  Revoke admin
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={handleUserRole(user.id)}>
                  <Check className="w-4 h-4 mr-2" />
                  Make admin
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDeleteUser}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
