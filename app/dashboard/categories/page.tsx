import { DataTable } from "@/components/dashboard/DataTable";
import React from "react";
import { columnType } from "./columnType";
import getCategories from "@/acitons/getCategories";

const ManageCategories: React.FC = async () => {
  const categories = await getCategories();
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <DataTable columns={columnType} data={categories} />
      </div>
    </>
  );
};

export default ManageCategories;
