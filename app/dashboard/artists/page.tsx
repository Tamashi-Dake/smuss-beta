import { DataTable } from "@/components/dashboard/DataTable";
import Header from "@/components/layout/Header";
import React from "react";
import { columnType } from "./columnType";
import getArtists from "@/acitons/getArtists";

const ManageArtists: React.FC = async () => {
  const artists = await getArtists();
  return (
    <>
      <h1>Artists Here</h1>
      <DataTable columns={columnType} data={artists} />
    </>
  );
};

export default ManageArtists;
