'use client'

import  logo  from '../assets/jrunlogo.jpg';
import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-black text-white px-10 sticky top-0 z-50 ">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <Link href={'./'}>
        <Image src={logo} width={100} alt='jrun logo'/>
        </Link>
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login" className='rounded-full bg-primary px-6 py-2 mx-5 flex items-center justify-center'>
          <button>Get Started </button> </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 pb-6">
          <Link href="/" onClick={toggleMenu}>Home</Link>
          <Link href="/categories" onClick={toggleMenu}>Categories</Link>
          <Link href="/about" onClick={toggleMenu}>About Us</Link>
          <Link href="/contact" onClick={toggleMenu}>Contact</Link>
          <Link href="/login" onClick={toggleMenu} className='rounded-full bg-primary py-2 px-4'>Get Started</Link>
        </div>
      )}
    </header>
  );
}
