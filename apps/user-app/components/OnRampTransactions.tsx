import { Card } from '@repo/ui/card'
import React from 'react'

interface TransactionsProps {
    transactions: {
        time: Date;
        amount: number;
        status: "Success" | "Failure" | "Processing";
        provider: string;
    }[];
}

export default function OnRampTransactions({ transactions }: TransactionsProps) {
    return (
        <Card title='Recent Transactions'>
            <div>
                {!transactions?.length ? (
                    <h1 className='text-center text-xl text-slate-400 pt-2'>
                        No Recent transactions
                    </h1>
                ) : (
                    <div className='py-4 flex flex-col gap-5'>
                        {
                            transactions.map((transaction) => (
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-base text-gray-600 font-semibold'>Received</h2>
                                        <span className="text-slate-500 text-xs">
                                            {transaction.time.toDateString()}
                                        </span>
                                    </div>
                                    <div>
                                        <span className='text-green-600 text-base'>
                                            + &#8377;{transaction.amount / 100}
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </Card>
    )
}
