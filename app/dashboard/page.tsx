import React from "react";
import Header from "@/components/layout/Header";
import SectionList from "@/components/home/SectionList";
import SongsWrapper from "@/components/home/SongsWrapper";

const DashboardPage: React.FC = async () => {
  return (
    <>
      <Header>Header</Header>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4">
        Dashboard Page
      </div>{" "}
    </>
  );
};

export default DashboardPage;
