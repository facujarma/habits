'use client'

import SeparatorLine from "@/components/SeparatorLine"
import Header from "@/sections/Header"
import Button from "@/components/Button"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import LoginForm from "@/sections/LoginForm"
import { loginWithGoogle } from "../actions"

function page() {
  
  const handleLoginWithGoogle = async () => {
    console.log('login with google')
    await loginWithGoogle()
    
  }

  return (
    <div>
      <Header title={"Iniciar sesion"} text={"Bienvenido devuelta a Habits. Te estabamos esperando"} />
      <LoginForm />
      <SeparatorLine />
      <h2 className="text-[#C5C5C5] text-lg my-6">O inicia sesion con:</h2>
      {/* <Button icon={<IconBrandGoogleFilled />} text={"Google"} handleClick={() => handleLoginWithGoogle()} /> */}
    </div>
  )
}

export default page