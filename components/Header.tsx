"use client";
import React from "react";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Header = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 py-5">
      <div className="md:mx-auto px-4 sm:px-6 lg:px-6 rounded-full md:max-w-[70vw] border-b border-dark-800 bg-dark-900/90 backdrop-blur-lg">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="h-8 w-8 text-indigo-500" />
            <span className="ml-2 text-xl font-bold">BrainSync</span>
          </motion.div>
          <div className="hidden md:flex items-center text-lg font-semibold">
            <ul className="flex space-x-8 items-center cursor-pointer">
              <Link href="/" className="hover:text-indigo-500">Home</Link>
              <Link href="/dashboard" className="hover:text-indigo-500">Dashboard</Link>
              <Link href="/" className="hover:text-indigo-500">About</Link>
              <Link href="/" className="hover:text-indigo-500">Contact</Link>
              {/* <li className="hover:text-indigo-500">Add</li> */}
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            {session.status === "authenticated" ? (
              <Button text="Logout" variant="logout" onclick={() => {
                signOut({
                  redirect: false,
                  callbackUrl: "/signin",
                });
              }} extraStyle="text-white cursor-pointer transition" type="button"/>
            ) : (
              <motion.button
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Get Started
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
