import "./globals.css";
import { Lexend } from 'next/font/google'

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
        className={`${lexend.className} relative antialiased bg-[#111111] h-screen w-full flex flex-col items-center`}
      >
        <div className="w-full max-w-2xl h-full flex flex-col xl:overflow-auto">
          {children}
        </div>

      </body>
    </html>
  );
}
