import { Card } from '@repo/ui/card'
import React from 'react'

interface BalanceProps {
    amount: number;
    locked: number;
}

export default function BalanceCard({ amount, locked }: BalanceProps) {
    return (
        <Card title='Balance'>
            <div className='flex flex-col gap-3 h-full justify-center space-y-6'>
                <div className='flex justify-between border-b border-slate-300'>
                    <h1 className='text-blue-500 font-semibold'>Unlocked balance</h1>
                    <h3 className='text-green-500 text-lg font-semibold'>{amount / 100} &#8377;</h3>
                </div>
                <div className='flex justify-between border-b border-slate-300'>
                    <h1 className='text-blue-500 font-semibold'>Total locked balance</h1>
                    <h3 className='text-red-500 text-lg font-semibold'>{locked / 100} &#8377;</h3>
                </div>
                <div className='flex justify-between border-b border-slate-300'>
                    <h1 className='text-blue-500 font-semibold'>Total balance</h1>
                    <h3 className='text-green-500 text-lg font-semibold'>{(amount + locked) / 100} &#8377;</h3>
                </div>
            </div>
        </Card>
    )
}
