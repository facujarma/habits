'use client'

import React from 'react'
import Button from '../Button'
import { motion } from 'motion/react'
import { IconTrash } from '@tabler/icons-react'
import { logOut } from '@root/utils/user'
import { useDisclosure } from '@heroui/modal'
import DeleteAccountModal from './DeleteAccountModal'
import { useTranslation } from 'react-i18next'

function DangerZone() {
    const { t } = useTranslation('common')
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const logout = async () => {
        await logOut()
        window.location.href = "/auth/login"
    }

    return (
        <div className='mt-6 pb-4'>
            <h2 className='text-2xl text-[#C93C3C] '>
                {t('danger_zone')}
            </h2>
            <div className='my-6 flex flex-col gap-6 '>
                <Button text={t('logout')} handleClick={logout} />
                <motion.button
                    onClick={onOpen}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full h-14 bg-[#C93C3C]/50 rounded-2xl border border-[#C93C3C] flex items-center justify-center gap-2"
                >
                    <span className="w-6 h-6 block text-[#C5C5C5]">
                        <IconTrash />
                    </span>
                    <span className="text-[#C5C5C5] text-xl">
                        {t('delete_account')}
                    </span>
                </motion.button>
                <DeleteAccountModal isOpen={isOpen} onOpenChange={onOpenChange} />
            </div>
        </div>
    )
}

export default DangerZone
