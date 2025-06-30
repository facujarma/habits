'use client'

import SeparatorLine from "@/components/SeparatorLine"
import Header from "@/sections/Header"
import Button from "@/components/Button"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import LoginForm from "@/sections/LoginForm"
import { loginWithGoogle } from "../actions"
import { useTranslation } from "react-i18next"

function Page() {
  const { t } = useTranslation("common")

  const handleLoginWithGoogle = async () => {
    console.log('login with google')
    await loginWithGoogle()
  }

  return (
    <div>
      <Header title={t("login_title")} text={t("login_subtitle")} />
      <LoginForm />
      <SeparatorLine />
      <h2 className="text-[#C5C5C5] text-lg my-6">{t("login_or_signup_with")}</h2>
      {/* <Button icon={<IconBrandGoogleFilled />} text={"google"} handleClick={handleLoginWithGoogle} /> */}
    </div>
  )
}

export default Page
