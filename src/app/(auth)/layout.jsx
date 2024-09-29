import AuthHeader from '@/components/AuthHeader'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({ children }) {
  return (
    <div className={` bg-black ${inter.className}`}>
        <AuthHeader/>
        <div className='flex flex-col items-center md:justify-center md:pt-40 pt-10 p-4 h-screen '>
      {children}
      </div>
    </div>
  )
}