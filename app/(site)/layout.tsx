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
import Script from "next/script";

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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MQVD3Q2EKC"
        ></Script>
        <Script id="google analytics">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-MQVD3Q2EKC');
 `}
        </Script>
        <Script
          async
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8454362361421232"
          crossOrigin="anonymous"
        ></Script>
        {/* Hydration Error? 
        Hydration failed because the initial UI does not match what was rendered on the server */}
        {/* <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="fluid"
          data-ad-layout-key="+1i+s2-10-1k+6v"
          data-ad-client="ca-pub-8454362361421232"
          data-ad-slot="9703072887"
        ></ins> */}
        {/* <Script id="adsbygoogle">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script> */}
      </head>
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
