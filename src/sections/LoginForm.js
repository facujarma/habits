'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useState } from 'react'
import { login } from '@/app/auth/actions'
import { addToast } from '@heroui/toast'
function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (e) => {
        e.preventDefault()

        const { error } = await login(email, password)
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
        <form className="flex flex-col gap-6 mb-6" onSubmit={(e) => loginUser(e)}>
            <div className='flex flex-col gap-2'>
                <Input label="Email" placeholder="Escribe tu email" setText={setEmail} />
                <Input label="Contraseña" placeholder="Escribe tu contraseña" isPassword setText={setPassword} />
            </div>
            <Button text={"Iniciar Sesion"} />
            <span className='text-[#C5C5C5] text-lg'>
                ¿No tienes una cuenta de Habits.? <a href="/auth/signup" className='underline'>Crea una</a>
            </span>
        </form>

    )
}

export default LoginForm