"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarProps {
    href: string;
    title: string;
    icon: React.ReactNode
}

export default function SidebarItem({ href, title, icon }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href

    function handleClick() {
        router.replace(href)
    }

    return (
        <div className={`${selected ? "text-[#6d4eb7]" : "text-slate-500"} cursor-pointer flex flex-col md:flex-row items-center space-x-2`} onClick={handleClick}>
            <div>
                {icon}
            </div>
            <h3 className={`font-bold hidden md:block ${selected ? "text-[#6d4eb7]" : "text-slate-500"}`}>
                {title}
            </h3>
        </div>
    )
}