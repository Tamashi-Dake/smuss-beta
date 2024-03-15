import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";
import getUserPlaylists from "@/acitons/getUserPlaylists";
import Header from "@/components/layout/Header";
import getCategories from "@/acitons/getCategories";
import getArtists from "@/acitons/getArtists";
import getPlaylists from "@/acitons/getPlaylists";
import getSongs from "@/acitons/getSongs";
import getRelationSongArtist from "@/acitons/getRelationSongArtist";
import getRelationSongPlaylist from "@/acitons/getRelationSongPlaylist";
import getRelationSongCategory from "@/acitons/getRelationSongCategory";
import Player from "@/components/layout/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smuss",
  description: "Music player for everyone, anytime, anywhere",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userPlaylist = await getUserPlaylists();
  const categories = await getCategories();
  const artists = await getArtists();
  const playlists = await getPlaylists();
  const songs = await getSongs();
  const relationshipSongArtist = await getRelationSongArtist();
  const relationshipSongCategory = await getRelationSongCategory();
  const relationshipSongPlaylist = await getRelationSongPlaylist();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider
              categories={categories}
              artists={artists}
              playlists={playlists}
              userPlaylist={userPlaylist}
              songs={songs}
              relationshipSongArtist={relationshipSongArtist}
              relationshipSongCategory={relationshipSongCategory}
              relationshipSongPlaylist={relationshipSongPlaylist}
            />
            <Sidebar playlists={userPlaylist}>
              <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto md:[&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:hidden">
                <Header>Header</Header>
                {children}
              </div>
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
