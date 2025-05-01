"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BuyOrSell() {
  return (
    <motion.section
      className="flex flex-col items-center justify-center gap-3 text-black px-4 py-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.h2
        className="text-lg sm:text-2xl md:text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        You are looking to
      </motion.h2>

      <motion.div
        className="flex flex-col lg:flex-row items-center lg:gap-8 gap-1 w-full max-w-2xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Explore Button */}
        <Link
          href="/properties"
          className="w-full lg:w-auto  px-4 py-2 sm:px-6 sm:py-3 lg:px-10 lg:py-4 bg-black text-white text-sm sm:text-base lg:text-xl rounded-sm text-center transition-transform hover:scale-105"
        >
          <button>Explore Properties</button>
        </Link>

        {/* Divider */}
        <span className=" text-sm lg:text-5xl font-extralight text-center">
          <span className="hidden lg:inline">/</span>
          <span className="lg:hidden">OR</span>
        </span>

        {/* Sell Button */}
        <Link
          href="/upload-property"
          className="w-full lg:w-auto  px-4 py-2 sm:px-6 sm:py-3 lg:px-10 lg:py-4 bg-black text-white text-sm sm:text-base lg:text-xl rounded-sm text-center transition-transform hover:scale-105"
        >
          <button>Sell My Property</button>
        </Link>
      </motion.div>
    </motion.section>
  );
}
