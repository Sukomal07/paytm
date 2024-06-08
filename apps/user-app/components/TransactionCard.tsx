"use client"
import { Card } from '@repo/ui/card'
import React, { useEffect, useState } from 'react'
import getP2pTransactions from '../lib/actions/getP2pTransactions'

export default function TransactionCard() {
    const [transactions, setTransactions] = useState({})
    useEffect(() => {
        async function fetchdata() {
            const res = await getP2pTransactions()
            setTransactions(res)
        }
        fetchdata()
    }, [])

    console.log(transactions)
    return (
        <Card title='Recent Transactions'>
            <div>

            </div>
        </Card>
    )
}
