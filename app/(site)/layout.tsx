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
import Player from "@/components/layout/Player";
import getActiveProductsWithPrices from "@/acitons/getActiveProductsWithPrices";

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
  const products = await getActiveProductsWithPrices();
  const userPlaylist = await getUserPlaylists();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
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
