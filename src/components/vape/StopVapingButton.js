'use client'

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, addToast } from '@heroui/react'
import React from 'react'
import { motion } from 'motion/react'
import { startVapeProgram } from '@lib/vape'
import { redirect } from 'next/navigation'
function StopVapingButton() {

    const handleConfirmInit = async () => {
        try {
            await startVapeProgram();
            addToast({
                title: "Programa iniciado",
                description: "El programa se ha iniciado correctamente.",
                color: "success",
                timeout: 2000
            })
            redirect('/vape')
        } catch (e) {
            addToast({
                title: "Error",
                description: "Ha ocurrido un error al iniciar el programa.",
                color: "danger",
                timeout: 2000
            })
            console.log(e);
        }
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Start the process of stopping vaping.</ModalHeader>
                            <ModalBody>
                                <p>
                                    We will change the home page with a new section to help you quit vaping.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={() => { handleConfirmInit(); onClose(); }}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="z-10 mt-8 w-full h-14 bg-[#151A31] rounded-2xl border-2 border-[#666F9A] flex items-center justify-center gap-2">

                <span className="text-[#C5C5C5] text-xl">
                    I want to stop vaping
                </span>
            </motion.button>
        </>
    )
}

export default StopVapingButton