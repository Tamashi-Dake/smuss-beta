// import { Song } from "@/types";

// import usePlayer from "./usePlayer";
// // import useSubscribeModal from "./useSubscribeModal";
// import { useAuthModal } from "./useModal";
// import { useUser } from "./useUser";
// import useGetSongInPlaylist from "./useGetSonginPlaylist";
// import { useEffect, useState } from "react";

// const useOnPlaylistPlay = () => {
//   const player = usePlayer();
//   //   const subscribeModal = useSubscribeModal();
//   const authModal = useAuthModal();
//   const [activePlaylist, setActivePlaylist] = useState<string>("");
//   const [songList, setSongList] = useState<any>([]); // Tạo state mới để lưu danh sách bài hát
//   const { subscription, user } = useUser();
//   const { items } = useGetSongInPlaylist(id);
//   useEffect(() => {
//     setActivePlaylist(id);
//     const songList = items && items.map((item: any) => item.songs);
//     setSongList(songList);
//   }, [id, items]);

//   const onPlay = (activePlaylist: string) => {
//     if (!user) {
//       return authModal.onOpen();
//     }
//     console.log(songList);
//     // if (songs.length === 0) {
//     //   console.log("no songs");
//     //   return;
//     // }

//     // if (!subscription) {
//     //   return subscribeModal.onOpen();
//     // }

//     // } else {
//     //   player.setId(songs[0].id);
//     //   player.setIds(songs.map((song) => song.id));
//     // }
//   };

//   return onPlay;
// };

// export default useOnPlaylistPlay;
