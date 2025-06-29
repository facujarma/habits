'use client'

import React, { useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast,
    Button,
    useDisclosure
} from "@heroui/react"
import { IconTrash, IconUserPlus } from '@tabler/icons-react'
import { expulseMemberFromRoom, makeMemberAdmin } from '@root/utils/rooms'
import { useTranslation } from 'react-i18next'

function MemberContainer({ member, roomID }) {
    const { t } = useTranslation('common')

    const [alertText, setAlertText] = useState('')
    const [confirmFunction, setConfirmFunction] = useState(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const removeMember = async (id) => {
        try {
            await expulseMemberFromRoom(roomID, id)
            addToast({
                title: t('success'),
                description: t('success_remove_member'),
                color: "success",
            })
        } catch (e) {
            addToast({
                title: t('error'),
                description: t('error_remove_member'),
                color: "danger",
            })
            console.log(e)
        }
    }

    const makeAdmin = async (id) => {
        try {
            await makeMemberAdmin(roomID, id)
            addToast({
                title: t('success'),
                description: t('success_make_admin'),
                color: "success",
            })
        } catch (e) {
            addToast({
                title: t('error'),
                description: t('error_make_admin'),
                color: "danger",
            })
            console.log(e)
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{t('modal_confirm_title')}</ModalHeader>
                            <ModalBody>
                                <p>{alertText}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose}>{t('modal_confirm_cancel')}</Button>
                                <Button color="primary" onPress={() => { confirmFunction() }}>
                                    {t('modal_confirm_confirm')}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div className='w-full flex justify-between items-center my-4 border border-[#616161] bg-[#242424]/40 rounded-2xl p-4'>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <h2 className='text-xl text-white font-bold'>{member.username}</h2>
                        <p className='text-sm text-[#C5C5C5]'>{member.role}</p>
                    </div>

                    <div className='flex gap-2'>
                        <Button
                            className='aspect-square px-0 h-10 min-w-0 flex items-center justify-center'
                            onClick={() => {
                                setAlertText(t('make_admin_alert', { username: member.username }))
                                setConfirmFunction(() => () => makeAdmin(member.userID))
                                onOpen()
                            }}>
                            <IconUserPlus />
                        </Button>

                        <Button
                            onClick={() => {
                                setAlertText(t('remove_member_alert', { username: member.username }))
                                setConfirmFunction(() => () => removeMember(member.userID))
                                onOpen()
                            }}
                            color="danger"
                            className='aspect-square px-0 h-10 min-w-0 flex items-center justify-center'>
                            <IconTrash />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberContainer
