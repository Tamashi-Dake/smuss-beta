import Header from "@/components/Header";
import SongsWrapper from "@/components/home/SongsWrapper";
import SectionList from "@/components/home/SectionList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <Header>Header</Header>
        <div className="mt-8 flex flex-col m-auto gap-y-10 max-w-wide-screen">
          <SectionList>
            <h1 className="text-2xl font-bold px-4">New Hits</h1>
            {/* animation section */}
          </SectionList>
          <SectionList>
            <h1 className="text-2xl font-bold px-4">Recently Played</h1>
            <SongsWrapper />
          </SectionList>
          <SectionList>
            <h1 className="text-2xl font-bold px-4">Your Top Artists</h1>
            {/* <ItemList></ItemList> */}
          </SectionList>
          <SectionList>
            <h1 className="text-2xl font-bold px-4">Have you tried these?</h1>
            {/* will change to wrapper cpn later */}
            <SongsWrapper />
          </SectionList>
          <SectionList>
            <h1 className="text-2xl font-bold px-4">Discovery</h1>
            {/* <ItemList></ItemList> */}
          </SectionList>
        </div>
      </div>
    </>
  );
}
