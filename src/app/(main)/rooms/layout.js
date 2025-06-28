import Navbar from "@/sections/Navbar";
import Title from "@sections/Title"
export default function RootLayout({ children }) {
  return (
    <>
      <Title />
      <div className="px-4 flex-1 overflow-y-auto pb-2 xl:pb-6 xl:overflow-y-auto">
        {children}
      </div>
      <Navbar />
    </>
  );
}
