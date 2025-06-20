import { IconList, IconSwipe } from '@tabler/icons-react'
import React from 'react'

function ListModeSwitch({ listMode, setListMode }) {

    const handleClick = () => {
        if (listMode === "Swipe") setListMode("List")
        else setListMode("Swipe")
    }

    return (
        <button
            onClick={handleClick}
            className='h-10 w-10 aspect-square flex items-center justify-center bg-[#242424] rounded-2xl border-none'>
            {
                listMode == "Swipe" ? <IconList /> : <IconSwipe />
            }
        </button>
    )
}

export default ListModeSwitch