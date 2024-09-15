import AuthHeader from '@/components/AuthHeader'
import ClientSessionProvider from '@/components/client-session-provider'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>
        <AuthHeader/>
          {children}
          </ClientSessionProvider>
      </body>
    </html>
  )
}