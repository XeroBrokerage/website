"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BuyOrSell() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4 text-black mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.h2
        className="sm:text-3xl text-2xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        You are looking to
      </motion.h2>

      <motion.div
        className="flex items-center lg:flex-row flex-col lg:gap-8 gap-1  "
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/properties">
          <button className="px-10 py-4 bg-black text-white rounded-xl hover:scale-105 transition-transform sm:text-2xl text-sm w-[60vw] lg:w-fit">
            Explore Properties
          </button>
        </Link>

        <motion.p className="text-7xl text-center font-extralight hidden lg:block ">
          /
        </motion.p>
        <motion.p className="text-lg text-center lg:hidden block  ">
          OR
        </motion.p>

        <Link href="/upload-property">
          <button className="px-10 py-4 bg-black text-white rounded-xl hover:scale-105 transition-transform sm:text-2xl text-sm w-[60vw] lg:w-fit">
            Sell My Property
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
