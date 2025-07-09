"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Building2,
  Landmark,
  BedDouble,
  Store,
  Hotel,
  UploadCloud,
} from "lucide-react";

export default function BuyOrSell() {
  return (
    <motion.section
      className="relative flex flex-col items-center justify-center px-6 py-16 text-black"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Optional Logo */}
      <div className="mb-4">
        <img src="/home-art.png" alt="Logo" className="lg:max-w-4xl " />
      </div>

      {/* Heading */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center tracking-tight mb-10 text-neutral-900"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        What kind of property are you looking for?
      </motion.h2>

      {/* === Top Action Buttons (Buy / Rent) === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-3xl">
        <MainActionCard
          href="/viewProperty/Land-Plots"
          icon={<Home className="w-5 h-5" />}
          label="Buy Property"
          gradient="from-black to-neutral-800"
        />
        <MainActionCard
          href="/properties"
          icon={<BedDouble className="w-5 h-5" />}
          label="Rent Property"
          gradient="from-black to-neutral-800"
        />
      </div>

      {/* === Property Type Cards === */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-12 w-full max-w-4xl">
        <SubActionCard
          href="/viewProperty/Land-Plots"
          icon={<Landmark className="w-10 h-10"/>}
          label="Land / Plot"
        />
        <SubActionCard
          href="/viewProperty/Residential"
          icon={<Building2 className="w-10 h-10"/>}
          label="Residential"
        />
        <SubActionCard
          href="/viewProperty/Commercial"
          icon={<Store className="w-10 h-10"/>}
          label="Commercial"
        />
        <SubActionCard
          href="/viewProperty//Hostel-PG"
          icon={<Hotel className="w-10 h-10"/>}
          label="PG / Hostel"
        />
      </div>

      {/* === CTA Button (Sell / Rent) === */}
      <Link
        href="/property-upload"
        className="group relative flex items-center justify-center gap-3 px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl text-center shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-xl"
      >
        <UploadCloud className="w-5 h-5" />
        <span>Sell or Rent Your Property</span>
      </Link>
    </motion.section>
  );
}

function MainActionCard({ href, icon, label, gradient }) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${gradient} text-white font-semibold text-base sm:text-lg shadow-lg hover:scale-[1.03] transition-all duration-300`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function SubActionCard({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="group relative flex items-center justify-center gap-2 px-5 py-4 bg-white border border-gray-900 hover:border-black text-black rounded-xl text-sm sm:text-base font-medium transition-all duration-300 shadow-sm hover:shadow-md "
    >
      <div className="flex flex-col items-center">
        <span className="text-yellow-900 mb-1">{icon}</span>
        <span className="text-lg poppins-semibold">{label}</span>
      </div>
    </Link>
  );
}
