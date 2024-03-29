import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getCategories from "./getCategories";
import { Playlist, Song, Artist, Category } from "@/types";

interface SearchResult {
  playlists: Playlist[];
  albums: Playlist[];
  songs: Song[];
  artists: Artist[];
  categories: Category[];
}

const getSearchResult = async (query: string): Promise<SearchResult> => {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  let playlists: Playlist[] = [];
  let albums: Playlist[] = [];
  let songs: Song[] = [];
  let artists: Artist[] = [];
  let categories: Category[] = [];
  if (!query) {
    const defaultSearchView = await getCategories();
    return {
      playlists,
      albums,
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
    .is("artist_id", null)
    .ilike("name", `%${query}%`)
    .order("created_at", { ascending: false });

  // Tìm kiếm danh sách các Album (Playlist có artist_id)
  const albumSearchResult = await supabase
    .from("playlist")
    .select("*, artist!inner(*)")
    .limit(6)
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
    albumSearchResult.error ||
    songSearchResult.error ||
    artistSearchResult.error
  ) {
    console.log("Error occurred during search.");
    console.log(
      playlistSearchResult.error ??
        albumSearchResult.error ??
        songSearchResult.error ??
        artistSearchResult.error
    );
    // Xử lý lỗi tại đây nếu cần thiết
  }

  if (playlistSearchResult.data) {
    playlists = playlistSearchResult.data;
  }

  if (albumSearchResult.data) {
    albums = albumSearchResult.data;
  }

  if (songSearchResult.data) {
    songs = songSearchResult.data;
  }

  if (artistSearchResult.data) {
    artists = artistSearchResult.data;
  }

  return {
    playlists,
    albums,
    songs,
    artists,
    categories,
  };
};

export default getSearchResult;
