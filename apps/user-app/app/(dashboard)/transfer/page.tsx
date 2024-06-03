import React from 'react'
import Addmoney from '../../../components/Addmoney'
import BalanceCard from '../../../components/BalanceCard'

export default function page() {
    return (
        <div className='flex-1 py-3 px-6 flex flex-col gap-10'>
            <h1 className='text-slate-700 text-xl font-semibold text-center'>Transfer Money</h1>
            <div className='h-full flex flex-col space-y-3'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className=' border border-slate-400 rounded-md shadow-md p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer '>
                        <Addmoney />
                    </div>
                    <div className=' border border-slate-400 rounded-md shadow-md p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer'>
                        <BalanceCard amount={0} locked={0} />
                    </div>
                </div>
                <div>
                    onramptransactions
                </div>
            </div>
        </div>
    )
}
