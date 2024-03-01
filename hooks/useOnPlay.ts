import { Song } from "@/types";

import usePlayer from "./usePlayer";
// import useSubscribeModal from "./useSubscribeModal";
import { useAuthModal } from "./useModal";
import { useUser } from "./useUser";

const useOnPlay = (
  songs: Song[]
  // , type: string
) => {
  const player = usePlayer();
  //   const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const { subscription, user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    // if (songs.length === 0) {
    //   console.log("no songs");
    //   return;
    // }

    // if (!subscription) {
    //   return subscribeModal.onOpen();
    // }
    // if (type === "song") {
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
    // } else {
    //   player.setId(songs[0].id);
    //   player.setIds(songs.map((song) => song.id));
    // }
  };

  return onPlay;
};

export default useOnPlay;
