"use client";

import React from "react";
import {
  Brain,
  Link2,
  Twitter,
  Youtube,
  BookOpen,
  Code,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = () => {
  const session = useSession();
  const router = useRouter();
  const handleStartCollecting = () => {
    if (session.status === "unauthenticated") {
      router.push("/signin");
    } else {
      router.push("/dashboard");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 text-dark-50">
      {/* Navigation */}
      <Header />
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl"
              variants={fadeIn}
            >
              <span className="block">Sync your thoughts.</span>
              <span className="block text-indigo-500 py-2">
                Share your brain.
              </span>
            </motion.h1>
            <motion.p
              className="mt-3 max-w-md mx-auto text-base text-dark-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              variants={fadeIn}
            >
              Save, organize, and share your favorite content from across the
              web. Create personal collections of links, notes, and resources —
              all in one place.
            </motion.p>
            <motion.div
              className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
              variants={fadeIn}
            >
              <motion.button
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm sm:text-base md:text-lg cursor-pointer rounded-full font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartCollecting}
              >
                Start Collecting
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="py-16 md:py-18"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Save Links */}
            <motion.div
              className="relative rounded-2xl border border-dark-800 bg-dark-900/50 backdrop-blur-sm p-8 hover:border-dark-700 transition"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center">
                <Link2 className="h-8 w-8 text-indigo-500" />
                <h3 className="ml-4 text-xl font-semibold">Save Links</h3>
              </div>
              <p className="mt-4 text-dark-300">
                Save articles, tweets, videos, and more from anywhere on the
                web.
              </p>
            </motion.div>

            {/* Organize Content */}
            <motion.div
              className="relative rounded-2xl border border-dark-800 bg-dark-900/50 backdrop-blur-sm p-8 hover:border-dark-700 transition"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-500" />
                <h3 className="ml-4 text-xl font-semibold">Organize Content</h3>
              </div>
              <p className="mt-4 text-dark-300">
                Create collections and categories to keep your content
                organized.
              </p>
            </motion.div>

            {/* Share Knowledge */}
            <motion.div
              className="relative rounded-2xl border border-dark-800 bg-dark-900/50 backdrop-blur-sm p-8 hover:border-dark-700 transition"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center">
                <Code className="h-8 w-8 text-indigo-500" />
                <h3 className="ml-4 text-xl font-semibold">Share Knowledge</h3>
              </div>
              <p className="mt-4 text-dark-300">
                Share collections publicly or keep them private. You&#39;re there in
                control.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Link Types Section */}
      <motion.div
        className="bg-dark-900/50 backdrop-blur-sm py-18"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            variants={fadeIn}
          >
            Save Everything in One Place
          </motion.h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Tweets", Icon: Twitter },
              { label: "Videos", Icon: Youtube },
              { label: "Code Snippets", Icon: Code },
              { label: "Articles", Icon: BookOpen },
            ].map(({ label, Icon }) => (
              <motion.div
                key={label}
                className="flex flex-col items-center"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="h-12 w-12 text-indigo-500" />
                <span className="mt-2 text-dark-300">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Search Demo */}
      {/* <motion.div
        className="py-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <motion.div
              className="flex items-center border-2 border-dark-800 rounded-lg p-4 bg-dark-900/50 backdrop-blur-sm"
              whileHover={{ borderColor: "rgb(99 102 241)" }}
            >
              <Search className="h-5 w-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search your brain..."
                className="ml-4 flex-1 bg-transparent outline-none text-dark-200 placeholder-dark-400"
                disabled
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm text-dark-400">Filter by:</span>
                <motion.button
                  className="px-3 py-1 text-sm rounded-full bg-dark-800 text-dark-200 hover:bg-dark-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Articles
                </motion.button>
                <motion.button
                  className="px-3 py-1 text-sm rounded-full bg-dark-800 text-dark-200 hover:bg-dark-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Videos
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div> */}

      {/* Footer */}
      <footer className="bg-dark-900/50 backdrop-blur-sm border-t border-dark-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-indigo-500" />
              <span className="ml-2 font-semibold">BrainSync</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-dark-300 hover:text-white transition">
                About
              </a>
              <a href="#" className="text-dark-300 hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="text-dark-300 hover:text-white transition">
                Terms
              </a>
            </div>
          </div>
          <p className="mt-4 text-dark-300">
            &copy; {new Date().getFullYear()} BrainSync. All rights reserved.
          </p>
        </div>
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 text-lg text-dark-300 flex justify-center gap-x-3">
          <p className="mb-2">Made with ❤️ by </p>
          <a
            href="https://github.com/Ryadav0654"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline transition decoration-none"
          >
            Ravindra Yadav
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
