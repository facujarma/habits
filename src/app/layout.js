import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Lexend } from 'next/font/google'
import Navbar from "@/sections/Navbar";

const lexend = Lexend({
  subsets: ['latin'],
})

export const metadata = {
  title: "Habits.",
  description: "The ultimate habit app and goal tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${lexend.className} antialiased bg-[#111111] min-h-screen w-full`}

      >
        <div className="px-8 h-full">
          {children}
        </div>
        <Navbar />
      </body>
    </html>
  );
}
