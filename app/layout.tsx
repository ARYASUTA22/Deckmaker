import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Navbar from "./Navbar"; // Import Navbar dari file baru

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clash Deck Maker",
  description: "Build your ultimate Clash Royale deck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-light">
        {/* Panggil Component Navbar di sini */}
        <Navbar />

        <main className="container pb-5">
          {children}
        </main>
      </body>
    </html>
  );
}