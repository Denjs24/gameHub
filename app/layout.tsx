import type { Metadata } from "next";
import "./ui/globals.css";
import { inter } from "./ui/fonts";
import { Header } from "./ui/components/home/Header";
import { Sidebar } from "./ui/components/home/Sidebar";

export const metadata: Metadata = {
  title: "GameHub",
  description: "GameHub is a platform for gamers to find and share their favorite games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-full w-full flex flex-col`} >
        <Header />
        <div className="flex flex-col container mx-auto mt-24 mb-10 flex-auto pb-8 px-5 md:flex-row gap-y-5 md:mt-30">
          <aside className="md:basis-50">
            <Sidebar />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
