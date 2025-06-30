'use client'

import Button from '@components/Button'
import Input from '@components/Input'
import React, { useState } from 'react'
import { signup } from '@root/app/(main)/auth/actions'
import { addToast } from '@heroui/toast'
import { useTranslation } from 'react-i18next'

function SignupForm() {
    const { t } = useTranslation('common')

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
        <form className="flex flex-col gap-6 mb-6" onSubmit={createUser}>
            <div className='flex flex-col gap-2'>
                <Input
                    label={t("signup_username_label")}
                    placeholder={t("signup_username_placeholder")}
                    setText={setName}
                />
                <Input
                    label={t("signup_email_label")}
                    placeholder={t("signup_email_placeholder")}
                    setText={setEmail}
                />
                <Input
                    label={t("signup_password_label")}
                    placeholder={t("signup_password_placeholder")}
                    isPassword
                    setText={setPassword}
                />
            </div>
            <Button text={t("signup_button")} />
            <span className='text-[#C5C5C5] text-lg'>
                {t("signup_login_redirect")} <a href="/auth/login" className='underline'>{t("signup_login_link")}</a>
            </span>
        </form>
    )
}

export default SignupForm
