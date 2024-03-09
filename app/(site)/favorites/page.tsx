import getFavorite from "@/acitons/getFavorite";
import FavoriteContent from "@/components/favorite/FavoriteContent";
import Image from "next/image";
import React from "react";

// export const revalidate = 0;

const Favorites: React.FC = async () => {
  const favoritesSongs = await getFavorite();

  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        <div className="mt-20">
          <div
            className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-x-5
            "
          >
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                className="object-cover rounded-sm"
                fill
                src="/liked.png"
                alt="Playlist"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1
                className="
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                "
              >
                Favorite Songs
              </h1>
            </div>
          </div>
        </div>
        <FavoriteContent songs={favoritesSongs} />
      </div>
    </>
  );
};

export default Favorites;
