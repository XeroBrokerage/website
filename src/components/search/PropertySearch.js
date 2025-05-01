import { useState, useEffect } from 'react'

export default function PropertySearch() {
  return (
    <div className='md:px-4 md:py-2 p-2 rounded-xl shadow-2xl bg-white max-w-3xl mx-auto'>
      <div className='flex flex-col sm:flex-row items-center justify-between sm:gap-2 gap-3'>
        <input
          type='text'
          placeholder='Search...'
          className='input input-bordered w-full max-w-md focus:outline-none focus:ring-0 text-sm rounded-sm font-bold p-3 sm:p-1'
        />

        <select className='select select-bordered w-full sm:w-auto text-black focus:outline-none rounded-sm text-sm p-3 sm:p-1 max-w-md'>
          {' '}
          <option className='text-xl p-2 poppins-semibold'>
            Lands and Plots
          </option>
          <option className='text-xl p-2 poppins-semibold'>Villa</option>
          <option className='text-xl p-2 poppins-semibold'>Office</option>
          <option className='text-xl p-2 poppins-semibold'>Hostel</option>
          <option className='text-xl p-2 poppins-semibold'>Flat</option>
        </select>

        <button className='bg-black sm:bg-transparent flex flex-row items-center justify-center p-4 rounded-sm border border-black sm:border-0 max-w-md'>
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='20px'
            viewBox='0 -960 960 960'
            width='30px'
            fill='#000000'
            className='hidden sm:inline'
          >
            <path d='M791-88 525.79-353.33q-29.46 21.61-68.43 34.3-38.97 12.7-84.73 12.7-117.45 0-198.21-80.87-80.75-80.87-80.75-196.67 0-115.8 80.87-196.46Q255.41-861 371.2-861q115.8 0 196.47 80.81 80.66 80.81 80.66 196.62 0 46.24-12.5 83.9-12.5 37.67-35.83 70l267 266L791-88ZM371.16-412.33q72.85 0 122.01-49.2 49.16-49.19 49.16-121.73 0-72.53-49.2-122.13Q443.93-755 371.22-755q-73.28 0-122.41 49.61-49.14 49.6-49.14 122.13 0 72.54 49.04 121.73 49.04 49.2 122.45 49.2Z' />
          </svg>
          <div className='sm:hidden  text-sm poppins-bold text-white'>
            Search...
          </div>
        </button>
      </div>
    </div>
  )
}
