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
import getSelectCategory from "@/acitons/getSelectCategory";
import getSelectArtist from "@/acitons/getSelectArtist";
import getSelectPlaylist from "@/acitons/getSelectPlaylist";
import getSelectSong from "@/acitons/getSelectSong";
const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smuss",
  description: "Music player for everyone, anytime, anywhere",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userPlaylist = await getUserPlaylists();
  const selectCategory = await getSelectCategory();
  const selectArtist = await getSelectArtist();
  const selectPlaylist = await getSelectPlaylist();
  const selectSong = await getSelectSong();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider
              categories={selectCategory}
              artists={selectArtist}
              playlists={selectPlaylist}
              songs={selectSong}
            />
            <Sidebar playlists={userPlaylist}>
              <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
                <Header>Header</Header>
                {children}
              </div>
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
