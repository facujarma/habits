import Navbar from "@/sections/Navbar";


export default function RootLayout({ children }) {
  return (
    <>
      <h1 className="text-white text-2xl font-bold m-4">
        <a href="/habits">Habits.</a></h1>

      <div className="px-8 flex-1 overflow-y-auto pb-2 xl:pb-6 xl:overflow-hidden">
        {children}
      </div>
      <Navbar />
    </>
  );
}
