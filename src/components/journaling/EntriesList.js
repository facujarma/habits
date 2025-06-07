import { getUserJournalHistory } from '@root/utils/journal';
import React, { useEffect, useState } from 'react'

function EntriesList() {

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const loadEntries = async () => {
            const entries = await getUserJournalHistory();
            console.log(entries);
            setEntries(entries);
            setLoading(false);
        }
        loadEntries()
    }, [])

    return (
        <div>
            {
                !loading ?
                    entries.map((entry) => (
                        <div key={entry.id}>
                            <p>{entry.created_at}</p>
                        </div>
                    ))
                    :
                    <p>Loading...</p>
            }
        </div>
    )
}

export default EntriesList