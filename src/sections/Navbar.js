import { IconHome } from "@tabler/icons-react"

function Navbar() {
  return (
    <nav className="relative w-screen max-w-2xl h-16 border-t border-[#3F3F3F] bottom-0 bg-[#111111]">
      <ul className="relative flex items-center justify-center h-full w-full px-6">
        <li className="w-14 aspect-square">
          <a href="/home" className="w-14 aspect-square hover:scale-105 duration-200 cursor-pointer absolute  bg-[#616161] rounded-full -top-1/2 flex items-center justify-center">
            <IconHome className="w-3/4 h-3/4 text-white" />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar