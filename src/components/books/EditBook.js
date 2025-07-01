'use client'

import { addToast, Select } from '@heroui/react';
import { SelectItem } from '@heroui/select';
import { Skeleton } from '@heroui/skeleton';
import { useBooks } from '@root/context/booksContext';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import { editBook } from '@root/utils/books';
import { useTranslation } from 'react-i18next';

function EditBook({ bookID }) {
    const { t } = useTranslation('common');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pages, setPages] = useState('');
    const [bookType, setBookType] = useState('');

    const [defTitle, setDefTitle] = useState('');
    const [defDescription, setDefDescription] = useState('');
    const [defPages, setDefPages] = useState('');
    const [defBookType, setDefBookType] = useState('');

    const { books, loading, loadBooks } = useBooks();

    useEffect(() => {
        const book = books.find(book => book.id === bookID);
        if (book) {
            setDefTitle(book.title);
            setDefDescription(book.description);
            setDefPages(book.pages);
            setDefBookType(book.type);
            setTitle(book.title);
            setDescription(book.description);
            setPages(book.pages);
            setBookType(book.type);
        }
    }, [books, bookID]);

    const handleEdit = () => {
        try {
            editBook(bookID, title, description, pages, bookType).then(async () => {
                await loadBooks(true);
                addToast({
                    title: t('edit_book_success_title'),
                    description: t('edit_book_success_desc'),
                    color: "success",
                    timeout: 2000
                });
            });
        } catch (e) {
            addToast({
                title: t('edit_book_error_title'),
                description: t('edit_book_error_desc'),
                color: "danger",
                timeout: 2000
            });
        }
    };

    if (loading) return (
        <Skeleton className="z-20 w-full h-64 rounded-2xl flex items-center justify-between" />
    );

    return (
        <div>
            <Input
                label={t('edit_book_title_label')}
                placeholder={t('edit_book_title_placeholder')}
                setText={setTitle}
                defaultValue={defTitle}
            />
            <Input
                label={t('edit_book_description_label')}
                placeholder={t('edit_book_description_placeholder')}
                setText={setDescription}
                defaultValue={defDescription}
            />
            <Input
                label={t('edit_book_pages_label')}
                placeholder={t('edit_book_pages_placeholder')}
                type="number"
                setText={setPages}
                defaultValue={defPages}
            />
            <label className='text-[#C5C5C5] text-lg font-bold'>{t('edit_book_type_label')}</label>

            <Select
                defaultSelectedKeys={[defBookType]}
                variant="faded"
                onSelectionChange={setBookType}
            >
                <SelectItem key={"EBook"}>{t('edit_book_type_ebook')}</SelectItem>
                <SelectItem key={"Printed Book"}>{t('edit_book_type_printed')}</SelectItem>
            </Select>

            <div className="mt-6">
                <Button text={t('edit_book_button_edit')} handleClick={handleEdit} />
            </div>
        </div>
    );
}

export default EditBook;
