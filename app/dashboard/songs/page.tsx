import getSongs from "@/acitons/getSongs";
import { DataTable } from "@/components/dashboard/DataTable";
import Header from "@/components/layout/Header";
import React from "react";
import { columnType } from "./columnType";

const ManageSongs: React.FC = async () => {
  const songs = await getSongs();
  return (
    <>
      <h1>Songs Here</h1>
      <DataTable columns={columnType} data={songs} />
    </>
  );
};

export default ManageSongs;
