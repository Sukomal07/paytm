import express from 'express'
import db from '@repo/db/client'

const app = express()

app.use(express.json())
interface PaymentInformation {
    token: string;
    userId: string;
    amount: string;
}

app.post('/hdfcwebhook', async (req, res) => {
    const { token, userId, amount }: PaymentInformation = req.body
    if (!token || !userId || !amount) {
        return res.status(400).json({
            message: "Invalid request data"
        })
    }

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(userId)
                },
                data: {
                    amount: {
                        increment: Number(amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: token
                },
                data: {
                    status: "Success"
                }
            })
        ])
        return res.status(200).json({
            message: "Captured"
        })
    } catch (error) {
        console.error(error)
        return res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3003)

