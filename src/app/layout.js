import I18nInitializer from "@root/components/I18NInInitializer"
import "./globals.css"
import { Lexend } from "next/font/google"

const lexend = Lexend({
    subsets: ["latin"],
})

export const metadata = {
    title: "Habits.",
    description: "The ultimate habit app and goal tracker",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Habits",
    },
    icons: {
        apple: "/icons/icon-192x192.png",
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${lexend.className} -z-20 lg:py-4 relative antialiased bg-[#060606] h-screen lg:min-h-screen w-full flex flex-col items-center`}
            >
                <I18nInitializer>
                    {children}
                </I18nInitializer>

            </body>
        </html>
    )
}
