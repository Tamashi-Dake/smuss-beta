"use client";
import toast from "react-hot-toast";

import useLoadImage from "@/hooks/useLoadImage";

import PlayButton from "../shared/PlayButton";
import { Share2 } from "lucide-react";

const ArtistInfo = ({ artist, songs }: { artist: any; songs: any }) => {
  const artistImage = useLoadImage(artist);
  // const isMobile = useMediaQuery("(max-width: 768px)");

  const handleShare = (event: any) => {
    event.stopPropagation();
    navigator.clipboard.writeText(
      `https://smuss-beta.vercel.app/artist/${artist.id}`
    );
    toast.success("Copied to clipboard!");
  };
  return (
    <div
      className="bg w-full items-end h-fit md:h-60 md:mb-4 relative"
      style={{
        backgroundImage: `url(${artistImage || "/liked.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="backdrop absolute h-full w-full bg-black opacity-40 "></div>
      <div
        className=" relative
                    flex 
                    flex-col 
                    justify-center
                    md:justify-start
                    md:flex-row 
                    items-center 
                    gap-x-5
                    md:p-4
                    w-full
                    z-100
                  "
      >
        <div className="flex flex-col gap-y-2 m-4 md:mt-0 w-full">
          <p className="hidden md:block font-semibold text-sm">Artist</p>
          <h1
            className="
                        text-white 
                        text-4xl 
                        lg:text-6xl 
                        font-bold
                        text-center
                        md:text-left
                      "
          >
            {artist.name}
          </h1>
          <div className="flex flex-col justify-center items-center md:items-start">
            <div className="flex flex-row ">
              <p className="text-sm text-neutral-200">
                {artist.description || "No description"}
              </p>
            </div>
            <div className="relative flex justify-start gap-x-20 items-center">
              <PlayButton songIds={songs.map((song: any) => song.id)} />
              <div
                className="size-10 rounded-full cursor-pointer hover:bg-neutral-600/90"
                onClick={handleShare}
              >
                <Share2 className="transition-all w-8 h-10 p-1 text-white m-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
