import { DataTable } from "@/components/dashboard/DataTable";
import React from "react";
import { columnType } from "./columnType";
import getArtists from "@/acitons/getArtists";

const ManageArtists: React.FC = async () => {
  const artists = await getArtists();
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">Artists</h1>
        <DataTable columns={columnType} data={artists} />
      </div>
    </>
  );
};

export default ManageArtists;
