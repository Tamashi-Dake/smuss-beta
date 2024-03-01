// import { useEffect, useMemo, useState } from "react";
// import { toast } from "react-hot-toast";
// import { useSessionContext } from "@supabase/auth-helpers-react";

// const useGetSongInPlaylist = (id?: string) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [items, setItems] = useState<any[] | undefined>(undefined);
//   const { supabaseClient } = useSessionContext();

//   useEffect(() => {
//     if (!id) {
//       console.error("Playlist id is required");
//       return;
//     }

//     setIsLoading(true);

//     const fetchSong = async () => {
//       const { data, error } = await supabaseClient
//         .from("rel_song_playlist")
//         .select("*, songs: song_id(*)")
//         .eq("playlist_id", id);
//       if (error) {
//         setIsLoading(false);
//         return toast.error(error.message);
//       }

//       setItems(data as any[]);
//       setIsLoading(false);
//     };

//     fetchSong();
//   }, [id, supabaseClient]);

//   return useMemo(
//     () => ({
//       isLoading,
//       items,
//     }),
//     [isLoading, items]
//   );
// };

// export default useGetSongInPlaylist;
