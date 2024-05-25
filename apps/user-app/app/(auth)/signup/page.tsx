"use client"
import { useForm } from "react-hook-form"
import type { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TSignUpSchema, signupSchema } from "../../../types/authTypes";
import toast from "react-hot-toast";
import { Button } from "@repo/ui/button";
const signup = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: ""
        }
    })

    const onSubmit = async (data: FieldValues) => {

        const { name, email, phone, password } = data;

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, phone, password }),
            });
            const data = await response.json()
            if (!response.ok) {
                toast.error(data.message)
            } else {
                reset()
                router.replace('/signin')
            }
        } catch (error: any) {
            console.error("Registration Failed:", error);
            toast.error(error.message)
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen justify-center gap-8">
            <h2 className="text-center text-xl font-bold">
                Create an account
            </h2>
            <div className="flex flex-col items-center justify-center gap-4">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/3 space-y-4 px-4 md:px-0">
                    <div>
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="Enter name"
                            className={`w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500 ${errors.name ? "border-2 border-red-500 outline-none" : "outline-blue-600"}`}
                        />
                        {errors.name && (
                            <p className="py-2 text-xs text-red-500">{`${errors.name.message}`}</p>
                        )}
                    </div>

                    <div>
                        <input
                            {...register('email')}
                            type="text"
                            placeholder="Enter email"
                            className={`w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500 ${errors.email ? "border-2 border-red-500 outline-none" : "outline-blue-600"}`}
                        />
                        {errors.email && (
                            <p className="py-2 text-xs text-red-500">{`${errors.email.message}`}</p>
                        )}
                    </div>

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

                    <Button disabled={isSubmitting} btnType="submit" className="w-full bg-blue-700  text-white text-xl py-2 rounded-full disabled:bg-blue-400">
                        Sign Up
                    </Button>
                </form>
                <p>
                    Already have an account? {' '}
                    <Link href={'/signin'} className="text-blue-600 underline hover:text-blue-500">
                        Sign in now
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default signup
