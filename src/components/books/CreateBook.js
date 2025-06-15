'use client'

import React, { useState } from 'react'
import Button from '../Button';
import { IconPlus } from '@tabler/icons-react';
import { useBooks } from '@root/context/booksContext';
import Input from '../Input';
import { addToast, Select } from '@heroui/react';
import { SelectItem } from '@heroui/select';
import { addBook } from '@root/utils/books';

function CreateBook() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pages, setPages] = useState('');
    const [bookType, setBookType] = useState('');

    const { loadBooks } = useBooks();

    const handleCreate = () => {

        const type = Array.from(bookType)[0]
        console.log(type);
        try {
            addBook(title, description, pages, type).then(async () => {
                await loadBooks(true);

                addToast({
                    title: "Book added",
                    description: "The book has been added to your collection successfully.",
                    color: "success",
                    timeout: 2000
                })
            })
        }
        catch (e) {
            addToast({
                title: "Error",
                description: "There was an error adding the book to your collection.",
                color: "danger",
                timeout: 2000
            })
            console.log(e)
        }
    }


    return (
        <div>
            <Input label="Title" placeholder="Game of Thrones" setText={setTitle} />
            <Input label="Description" placeholder="Book description..." setText={setDescription} />
            <Input label="Pages" placeholder="100" type="number" setText={setPages} />
            <label className='text-[#C5C5C5] text-lg font-bold'>Book type</label>

            <Select defaultSelectedKeys={['EBook']} variant="faded" onSelectionChange={setBookType}>
                <SelectItem key={"EBook"}>EBook</SelectItem>
                <SelectItem key={"Printed Book"}>Printed Book</SelectItem>
            </Select>
            <div className="mt-6">
                <Button text="Create" handleClick={() => { handleCreate() }} />
            </div>
        </div>
    )
}

export default CreateBook