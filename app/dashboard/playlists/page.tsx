import { DataTable } from "@/components/dashboard/DataTable";
import React from "react";
import { columnType } from "./columnType";
import getPlaylists from "@/acitons/getPlaylists";

const SearchPage: React.FC = async () => {
  const playlist = await getPlaylists();
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">Playlists </h1>
        <DataTable columns={columnType} data={playlist} />
      </div>
    </>
  );
};

export default SearchPage;
