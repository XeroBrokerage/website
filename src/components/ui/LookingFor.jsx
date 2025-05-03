'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BuyOrSell() {
  return (
    <motion.section
      className='flex flex-col items-center justify-center gap-6 text-black px-4 py-8'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.h2
        className='text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        You are looking for
      </motion.h2>

      <motion.div
        className='grid grid-cols-2 gap-4 w-full max-w-2xl'
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Column 1 */}
        <div className='flex flex-col gap-4'>
          {/* Buy Property */}
          <Link
            href='/properties'
            className='group relative overflow-hidden px-6 py-4 bg-gradient-to-r bg-[#2B7FFF] text-white text-sm sm:text-base rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:from-blue-700 hover:to-blue-900'
          >
            <span className='relative z-10 font-medium'>Buy Property</span>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </Link>

          {/* Land/Plot */}
          <Link
            href='/properties?type=land'
            className='group relative overflow-hidden px-6 py-3 bg-white text-gray-800 text-sm sm:text-base rounded-xl text-center transition-all duration-300 hover:shadow-md border-2 border-gray-200 hover:border-blue-400'
          >
            <span className='relative z-10 font-medium'>Land/Plot</span>
            <div className='absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </Link>
        </div>

        {/* Column 2 */}
        <div className='flex flex-col gap-4'>
          {/* Rent Property */}
          <Link
            href='/properties'
            className='group relative overflow-hidden px-6 py-4 bg-gradient-to-r bg-[#2B7FFF] text-white text-sm sm:text-base rounded-xl text-center transition-all duration-300 hover:shadow-lg '
          >
            <span className='relative z-10 font-medium'>Rent Property</span>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </Link>

          {/* Residential */}
          <Link
            href='/properties?type=residential'
            className='group relative overflow-hidden px-6 py-3 bg-white text-gray-800 text-sm sm:text-base rounded-xl text-center transition-all duration-300 hover:shadow-md border-2 border-gray-200 hover:border-blue-400'
          >
            <span className='relative z-10 font-medium'>Residential</span>
            <div className='absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </Link>
        </div>

        {/* Commercial */}
        <Link
          href='/properties?type=commercial'
          className='group relative overflow-hidden px-6 py-3 bg-white text-gray-800 text-sm sm:text-base rounded-xl text-center transition-all duration-300 hover:shadow-md border-2 border-gray-200 hover:border-blue-400'
        >
          <span className='relative z-10 font-medium'>Commercial</span>
          <div className='absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </Link>

        {/* PG/Hostel */}
        <Link
          href='/properties?type=hostel'
          className='group relative overflow-hidden px-6 py-3 bg-white text-gray-800 text-sm sm:text-base rounded-xl text-center transition-all duration-300 hover:shadow-md border-2 border-gray-200 hover:border-blue-400'
        >
          <span className='relative z-10 font-medium'>PG/Hostel</span>
          <div className='absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </Link>

        {/* Sell or Rent - Special full width button */}
        <Link
          href='/upload-property'
          className='group relative overflow-hidden col-span-2 px-6 py-4 bg-gradient-to-r bg-[#FDC700] text-white text-sm sm:text-base rounded-xl text-center transition-all duration-300 hover:shadow-xl '
        >
          <span className='relative z-10 font-semibold'>
            Sell or Rent Your Property
          </span>
          <div className='absolute inset-0 bg-gradient-to-r  opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500'></div>
        </Link>
      </motion.div>
    </motion.section>
  )
}
