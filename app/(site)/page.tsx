import SongsWrapper from "@/components/home/SongsWrapper";
import SectionList from "@/components/home/SectionList";
import getPublicPlaylists from "@/acitons/getPublicPlaylists";
import Wrapper from "@/components/shared/Wrapper";
import PlaylistItem from "@/components/shared/PlaylistItem";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  // TODO: get all user playlists (for now, will change to get artists playlists later)
  const playlists = await getPublicPlaylists();

  return (
    <>
      <div className="mt-8 flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        <Link className="text-xl font-bold  bg-blue-400" href="/favorites">
          Favorites
        </Link>
        <SectionList>
          <h1 className="text-2xl font-bold ">New Hits</h1>
          {/* animation section */}
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Recently Played</h1>
          <SongsWrapper />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">New Playlists</h1>
          <Wrapper>
            {playlists.length === 0 ? (
              <p>No playlists found</p>
            ) : (
              playlists.map((item) => (
                // <p key={item.id}>{item.name}</p>
                <PlaylistItem key={item.id} data={item} />
              ))
            )}
          </Wrapper>
          {/* animation section */}
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
