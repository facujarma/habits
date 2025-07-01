'use client'

import React, { useState } from 'react'
import Button from '../Button'
import { Select, addToast } from '@heroui/react'
import { SelectItem } from '@heroui/select'
import Input from '../Input'
import { addBook } from '@root/utils/books'
import { useBooks } from '@root/context/booksContext'
import { useTranslation } from 'react-i18next'

function CreateBook() {
    const { t } = useTranslation('common')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [pages, setPages] = useState('')
    const [bookType, setBookType] = useState('EBook')

    const { loadBooks } = useBooks()

    const handleCreate = async () => {
        const type = Array.from(bookType)[0]

        try {
            await addBook(title, description, pages, type)
            await loadBooks(true)

            addToast({
                title: t('create_book_success_title'),
                description: t('create_book_success_description'),
                color: 'success',
                timeout: 2000
            })
        } catch (e) {
            addToast({
                title: t('create_book_error_title'),
                description: t('create_book_error_description'),
                color: 'danger',
                timeout: 2000
            })
            console.error(e)
        }
    }

    return (
        <div>
            <Input
                label={t('create_book_title_label')}
                placeholder={t('create_book_title_placeholder')}
                setText={setTitle}
            />
            <Input
                label={t('create_book_description_label')}
                placeholder={t('create_book_description_placeholder')}
                setText={setDescription}
            />
            <Input
                label={t('create_book_pages_label')}
                placeholder={t('create_book_pages_placeholder')}
                type="number"
                setText={setPages}
            />
            <label className="text-[#C5C5C5] text-lg font-bold">
                {t('create_book_type_label')}
            </label>

            <Select
                defaultSelectedKeys={['EBook']}
                variant="faded"
                onSelectionChange={setBookType}
            >
                <SelectItem key="EBook">{t('create_book_type_ebook')}</SelectItem>
                <SelectItem key="Printed Book">{t('create_book_type_printed')}</SelectItem>
            </Select>

            <div className="mt-6">
                <Button text={t('create_book_button_create')} handleClick={handleCreate} />
            </div>
        </div>
    )
}

export default CreateBook
