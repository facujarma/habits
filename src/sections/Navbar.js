'use client'

import { usePathname } from "next/navigation"
import { IconHome, IconProgress, IconUser } from "@tabler/icons-react"

function Navbar() {
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <nav className="lg:hidden z-50 relative w-screen max-w-2xl h-16 border-t border-[#3F3F3F] bottom-0 bg-[#111111]">
      <ul className="relative flex items-center justify-around h-full w-full px-6">

        <li className="w-20 aspect-2/1">
          <a
            href="/you"
            className={`w-20 aspect-2/1 duration-200 cursor-pointer rounded-full flex items-center justify-center
              ${isActive('/you') ? 'bg-white' : 'bg-[#242424] hover:bg-[#3F3F3F]'}`}
          >
            <IconProgress className={`w-3/4 h-3/4 ${isActive('/you') ? 'text-black' : 'text-white'}`} />
          </a>
        </li>

        <li className="w-20 aspect-2/1">
          <a
            href="/habits"
            className={`w-20 aspect-2/1 duration-200 cursor-pointer rounded-full flex items-center justify-center
              ${pathname !== '/you' && pathname !== '/account' ? 'bg-white' : 'bg-[#242424] hover:bg-[#3F3F3F]'}`}
          >
            <IconHome className={`w-3/4 h-3/4 ${pathname !== '/you' && pathname !== '/account' ? 'text-black' : 'text-white'}`} />
          </a>
        </li>

        <li className="w-20 aspect-2/1">
          <a
            href="/account"
            className={`w-20 aspect-2/1 duration-200 cursor-pointer rounded-full flex items-center justify-center
              ${isActive('/account') ? 'bg-white' : 'bg-[#242424] hover:bg-[#3F3F3F]'}`}
          >
            <IconUser className={`w-3/4 h-3/4 ${isActive('/account') ? 'text-black' : 'text-white'}`} />
          </a>
        </li>

      </ul>
    </nav>
  )
}

export default Navbar
