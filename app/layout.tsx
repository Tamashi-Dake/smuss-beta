import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";
const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smuss Beta",
  description: "Beta version of Smuss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <SupabaseProvider>
          <ModalProvider />
          <UserProvider>
            <Sidebar>
              <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
                {children}
              </div>
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
