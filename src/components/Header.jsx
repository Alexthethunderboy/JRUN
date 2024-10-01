"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "../assets/jrunlogo.jpg";
import { GridLoader } from "react-spinners";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined" && !isOpen) {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY, isOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const navItems = session
    ? [
        { name: "Dashboard", href: "/dashboard" },
        { name: "My Services", href: "/services" },
        { name: "Messages", href: "/messages" },
        { name: "Notifications", href: "/notifications" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Categories", href: "/categories" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ];

  return (
    <AnimatePresence>
      {(showHeader || isOpen) && (
        <motion.header
          className={`${
            session ? "bg-black" : "bg-black"
          } text-white px-10 sticky top-0 z-50`}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <Image src={logo} width={80} height={80} alt="jrun logo" />
            </Link>
            <div className="hidden md:flex gap-4 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              {status === "loading" ? (
                <div className="flex justify-center items-center w-20 ">
                  <GridLoader color="#597D35" size={"10"} />
                </div>
              ) : session ? (
                <div className="relative">
                  <Button
                    onClick={toggleProfileMenu}
                    variant="ghost"
                    className="flex items-center hover:bg-primary"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        width={32}
                        height={32}
                        alt="Profile"
                        className="rounded-full mr-2"
                      />
                    ) : (
                      <FaUser className="mr-2" />
                    )}
                    {session.user.name}
                  </Button>
                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                      >
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={toggleProfileMenu}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={toggleProfileMenu}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary"
                        >
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              )}
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="md:hidden flex flex-col items-center space-y-4 pb-6"
              >
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className="hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
                {status === "loading" ? (
                  <div className="flex justify-center items-center w-20 ">
                    <GridLoader color="#597D35" size={"10"} />
                  </div>
                ) : session ? (
                  <div className="relative">
                    <Button
                      onClick={toggleProfileMenu}
                      variant="ghost"
                      className="flex items-center hover:bg-primary"
                    >
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          width={32}
                          height={32}
                          alt="Profile"
                          className="rounded-full mr-2"
                        />
                      ) : (
                        <FaUser className="mr-2" />
                      )}
                      {session.user.name}
                    </Button>
                    <AnimatePresence>
                      {showProfileMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                        >
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={toggleProfileMenu}
                          >
                            Profile
                          </Link>
                          <Link
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={toggleProfileMenu}
                          >
                            Settings
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary"
                          >
                            Sign out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href="/register">
                    <Button>Get Started</Button>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}