'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { IconBrandGoogle, IconBrandGoogleFilled } from '@tabler/icons-react'
import React, { useState } from 'react'
function SignupForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form className="flex flex-col gap-6 mb-6">
            <div className='flex flex-col gap-2'>
                <Input label="Nombre" placeholder="Escribe tu nombre" setText={setName} />
                <Input label="Email" placeholder="Escribe tu email" setText={setEmail} />
                <Input label="Contraseña" placeholder="Escribe tu contraseña" isPassword setText={setPassword} />
            </div>
            <Button text={"Crear Cuenta"} handleClick={() => { }} />
            <span className='text-[#C5C5C5] text-lg'>
                ¿Ya tienes una cuenta de Habits.? <a href="/auth/login" className='underline'>Inicia sesion</a>
            </span>
        </form>

    )
}

export default SignupForm