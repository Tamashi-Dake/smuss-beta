"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lrc, Runner } from "lrc-kit";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import { Music, PenSquare, Timer, User2 } from "lucide-react";
import SectionList from "../home/SectionList";
import SongsWrapper from "../home/SongsWrapper";
import Box from "../shared/Box";
import useGetArtistBySongId from "@/hooks/useGetArtistsBySongId";
import ArtistsWrapper from "../home/ArtistWapper";

interface SongContentProps {
  song: Song;
  songList: Song[];
}

const SongContent: React.FC<SongContentProps> = ({ song, songList }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const [lrc, setLrc] = useState<Lrc | null>(null);
  const { artist: artists } = useGetArtistBySongId(song.id);
  //   const onPlay = useOnPlay(songList);

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.replace("/");
  //   }
  // }, [isLoading, user, router]);

  useEffect(() => {
    const parsedLrc = Lrc.parse(song.lyric);
    setLrc(parsedLrc);
  }, [song.lyric]);
  return (
    <div className="flex flex-col gap-y-2 w-full max-w-screen-xl  bg-neutral-900">
      <SectionList>
        <Box classname="flex flex-col gap-y-2 bg-neutral-800 p-2">
          <div className="flex items-center gap-x-2">
            <PenSquare size={20} />
            <h1 className="text-2xl font-bold">Lyrics</h1>
          </div>
          <ul>
            {lrc && lrc.lyrics.length > 0 ? (
              lrc.lyrics.map((lyric, index) => (
                <li
                  key={index}
                  className={
                    "font-bold text-xl py-2 hover:text-green-200 text-neutral-200"
                  }
                >
                  {lyric.content}
                </li>
              ))
            ) : (
              <li className="font-bold text-2xl hover:text-neutral-200 text-neutral-200">
                No lyrics available
              </li>
            )}
          </ul>
        </Box>
      </SectionList>

      <SectionList>
        <Box classname="flex flex-col gap-y-2 bg-neutral-800 p-2">
          <div className="flex items-center gap-x-2">
            <User2 size={20} />
            <h1 className="text-2xl font-bold">Artists</h1>
          </div>
          <div className="flex items-center gap-x-2">
            {artists.length === 0 ? (
              "Unknown"
            ) : (
              <ArtistsWrapper artists={artists} />
            )}
          </div>
        </Box>
      </SectionList>

      <SectionList>
        <Box classname="flex flex-col gap-y-2 bg-neutral-800 p-2">
          <h1 className="flex items-center gap-x-2 text-2xl font-bold">
            <Music size={20} />
            Recommended
          </h1>
          <SongsWrapper songs={songList} />
        </Box>
      </SectionList>
    </div>
  );
};

export default SongContent;
