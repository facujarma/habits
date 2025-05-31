import "./globals.css";
import { Lexend } from 'next/font/google'
import { ToastProvider } from "@heroui/react";
import ToastClientLayout from "@root/sections/ToastClientLayout";

const lexend = Lexend({
  subsets: ['latin'],
})

export const metadata = {
  title: "Habits.",
  description: "The ultimate habit app and goal tracker",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="dark">
      <body
        className={`${lexend.className} relative antialiased bg-[#111111] h-screen xl:min-h-screen w-full flex flex-col items-center`}
      >
        <ToastClientLayout />

        <div className="w-full max-w-2xl h-full flex flex-col overflow-x-hidden xl:overflow-y-auto">

          {children}
        </div>

      </body>
    </html>
  );
}
