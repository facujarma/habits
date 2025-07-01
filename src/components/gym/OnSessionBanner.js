import { useGym } from '@root/context/gymContext'
import { IconArrowRight } from '@tabler/icons-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

function OnSessionBanner() {
    const { session } = useGym()
    const { t } = useTranslation('common')

    if (!session) return null

    return (
        <a
            href={`/gym/onSession/${session.workoutID}`}
            className='flex items-center justify-between w-full p-3 my-4 bg-[#1E1E1E] rounded-2xl '
        >
            <h2 className='text-2xl'>
                {t('gym_on_session_message', 'You are currently working on a session.')}
            </h2>
            <IconArrowRight size={32} className='text-white' />
        </a>
    )
}

export default OnSessionBanner
