import getFavorite from "@/acitons/getFavorite";
import PlaylistContent from "@/components/layout/PlaylistContent";
import PlayButton from "@/components/shared/PlayButton";
import { formatTotalTime } from "@/utils/time";
import { Dot } from "lucide-react";
import Image from "next/image";
import React from "react";

export const revalidate = 0;

const Favorites: React.FC = async () => {
  const favoritesSongs = await getFavorite();
  const totalTime = favoritesSongs.map((song) => song.time);
  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        <div className="bg flex items-end h-60 bg-gradient-to-b from-purple-900/80 via-yellow-800/30 to-[#171717]">
          <div className="w-full">
            <div
              className="
              flex 
              flex-col 
              justify-center
              md:justify-start
              md:flex-row 
              items-center 
              gap-x-5
              md:p-4
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
              <div className="flex flex-col gap-y-2 m-4 md:mt-0">
                <p className="hidden md:block font-semibold text-sm">
                  Playlist
                </p>
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
                <div className="relative">
                  <PlayButton songIds={favoritesSongs.map((song) => song.id)} />
                  <div className="flex ">
                    <p className="text-sm pl-1">
                      {favoritesSongs.length} songs
                    </p>
                    <Dot size={20} className="text-white" />
                    <p className="text-sm ">
                      about {formatTotalTime(totalTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PlaylistContent songs={favoritesSongs} />
      </div>
    </>
  );
};

export default Favorites;
