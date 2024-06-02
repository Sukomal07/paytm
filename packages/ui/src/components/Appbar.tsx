import { Button } from "../button"

interface AppbarProps {
    status: string;
    onSignin: () => void
    onSignout: () => void
}

export const Appbar = ({ status, onSignin, onSignout }: AppbarProps) => {
    return (
        <div className="flex justify-between border-b py-4 px-8">
            <h1 className="text-2xl font-semibold">Paytm</h1>
            <Button onClick={status === "authenticated" ? onSignout : onSignin} className=" bg-blue-700 hover:bg-blue-500 text-white text-base py-2 px-4 rounded-md disabled:bg-blue-400">
                {
                    status === "authenticated" ? "Logout" : "Login"
                }
            </Button>
        </div>
    )
}