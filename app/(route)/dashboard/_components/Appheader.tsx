import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';
function Appheader() {
    const menuoptions = [
        {
            id:1,
            name:'Home',
            path : '/dashboard'
        },
        {
            id:2,
            name:'History',
            path : '/dashboard/history'
        },
        {
            id:3,
            name:'Pricing',
            path : '/dashboard/biling'
        },
        {
            id:4,
            name:'Profile',
            path : '/'
        }
    ]
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
        <Image src='/logo.png' alt='logo' width={180} height={90}/>
        <div className='hidden md:flex gap-12 items-center'>
        {
            menuoptions.map((option , index)=>(
                <Link key={index} href={option.path}>
                   <h2 className='hover:font-bold cursor-pointer'>{option.name}</h2>
                </Link>
            ))
        }
        </div>
        <UserButton/>
    </div>
  )
}

export default Appheader
