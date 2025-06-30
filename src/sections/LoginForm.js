'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useState } from 'react'
import { login } from '@root/app/(main)/auth/actions'
import { addToast } from '@heroui/toast'
import { useTranslation } from 'react-i18next'

function LoginForm() {
    const { t } = useTranslation('common')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (e) => {
        e.preventDefault()
        sessionStorage.clear()

        const { error } = await login(email, password)
        if (error) {
            addToast({
                title: t('error') || 'Error',
                description: error,
                color: 'danger',
                timeout: 2000,
            })
        }
    }

    return (
        <form className="flex flex-col gap-6 mb-6" onSubmit={loginUser}>
            <div className="flex flex-col gap-2">
                <Input label={t('email') || 'Email'} placeholder={t('email_placeholder') || 'Type your email'} setText={setEmail} />
                <Input
                    label={t('password') || 'Password'}
                    placeholder={t('password_placeholder') || 'Type your password'}
                    isPassword
                    setText={setPassword}
                />
            </div>
            <Button text={t('login_button') || 'Log in'} />
            <span className="text-[#C5C5C5] text-lg">
                {t('no_account') || "You don't have an account of Habits.? "}
                <a href="/auth/signup" className="underline">
                    {t('sign_up') || 'Sign Up'}
                </a>
            </span>
        </form>
    )
}

export default LoginForm
