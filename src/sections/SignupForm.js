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
                <Input label="Nombre" placeholder="Escribe tu nombre" setText={setName} />
                <Input label="Email" placeholder="Escribe tu email" setText={setEmail} />
                <Input label="Contraseña" placeholder="Escribe tu contraseña" isPassword setText={setPassword} />
            </div>
            <Button text={"Crear Cuenta"} />
            <span className='text-[#C5C5C5] text-lg'>
                ¿Ya tienes una cuenta de Habits.? <a href="/auth/login" className='underline'>Inicia sesion</a>
            </span>
        </form>

    )
}

export default SignupForm