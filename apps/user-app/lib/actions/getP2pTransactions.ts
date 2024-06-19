"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

interface User {
    id: number;
    number: string;
}

interface P2PTransfer {
    id: number;
    fromUserId: number;
    toUserId: number;
    timestamp: Date;
    amount: number;
    fromUser: User;
    toUser: User;
}

export default async function getP2pTransactions() {
    const session = await getServerSession(authOptions);

    const transactions: P2PTransfer[] = await prisma.p2pTransfer.findMany({
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


    return transactions.map((transaction: P2PTransfer) => {
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
