'use client'

import SeparatorLine from "@/components/SeparatorLine"
import Header from "@/sections/Header"
import SignupForm from "@/sections/SignupForm"
import Button from "@/components/Button"
import { IconBrandGoogleFilled } from "@tabler/icons-react"

function page() {

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle()
  }

  return (
    <div>
      <Header title={"Crear una cuenta"} text={"Con Habits. podrás mejorar tu calidad de vida rápidamente."} />
      <SignupForm />
      <SeparatorLine />
      <h2 className="text-[#C5C5C5] text-lg my-6">O inicia sesion con:</h2>
      <Button icon={<IconBrandGoogleFilled />} text={"Google"} handleClick={() => handleLoginWithGoogle()} />
    </div>
  )
}

export default page