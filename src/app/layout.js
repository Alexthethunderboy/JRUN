import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers'

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientSessionProvider from "@/app/client-session-provider";
import AuthCheck from "@/components/AuthCheck";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JRUN Cleaning Services",
  description: "Professional cleaning services at your fingertips",
};

export default function RootLayout({ children }) {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') || ''

  return (
    <html lang="en">
      <body className={`min-h-screen h-auto bg-[#1A1A1A] ${inter.className}`}>
        <ClientSessionProvider>
          <AuthCheck pathname={pathname}>
            <Header />
          </AuthCheck>
          <main className=" w-screen">{children}</main>
          <AuthCheck pathname={pathname}>
            <Footer />
          </AuthCheck>
        </ClientSessionProvider>
      </body>
    </html>
  );
}