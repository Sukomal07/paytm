import React from 'react'
import Addmoney from '../../../components/Addmoney'

export default function page() {
    return (
        <div className='flex-1 p-3 flex flex-col gap-6'>
            <h1 className='text-slate-700 text-xl font-semibold text-center'>Transfer Money</h1>
            <div className='flex flex-col space-y-3'>
                <div className='flex space-x-3'>
                    <div>
                        <Addmoney />
                    </div>
                    <div>balance</div>
                </div>
                <div>
                    onramptransactions
                </div>
            </div>
        </div>
    )
}
