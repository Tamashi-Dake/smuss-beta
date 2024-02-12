import getUsersDetails from "@/acitons/getUsers";
import { DataTable } from "@/components/shared/DataTable";
import React from "react";
import { columnType } from "./columnType";

const SearchPage: React.FC = async () => {
  const users = await getUsersDetails();

  return (
    <>
      <h1 className="text-white">Users Here</h1>
      <DataTable columns={columnType} data={users} />
    </>
  );
};

export default SearchPage;
