import { IconSearch } from '@tabler/icons-react'
import React, { useState } from 'react'

function SearchPublicRoom({ search }) {

    const [searchValue, setSearchValue] = useState('')
    const handleSearch = () => {
        search(searchValue);
    }

    return (
        <div className='flex items-center gap-4'>
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} label="Search" placeholder="Search" className='my-6 pl-2 w-full h-12 bg-[#242424] border border-[#616161] rounded-2xl' />
            <button
                onClick={handleSearch}
                className='h-12 aspect-square bg-[#242424] border border-[#616161] rounded-2xl flex items-center justify-center'>
                <IconSearch />
            </button>
        </div>
    )
}

export default SearchPublicRoom