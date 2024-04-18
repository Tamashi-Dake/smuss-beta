import React from "react";
import SectionList from "@/components/home/SectionList";
import SongsWrapper from "@/components/home/SongsWrapper";
export const revalidate = 0;

const PlaylistPage: React.FC = async () => {
  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        Playlist Page
      </div>
    </>
  );
};

export default PlaylistPage;
