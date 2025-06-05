import { IconHome } from "@tabler/icons-react"

function Navbar() {
  return (
    <nav className="xl:hidden z-50 relative w-screen max-w-2xl h-16 border-t border-[#3F3F3F] bottom-0 bg-[#111111]">
      <ul className="relative flex items-center justify-center h-full w-full px-6">
        <li className="w-20 aspect-2/1 ">
          <a href="/habits" className="w-20 aspect-2/1 duration-200 cursor-pointer bg-[#242424] hover:bg-[#3F3F3F]  rounded-full flex items-center justify-center">
            <IconHome className="w-3/4 h-3/4 text-white" />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar