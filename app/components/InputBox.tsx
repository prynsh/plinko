import React, { ReactNode } from 'react'

interface Input{
    label:string,
    placeholder:string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value:string

}


export default function InputBox({label,placeholder,onChange,value}:Input) {
    return (
        <div>
            <div className='text-black'>{label}</div>
            <div className='bg-black rounded-lg w-1/6'>
                <div className='text-white p-2'>
                    <input className='border-none w-full'  placeholder={placeholder} onChange={onChange} value={value}></input>
                </div>
            </div>
        </div>
    )
}