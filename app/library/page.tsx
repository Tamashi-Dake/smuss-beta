import React from "react";
import SectionList from "@/components/home/SectionList";
import SongsWrapper from "@/components/home/SongsWrapper";
export const revalidate = 0;

const LibraryPage: React.FC = async () => {
  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        Library Page
      </div>
    </>
  );
};

export default LibraryPage;
