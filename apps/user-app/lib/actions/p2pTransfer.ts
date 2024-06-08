"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";


export default async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id
    if (!userId) {
        throw new Error("Please login")
    }

    try {
        const toUser = await prisma.user.findUnique({
            where: {
                number: to
            }
        })

        if (!toUser) {
            throw new Error("Enter correct user number")
        }

        await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(userId)
                }
            })
            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient funds');
            }

            await tx.balance.update({
                where: {
                    userId: Number(userId)
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            })

            await tx.balance.upsert({
                where: {
                    userId: Number(toUser.id)
                },
                create: {
                    userId: Number(toUser.id),
                    amount: amount
                },
                update: {
                    amount: {
                        increment: amount
                    }
                }
            }),
                await tx.p2pTransfer.create({
                    data: {
                        amount: amount,
                        timestamp: new Date(),
                        fromUserId: userId,
                        toUserId: toUser.id
                    }
                })
        })
        return {
            message: "Success"
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}
