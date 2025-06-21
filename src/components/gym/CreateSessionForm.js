'use client'

import React from 'react'
import Input from '@root/components/Input'
import SeparatorLine from '@root/components/SeparatorLine'
import Button from '../Button'
function CreateSessionForm() {
    return (
        <div className='flex flex-col gap-6'>
            <Input label="Session name" placeholder="Type your session name" />
            <SeparatorLine />
            <div>

            </div>
            <Button text="Add an exercice" />
        </div>
    )
}

export default CreateSessionForm