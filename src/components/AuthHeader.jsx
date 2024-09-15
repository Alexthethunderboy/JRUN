'use client'

import Link from 'next/link';
import  logo  from '../assets/jrunlogo.jpg';
import React from 'react'
import Image from 'next/image';

export default function AuthHeader() {
  return (
    <header className='w-full py-2 ps-20 bg-black'>
        <Link href={'/'}>
        <Image src={logo} width={100} alt='jrun logo'/>
        </Link>
    </header>
  )
}
