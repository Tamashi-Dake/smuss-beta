import React from "react";
import SectionList from "@/components/home/SectionList";
import SongsWrapper from "@/components/home/SongsWrapper";
export const revalidate = 0;

const DashboardPage: React.FC = async () => {
  // TODO: Add max-w for table
  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4">
        Dashboard Page
      </div>
    </>
  );
};

export default DashboardPage;
