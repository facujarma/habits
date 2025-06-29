import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    addToast
} from "@heroui/react";
import { useState } from "react";
import Input from "@components/Input";
import CreateNewHabitFourthStep from "@components/CreateNewHabitFourthStep";
import { useNegativeHabits } from "@root/context/negativeHabitContext";
import { editNegative } from "@lib/negativeHabit";
import { useTranslation } from "react-i18next";

function EditNegativeModal({ negativeID, isOpen, onOpenChange, defBad, defGood }) {
    const { t } = useTranslation('common');

    const [badHabit, setBadHabit] = useState(defBad);
    const [goodHabit, setGoodHabit] = useState(defGood);
    const [color, setColor] = useState(new Set(["#668C9A"]));
    const { loadNegativeHabits } = useNegativeHabits();

    const handleEditHabit = async () => {
        const negative = {
            bad_habit: badHabit,
            good_habit: goodHabit,
            color: Array.from(color)[0],
        };

        try {
            await editNegative(negativeID, negative);
            await loadNegativeHabits(true);
            addToast({
                title: t("editNegativeModal_toastSuccessTitle"),
                description: t("editNegativeModal_toastSuccessDescription"),
                color: "success",
                timeout: 2000
            });

        } catch (e) {
            addToast({
                title: t("editNegativeModal_toastErrorTitle"),
                description: t("editNegativeModal_toastErrorDescription"),
                color: "danger",
                timeout: 2000
            });
            console.log(e);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} theme="dark">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{t("editNegativeModal_title")}</ModalHeader>
                        <ModalBody>
                            <p>{t("editNegativeModal_description")}</p>
                            <Input
                                label={t("editNegativeModal_labelBadHabit")}
                                placeholder={t("editNegativeModal_placeholderBadHabit")}
                                setText={setBadHabit}
                                defaultValue={badHabit}
                            />
                            <Input
                                label={t("editNegativeModal_labelGoodHabit")}
                                placeholder={t("editNegativeModal_placeholderGoodHabit")}
                                setText={setGoodHabit}
                                defaultValue={goodHabit}
                            />
                            <CreateNewHabitFourthStep color={color} setColor={setColor} />
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                {t("editNegativeModal_buttonCancel")}
                            </Button>
                            <Button color="primary" onPress={() => { handleEditHabit(); onClose(); }}>
                                {t("editNegativeModal_buttonSave")}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default EditNegativeModal;
