'use client'

import { addToast, Select } from '@heroui/react';
import { SelectItem } from '@heroui/select';
import { Skeleton } from '@heroui/skeleton';
import { useBooks } from '@root/context/booksContext'
import React, { useEffect, useState } from 'react'
import Button from '../Button';
import Input from '../Input';
import { editBook } from '@root/utils/books';

function EditBook({ bookID }) {
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
        const book = books.find(book => book.id === bookID)
        console.log(book);
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
    }, [books, bookID])


    const handleEdit = () => {
        try {
            editBook(bookID, title, description, pages, bookType).then(async () => {
                await loadBooks(true);
                addToast({
                    title: "Book edited",
                    description: "The book has been edited successfully.",
                    color: "success",
                    timeout: 2000
                })
            })
        }
        catch (e) {
            addToast({
                title: "Error",
                description: "There was an error editing the book.",
                color: "danger",
                timeout: 2000
            })
        }
    }

    if (loading) return (
        <Skeleton className="z-20 w-full h-64 rounded-2xl flex items-center justify-between" />
    )

    return (
        <div>
            <Input label="Title" placeholder="Game of Thrones" setText={setTitle} defaultValue={defTitle} />
            <Input label="Description" placeholder="Book description..." setText={setDescription} defaultValue={defDescription} />
            <Input label="Pages" placeholder="100" type="number" setText={setPages} defaultValue={defPages} />
            <label className='text-[#C5C5C5] text-lg font-bold'>Book type</label>

            <Select defaultSelectedKeys={[defBookType]} variant="faded" onSelectionChange={setBookType}>
                <SelectItem key={"EBook"}>EBook</SelectItem>
                <SelectItem key={"Printed Book"}>Printed Book</SelectItem>
            </Select>
            <div className="mt-6">
                <Button text="Edit" handleClick={handleEdit} />
            </div>
        </div>
    )

}

export default EditBook