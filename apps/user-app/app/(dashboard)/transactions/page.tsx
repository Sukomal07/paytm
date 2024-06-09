import React from 'react'
import TransactionCard from '../../../components/TransactionCard'
import getP2pTransactions from '../../../lib/actions/getP2pTransactions'

export default async function page() {
    const transactions = await getP2pTransactions()
    return (
        <div className='py-3 px-4 flex-1 overflow-y-auto'>
            <TransactionCard transactions={transactions} />
        </div>
    )
}
