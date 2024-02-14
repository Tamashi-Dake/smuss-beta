import getUsersDetails from "@/acitons/getUsers";
import { DataTable } from "@/components/dashboard/DataTable";
import React from "react";
import { columnType } from "./columnType";

const ManageUsers: React.FC = async () => {
  const users = await getUsersDetails();

  return (
    <>
      <h1 className="text-white">Users Here</h1>
      <DataTable columns={columnType} data={users} />
    </>
  );
};

export default ManageUsers;
