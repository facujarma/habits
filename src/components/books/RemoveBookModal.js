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
function RemoveBookModal({ isOpen, onOpenChange, bookID }) {

    const { loadBooks } = useBooks();

    const handleDelete = async () => {
        try {
            await deleteBook(bookID);
            await loadBooks(true);
            addToast({
                title: "Book removed",
                description: "The book has been removed successfully.",
                color: "success",
                timeout: 2000
            })
        }
        catch {
            addToast({
                title: "Error",
                description: "An error has occurred while removing the book.",
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
                        <ModalHeader className="flex flex-col gap-1">Remove the Book.</ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to remove the book? This action cannot be undone.</p>

                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="danger" onPress={() => { handleDelete(); onClose(); }}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default RemoveBookModal