import getSongs from "@/acitons/getSongs";
import { DataTable } from "@/components/dashboard/DataTable";
import { columnType } from "./columnType";

const ManageSongs: React.FC = async () => {
  const songs = await getSongs();
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">Songs</h1>
        <DataTable columns={columnType} data={songs} />
      </div>
    </>
  );
};

export default ManageSongs;
