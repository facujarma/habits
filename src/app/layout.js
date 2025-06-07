import "./globals.css";
import { Lexend } from 'next/font/google'
import ToastClientLayout from "@sections/ToastClientLayout";

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
        className={`${lexend.className} -z-20 xl:py-4 relative antialiased bg-[#060606] h-screen xl:min-h-screen w-full flex flex-col items-center`}
      >
        <div
          className="fixed top-1/2 left-1/2 w-3/4 -z-10 -translate-x-1/2 -translate-y-1/2 hidden xl:block bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(217,_217,_217,_0.38)_0%,_rgba(115,_115,_115,_0)_100%)] aspect-square rounded-full blur-3xl opacity-50  transition-all duration-500"
        />
        <ToastClientLayout />

        <div className="h-[100%] bg-[#111111] w-full max-w-2xl  flex flex-col overflow-x-hidden xl:overflow-y-visible xl:rounded-4xl">

          {children}
        </div>

      </body>
    </html>
  );
}
