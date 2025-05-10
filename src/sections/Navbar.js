import { IconHome } from "@tabler/icons-react"

function Navbar() {
  return (
    <nav className="relative w-screen h-20 border-t border-[#3F3F3F] bottom-20 bg-[#111111]">
        <ul className="relative flex items-center justify-center h-full w-full px-6">
          <li className="w-14 aspect-square bg-[#616161] rounded-full -mt-[20%] flex items-center justify-center">
            <IconHome className="w-3/4 h-3/4 text-white"/>
          </li>
        </ul>
    </nav>
  )
}

export default Navbar