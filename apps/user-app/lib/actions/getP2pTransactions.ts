"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export default async function getP2pTransactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticate user"
        }
    }

    const sentTransactions = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: session.user.id
        },
        include: {
            fromUser: true,
            toUser: true
        }
    });

    const receiveTransactions = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: session.user.id
        },
        include: {
            fromUser: true,
            toUser: true
        }
    });

    const transactions = [...sentTransactions, ...receiveTransactions];

    return transactions;
}
