import React from 'react'
import Addmoney from '../../../components/Addmoney'
import BalanceCard from '../../../components/BalanceCard'
import OnRampTransactions from '../../../components/OnRampTransactions'
import prisma from '@repo/db/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'

async function getBalance() {
    const session = await getServerSession(authOptions)
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    })
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const transactions = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    })
    return transactions.map((transaction) => (
        {
            time: transaction.startTime,
            amount: transaction.amount,
            status: transaction.status,
            provider: transaction.provider
        }
    ))
}

export default async function page() {
    const balance = await getBalance()
    const transactions = await getOnRampTransactions()

    return (
        <div className='flex-1 py-3 px-6 flex flex-col gap-10'>
            <h1 className='text-slate-700 text-xl font-semibold text-center'>Transfer Money</h1>
            <div className='h-full flex flex-col space-y-3'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className=' border border-slate-400 rounded-md shadow-md p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer '>
                        <Addmoney />
                    </div>
                    <div className=' border border-slate-400 rounded-md shadow-md p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer'>
                        <BalanceCard amount={balance.amount} locked={balance.locked} />
                    </div>
                </div>
                <div>
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    )
}
