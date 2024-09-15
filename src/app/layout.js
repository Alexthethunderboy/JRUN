

import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'JRUN Cleaning Services',
  description: 'Professional cleaning services at your fingertips',
}

export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <body className=" min-h-screen h-auto bg-[#1A1A1A]">
        <Header 
        // toggleDarkMode={toggleDarkMode} darkMode={darkMode} 
        />
        <main className="bg-black w-screen">

        {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
