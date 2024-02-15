import getUsersDetails from "@/acitons/getUsers";
import { DataTable } from "@/components/dashboard/DataTable";
import React from "react";
import { columnType } from "./columnType";

const ManageUsers: React.FC = async () => {
  const users = await getUsersDetails();

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <DataTable columns={columnType} data={users} />
      </div>
    </>
  );
};

export default ManageUsers;
