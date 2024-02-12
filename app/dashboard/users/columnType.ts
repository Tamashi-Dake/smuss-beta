"use client";
import { UserDetails } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
];
