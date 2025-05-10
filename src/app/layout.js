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
        className={`${lexend.className} relative antialiased bg-[#111111] h-screen w-full flex flex-col`}
      >
        <h1 className="text-white text-2xl font-bold p-4">Habits.</h1>

        <div className="px-8 flex-1 mb-20 overflow-y-auto">
          {children}
        </div>
        <Navbar />
      </body>
    </html>
  );
}
