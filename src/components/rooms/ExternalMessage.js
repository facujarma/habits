import { IconMenu4 } from '@tabler/icons-react'
import React from 'react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    useDisclosure,
    addToast,
} from "@heroui/react";
import { deleteMessage } from '@root/utils/rooms';
function ExternalMessage({ message, isAdmin, roomID }) {

    const handleOptionSelected = (option) => {

        if (option === "delete") {
            deleteMessage(roomID, message.id).then(() => {
                addToast({
                    title: 'Success',
                    description: 'Message deleted successfully. Reload the page to see the changes.',
                    color: 'success'
                })
            })

        }
    }

    return (
        <li className='flex flex-col'>
            <span className='text-[#C5C5C5] text-sm'>{message.username}</span>
            <div className='w-fit bg-[#242424] rounded-2xl p-2 flex gap-2'>
                <p>{message.content}</p>
                {
                    isAdmin && (
                        <Dropdown >
                            <DropdownTrigger >
                                <div>
                                    <IconMenu4 className="text-[#C5C5C5]" />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dropdown Variants" onAction={(key) => handleOptionSelected(key)}>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete Message
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )
                }
            </div>

        </li>
    )
}

export default ExternalMessage