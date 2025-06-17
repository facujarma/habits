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
      <Header title={"Create an account"} text={"Welcome to Habits. We hope you have a great day."} />
      <SignupForm />
      <SeparatorLine />
      <h2 className="text-[#C5C5C5] text-lg my-6">Or sign up with (no apps yet):</h2>
      {/* <Button icon={<IconBrandGoogleFilled />} text={"Google"} handleClick={() => handleLoginWithGoogle()} /> */}
    </div>
  )
}

export default page