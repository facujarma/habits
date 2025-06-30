'use client'

import SeparatorLine from "@/components/SeparatorLine"
import Header from "@/sections/Header"
import SignupForm from "@/sections/SignupForm"
import Button from "@/components/Button"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import { loginWithGoogle } from "../actions"
import { useTranslation } from "react-i18next"

function Page() {
  const { t } = useTranslation("common")

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle()
  }

  return (
    <div>
      <Header title={t("signup_title")} text={t("signup_subtitle")} />
      <SignupForm />
      <SeparatorLine />
      <h2 className="text-[#C5C5C5] text-lg my-6">{t("signup_or_with")}</h2>
      {/* <Button icon={<IconBrandGoogleFilled />} text={"google"} handleClick={handleLoginWithGoogle} /> */}
    </div>
  )
}

export default Page
