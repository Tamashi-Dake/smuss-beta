import { DataTable } from "@/components/dashboard/DataTable";
import React from "react";
import { columnType } from "./columnType";
import getCategories from "@/acitons/getCategories";

const ManageCategories: React.FC = async () => {
  const categories = await getCategories();
  return (
    <>
      <h1>Categories Here</h1>
      <DataTable columns={columnType} data={categories} />
    </>
  );
};

export default ManageCategories;
