'use client'

import Link from 'next/link';
import  logo  from '../assets/jrunlogo.jpg';
import React from 'react'
import Image from 'next/image';

export default function AuthHeader() {
  return (
    <header className='w-full ps-4 md:ps-20 bg-black'>
        <Link href={'/'}>
        <Image src={logo} width={80} alt='jrun logo'/>
        </Link>
    </header>
  )
}
