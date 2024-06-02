"use client"
import { useForm } from "react-hook-form"
import type { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TSignInSchema, credentialsSchema } from "../../../types/authTypes";
import toast from "react-hot-toast";
import { Button } from "@repo/ui/button";

const signin = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<TSignInSchema>({
        resolver: zodResolver(credentialsSchema),
        defaultValues: {
            phone: "",
            password: ""
        }
    })

    const onSubmit = async (data: FieldValues) => {
        const { phone, password } = data
        const res = await signIn('credentials', {
            redirect: false,
            phone,
            password
        })
        if (res?.error) {
            toast.error(res.error)
        }
        if (res?.ok) {
            router.replace("/dashboard")
            reset()
            toast.success("Log in success")
        }
    }
    return (
        <div className="flex flex-col h-screen w-screen justify-center gap-8">
            <h2 className="text-center text-xl font-bold">
                Sign in to Paytm
            </h2>
            <div className="flex flex-col items-center justify-center gap-4">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/3 space-y-4 px-4 md:px-0">
                    <div>
                        <input
                            {...register('phone')}
                            type="text"
                            placeholder="Enter phone number"
                            className={`w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500 ${errors.phone ? "border-2 border-red-500 outline-none" : "outline-blue-600"}`}
                        />
                        {errors.phone && (
                            <p className="py-2 text-xs text-red-500">{`${errors.phone.message}`}</p>
                        )}
                    </div>

                    <div>
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Enter password"
                            className={`w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500 ${errors.password ? "border-2 border-red-500 outline-none" : "outline-blue-600"}`}
                        />
                        {errors.password && (
                            <p className="p-2 text-xs text-red-500">{`${errors.password.message}`}</p>
                        )}
                    </div>
                    <Button
                        disabled={isSubmitting}
                        btnType="submit"
                        className="w-full bg-blue-700  text-white text-xl py-2 rounded-full disabled:bg-blue-400"
                    >
                        Log In
                    </Button>
                </form>
                <p>
                    Don't have an account? {' '}
                    <Link href={'/signup'} className="text-blue-600 underline hover:text-blue-500">
                        Sign up now
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default signin
