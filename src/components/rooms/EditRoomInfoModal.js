'use client'

import React, { useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast,
    Button
} from "@heroui/react"
import Input from '../Input'
import { useRooms } from '@root/context/roomsContext'
import CustomButton from '../Button'
import { IconClipboard, IconTrash, IconUser } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function EditRoomInfoModal({ isOpen, onOpenChange, onClose, defName, defDescription, roomID, isAdmin, roomLink }) {
    const { t } = useTranslation('common')

    const [name, setName] = useState(defName)
    const [description, setDescription] = useState(defDescription)

    const { editRoomInfo, deleteRoomFront } = useRooms()

    const handleChange = async () => {
        try {
            await editRoomInfo(roomID, { name, description })

            addToast({
                title: t('editRoomInfoModal_toast_editSuccess_title'),
                description: t('editRoomInfoModal_toast_editSuccess_description'),
                color: "success",
                timeout: 2000
            })

        } catch (e) {
            console.log(e)
            addToast({
                title: t('editRoomInfoModal_toast_error_title'),
                description: t('editRoomInfoModal_toast_error_editDescription'),
                color: "danger",
                timeout: 2000
            })
        }
    }

    const handleRemove = async () => {
        try {
            await deleteRoomFront(roomID)
        } catch (e) {
            console.log(e)
            addToast({
                title: t('editRoomInfoModal_toast_error_title'),
                description: t('editRoomInfoModal_toast_error_deleteDescription'),
                color: "danger",
                timeout: 2000
            })
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {t('editRoomInfoModal_title')}
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                disabled={!isAdmin}
                                label={t('editRoomInfoModal_label_name')}
                                placeholder={t('editRoomInfoModal_label_name_placeholder')}
                                defaultValue={name}
                                setText={setName}
                            />
                            <Input
                                disabled={!isAdmin}
                                label={t('editRoomInfoModal_label_description')}
                                placeholder={t('editRoomInfoModal_label_description_placeholder')}
                                defaultValue={description}
                                setText={setDescription}
                            />
                            <CustomButton
                                text={t('editRoomInfoModal_button_copyInvitation')}
                                icon={<IconClipboard />}
                                handleClick={() =>
                                    navigator.clipboard.writeText(window.location.origin + "/api/invite/" + roomLink).then(() => {
                                        addToast({
                                            title: t('editRoomInfoModal_toast_copySuccess_title'),
                                            description: t('editRoomInfoModal_toast_copySuccess_description'),
                                            color: "success",
                                            timeout: 2000
                                        })
                                    })
                                }
                            />
                            {isAdmin && (
                                <>
                                    <CustomButton
                                        text={t('editRoomInfoModal_button_viewMembers')}
                                        icon={<IconUser />}
                                        handleClick={() => {
                                            redirect("/rooms/members/" + roomID)
                                        }}
                                    />
                                    <CustomButton
                                        text={t('editRoomInfoModal_button_deleteRoom')}
                                        icon={<IconTrash />}
                                        handleClick={() => {
                                            handleRemove()
                                        }}
                                    />
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>{t('editRoomInfoModal_button_cancel')}</Button>
                            <Button color="primary" onPress={() => { handleChange() }}>
                                {t('editRoomInfoModal_button_edit')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default EditRoomInfoModal
