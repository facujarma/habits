import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast
} from "@heroui/react";
import { useBooks } from "@root/context/booksContext";
import { deleteBook } from "@root/utils/books";
import { useTranslation } from "react-i18next";

function RemoveBookModal({ isOpen, onOpenChange, bookID }) {
    const { t } = useTranslation('common');
    const { loadBooks } = useBooks();

    const handleDelete = async () => {
        try {
            await deleteBook(bookID);
            await loadBooks(true);
            addToast({
                title: t('book_removed'),
                description: t('book_removed_success'),
                color: "success",
                timeout: 2000
            });
        }
        catch {
            addToast({
                title: t('error'),
                description: t('book_remove_error'),
                color: "danger",
                timeout: 2000
            });
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{t('remove_book_title')}</ModalHeader>
                        <ModalBody>
                            <p>{t('remove_book_confirmation')}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                {t('cancel')}
                            </Button>
                            <Button color="danger" onPress={() => { handleDelete(); onClose(); }}>
                                {t('delete')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default RemoveBookModal
