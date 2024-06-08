"use client"

import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/textInput'
import React, { useState } from 'react'
import p2pTransfer from '../lib/actions/p2pTransfer'
import toast from 'react-hot-toast'

export default function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    const handelClick = async () => {
        if (number && amount) {
            try {
                const response = await p2pTransfer(number, Number(amount) * 100)
                toast.success(response.message)
                setNumber("")
                setAmount("")
            } catch (error: any) {
                toast.error(error.message)
            }
        }
    }
    return (
        <div className='h-fit w-96 bg-gray-50 shadow-lg rounded-md py-6 px-6'>
            <Card title='Send'>
                <div className='flex flex-col gap-3 mb-2'>
                    <TextInput label='number' type='number' placeholder='Enter phone number' value={number} onChange={(value) => { setNumber(value) }} />
                    <TextInput label='amount' type='number' value={amount} placeholder='Enter amount' onChange={(value) => { setAmount(value) }} />
                </div>
                <Button className=" bg-blue-700 hover:bg-blue-500 text-white text-base py-2 px-4 rounded-md disabled:bg-blue-400" disabled={!number || !amount} onClick={handelClick}>
                    Send
                </Button>
            </Card>
        </div>
    )
}