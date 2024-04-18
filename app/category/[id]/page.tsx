import getCategoryInfo from "@/acitons/getCategoryInfo";
import getRandomPublicPlaylists from "@/acitons/getRandomPublicPlaylists";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";
import getSongByCategoryID from "@/acitons/getSongsByCategoryID";
import PlaylistWrapper from "@/components/home/PlaylistWrapper";
import SectionList from "@/components/home/SectionList";
import CategoryInfo from "@/components/patials/CategoryInfo";
import PlaylistContent from "@/components/patials/PlaylistContent";
import Box from "@/components/shared/Box";

const CategoryPage = async ({ params }: { params: { id: string } }) => {
  const category = await getCategoryInfo(params.id);
  const randomPlaylists = await getRandomPublicPlaylists();
  const response = await getSongByCategoryID(params.id);
  const songInCategory = response.map((item) => item.songs);
  const relatedSong = await getSongInPlaylist();

  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        <div
          className="bg flex justify-center
          md:justify-start w-full items-end h-fit md:h-60 md:mb-4"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${category.color}, #171717)`,
          }}
        >
          <CategoryInfo category={category} />
        </div>
        <SectionList>
          <Box classname="bg-neutral-800 p-2">
            <h1 className="text-2xl font-bold p-2">
              Popular {category.name} Playlist
            </h1>
            <PlaylistWrapper data={randomPlaylists} related={relatedSong} />
          </Box>
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold p-2">
            Songs in {category.name} Category
          </h1>
          <PlaylistContent songs={songInCategory} />
        </SectionList>
      </div>
    </>
  );
};
export default CategoryPage;
