import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../lib/auth'
import prisma from '@repo/db/client'
import BalanceCard from '../../../components/BalanceCard'
import { Button } from '@repo/ui/button'
import Link from 'next/link'

async function getBalance(userId: string) {
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(userId)
        }
    })
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export default async function page() {
    const session = await getServerSession(authOptions)
    const balance = await getBalance(session?.user?.id)

    return (
        <div className='flex-1 h-full'>
            <h1 className='text-[#6b48bc] text-2xl font-bold p-4'>{`Hello ${session?.user?.name}`}</h1>
            <div className='flex flex-col gap-4 p-4'>
                <div className='border border-slate-400 rounded-md shadow-md p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer'>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                </div>
                <Button className=" bg-blue-700 hover:bg-blue-500 text-white text-base py-2 px-4 rounded-md disabled:bg-blue-400">
                    <Link href={'/transfer'}>
                        Add Money
                    </Link>
                </Button>
            </div>

        </div>
    )
}
