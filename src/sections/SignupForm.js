'use client'
import Button from '@components/Button'
import Input from '@components/Input'
import React, { useState } from 'react'
import { signup } from '@root/app/auth/actions'
import { addToast } from '@heroui/toast'
function SignupForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const createUser = async (e) => {
        e.preventDefault()
        const { error } = await signup(email, password, name)
        if (error) {
            addToast({
                title: "Error",
                description: error,
                color: "danger",
                timeout: 2000
            })

        }
    }
    return (
        <form className="flex flex-col gap-6 mb-6" onSubmit={(e) => createUser(e)}>
            <div className='flex flex-col gap-2'>
                <Input label="Username" placeholder="Type your username" setText={setName} />
                <Input label="Email" placeholder="Type your email" setText={setEmail} />
                <Input label="Password" placeholder="Type your password" isPassword setText={setPassword} />
            </div>
            <Button text={"Crear Cuenta"} />
            <span className='text-[#C5C5C5] text-lg'>
                Do you have an account? <a href="/auth/login" className='underline'>Log in</a>
            </span>
        </form>

    )
}

export default SignupForm