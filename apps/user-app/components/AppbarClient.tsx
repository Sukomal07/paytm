"use client"
import { signOut, useSession } from "next-auth/react"
import { Appbar } from "@repo/ui/Appbar"
import { useRouter } from "next/navigation"

export default function AppbarClient() {
    const session = useSession()
    const router = useRouter()

    const handleSignin = () => {
        router.replace('/signin')
    }

    const handleSignout = async () => {
        await signOut()
        router.push('/signin')
    }
    return (
        <div>
            <Appbar status={session.status} onSignin={handleSignin} onSignout={handleSignout} />
        </div>
    )
}