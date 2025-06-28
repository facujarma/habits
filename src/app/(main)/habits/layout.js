import Navbar from "@/sections/Navbar";
import Title from "@sections/Title"
export default function RootLayout({ children }) {
  return (
    <>
      <Title />
      <div className="px-4 flex-1 overflow-y-auto xl:overflow-y-visible pb-2 xl:pb-6">
        {children}
      </div>
      <Navbar />
    </>
  );
}
