"use client"
import React, { useState } from 'react'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/textInput'
import { SelectInput } from '@repo/ui/selectInput'
import { Button } from '@repo/ui/button'
import createOnrampTransaction from '../lib/actions/createOnrampTransaction'
import updateBalance from '../lib/actions/updateBalance'

const SUPPORTED_BANKS = [
    {
        name: "Select bank",
        redirectUrl: ""
    },
    {
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    },
    {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/"
    }
];

export default function Addmoney() {
    const [amount, setAmount] = useState("");
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState("")

    const handleBankSelect = (selectedBankName: string) => {
        const selectedBank = SUPPORTED_BANKS.find(bank => bank.name === selectedBankName);
        if (selectedBank) {
            setProvider(selectedBank.name)
            setRedirectUrl(selectedBank.redirectUrl);
        }
    };

    const handleAmountChange = (value: string) => {
        setAmount(value);
    };

    const handleClick = async () => {
        if (redirectUrl) {
            const res = await createOnrampTransaction(Number(amount), provider)
            if (res.transaction) {
                await updateBalance(res.transaction.token, res.transaction.amount)
            }
            window.location.href = redirectUrl
        }
    };

    return (
        <Card title='Add Money'>
            <div className='flex flex-col gap-3 h-full justify-center'>
                <TextInput type='number' label='amount' value={amount} placeholder='Enter Amount' onChange={handleAmountChange} />
                <SelectInput label='bank' onSelect={handleBankSelect} options={SUPPORTED_BANKS.map(bank => ({ key: bank.name, value: bank.name }))} />
                <Button className=" bg-blue-700 hover:bg-blue-500 text-white text-base py-2 px-4 rounded-md disabled:bg-blue-400" onClick={handleClick} disabled={!redirectUrl || !amount || redirectUrl === ""}>
                    Add Money
                </Button>
            </div>
        </Card>
    )
}
