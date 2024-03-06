import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getCategories from "./getCategories";
import { Playlist, Song, Artist, Category } from "@/types";

interface SearchResult {
  playlists: Playlist[];
  songs: Song[];
  artists: Artist[];
  categories: Category[];
}

const getSearchResult = async (query: string): Promise<SearchResult> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  let playlists: Playlist[] = [];
  let songs: Song[] = [];
  let artists: Artist[] = [];
  let categories: Category[] = [];
  if (!query) {
    const defaultSearchView = await getCategories();
    return {
      playlists,
      songs,
      artists,
      categories: defaultSearchView,
    };
  }

  // Tìm kiếm danh sách các Artist
  const artistSearchResult = await supabase
    .from("artist")
    .select("*")
    .limit(6)
    .ilike("name", `%${query}%`)
    .order("created_at", { ascending: false });

  // Tìm kiếm danh sách các Playlist
  const playlistSearchResult = await supabase
    .from("playlist")
    .select("*, users!inner(*)")
    .limit(6)
    .eq("users.role", "admin")
    .ilike("name", `%${query}%`)
    .order("created_at", { ascending: false });

  // Tìm kiếm danh sách các Song
  const songSearchResult = await supabase
    .from("songs")
    .select("*")
    .limit(6)
    .ilike("title", `%${query}%`)
    .order("created_at", { ascending: false });

  // Kiểm tra lỗi trong quá trình tìm kiếm
  if (
    playlistSearchResult.error ||
    songSearchResult.error ||
    artistSearchResult.error
  ) {
    console.log("Error occurred during search.");
    console.log(
      playlistSearchResult.error ??
        songSearchResult.error ??
        artistSearchResult.error
    );
    // Xử lý lỗi tại đây nếu cần thiết
  }

  if (playlistSearchResult.data) {
    playlists = playlistSearchResult.data;
  }

  if (songSearchResult.data) {
    songs = songSearchResult.data;
  }

  if (artistSearchResult.data) {
    artists = artistSearchResult.data;
  }

  return {
    playlists,
    songs,
    artists,
    categories,
  };
};

export default getSearchResult;
