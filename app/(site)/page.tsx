import Header from "@/components/layout/Header";
import SongsWrapper from "@/components/home/SongsWrapper";
import SectionList from "@/components/home/SectionList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header>Header</Header>
      <div className="mt-8 flex flex-col m-auto gap-y-10 max-w-wide-screen px-4">
        <SectionList>
          <h1 className="text-2xl font-bold ">New Hits</h1>
          {/* animation section */}
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Recently Played</h1>
          <SongsWrapper />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Your Top Artists</h1>
          {/* <ItemList></ItemList> */}
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Have you tried these?</h1>
          {/* will change to wrapper cpn later */}
          <SongsWrapper />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Discovery</h1>
          {/* <ItemList></ItemList> */}
        </SectionList>
      </div>
    </>
  );
}
