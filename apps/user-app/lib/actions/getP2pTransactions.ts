"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export default async function getP2pTransactions() {
    const session = await getServerSession(authOptions);

    const transactions = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                {
                    fromUserId: Number(session?.user?.id)
                },
                {
                    toUserId: Number(session?.user?.id)
                }
            ]
        },
        include: {
            fromUser: true,
            toUser: true
        }
    })


    return transactions.map((transaction) => {
        if (transaction.fromUserId === session?.user?.id) {
            return (
                {
                    time: transaction.timestamp,
                    amount: transaction.amount,
                    type: "DEBIT",
                    userNumber: transaction.toUser.number
                }
            )
        }
        else {
            return (
                {
                    time: transaction.timestamp,
                    amount: transaction.amount,
                    type: "CREDIT",
                    userNumber: transaction.fromUser.number
                }
            )
        }
    })
}
