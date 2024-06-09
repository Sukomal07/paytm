import { Card } from '@repo/ui/card'

interface TransactionCardProps {
    transactions: {
        time: Date;
        amount: number;
        type: string;
        userNumber: string;
    }[]
}

export default function TransactionCard({ transactions }: TransactionCardProps) {

    return (
        <Card title='Recent Transactions'>
            <div>
                {!transactions?.length ? (
                    <h1 className='text-center text-xl text-slate-400 pt-2'>
                        No Recent transactions
                    </h1>
                ) : (
                    <div className='py-4 mb-16 md:mb-0 flex flex-col gap-5'>
                        {
                            transactions.map((transaction) => (
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-base text-gray-600 font-semibold'>{
                                            transaction.type === "DEBIT" ? `Sent to ${transaction.userNumber}` : `Received from ${transaction.userNumber}`
                                        }</h2>
                                        <span className="text-slate-500 text-xs">
                                            {transaction.time.toDateString()}
                                        </span>
                                    </div>
                                    <div>
                                        {
                                            transaction.type === "DEBIT" ? (
                                                <span className='text-red-600 text-base'>
                                                    - &#8377;{transaction.amount / 100}
                                                </span>
                                            ) : (
                                                <span className='text-green-600 text-base'>
                                                    + &#8377;{transaction.amount / 100}
                                                </span>
                                            )
                                        }
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
