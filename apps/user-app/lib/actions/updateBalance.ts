"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export default async function updateBalance(token: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    try {
        await fetch("http://localhost:3003/webhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, userId: session.user?.id, amount }),
        })
        return {
            message: "Updated"
        }
    } catch (error: any) {
        console.error(error)
        return {
            message: error.message
        }
    }

}
