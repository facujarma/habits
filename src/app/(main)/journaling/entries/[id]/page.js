import EntryData from '@root/components/journaling/EntryData'
import MarkDownEditorForEntry from '@root/components/journaling/MarkDownEditorForEntry'
import React from 'react'

async function page({ params }) {

    const { id } = await params
    return (
        <div>
            <EntryData entryID={id} />
            <MarkDownEditorForEntry entryID={id} />
        </div>
    )
}

export default page