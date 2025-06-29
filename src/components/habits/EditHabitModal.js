'use client'

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
import { editHabit } from "@lib/habits";
import { redirect } from "next/navigation";
import { useHabits } from "@root/context/habitContext";
import IconRenderer from "@components/IconRenderer";
import CreateNewHabitFifthStep from "@components/CreateNewHabitFifthStep";
import { useTranslation } from "react-i18next";

function EditHabitModal({ habitID, isOpen, onOpen, onOpenChange, defName, defWhen, defPersonToBe, defIcon }) {
    const { t } = useTranslation("common");
    const [name, setName] = useState(defName);
    const [when, setWhen] = useState(defWhen);
    const [personToBe, setPersonToBe] = useState(defPersonToBe);
    const [color, setColor] = useState(new Set(["#668C9A"]));
    const [icon, setIcon] = useState(defIcon);
    const { loadHabits } = useHabits();

    const handleEditHabit = async () => {
        const habit = {
            name,
            when,
            personToBe,
            color: Array.from(color)[0],
            icon
        }

        try {
            await editHabit(habitID, habit);
            await loadHabits(true);
            addToast({
                title: t("editHabitModal_toast_success_title"),
                description: t("editHabitModal_toast_success_description"),
                color: "success",
                timeout: 2000
            });
            redirect("/habits");
        } catch (e) {
            addToast({
                title: t("editHabitModal_toast_error_title"),
                description: t("editHabitModal_toast_error_description"),
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
                        <ModalHeader className="flex flex-col gap-1">
                            {t("editHabitModal_title")}
                        </ModalHeader>
                        <ModalBody>
                            <p>{t("editHabitModal_description")}</p>
                            <IconRenderer iconName={icon} color="white" />
                            <Input
                                label={t("editHabitModal_input_name")}
                                placeholder={t("editHabitModal_input_name_placeholder")}
                                setText={setName}
                                defaultValue={name}
                            />
                            <Input
                                label={t("editHabitModal_input_when")}
                                placeholder={t("editHabitModal_input_when_placeholder")}
                                setText={setWhen}
                                defaultValue={when}
                            />
                            <Input
                                label={t("editHabitModal_input_person")}
                                placeholder={t("editHabitModal_input_person_placeholder")}
                                setText={setPersonToBe}
                                defaultValue={personToBe}
                            />
                            <CreateNewHabitFourthStep color={color} setColor={setColor} />
                            <CreateNewHabitFifthStep overflow={true} onSelect={setIcon} />
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                {t("editHabitModal_button_cancel")}
                            </Button>
                            <Button color="primary" onPress={() => { handleEditHabit(); onClose(); }}>
                                {t("editHabitModal_button_save")}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default EditHabitModal;
