
import React from 'react'
import { BeatLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className='flex justify-center items-center h-screen '>

            <BeatLoader
                color="#0D542B"
                size={18}
            />
        </div>
    )
}
