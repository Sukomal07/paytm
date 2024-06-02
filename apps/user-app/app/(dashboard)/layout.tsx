import React from 'react'
import AppbarClient from '../../components/AppbarClient'
import Sidebar from '../../components/Sidebar'

export default function layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-col h-screen w-screen'>
            <AppbarClient />
            <div className='flex h-full w-full'>
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

