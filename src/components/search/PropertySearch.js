// import { useState, useEffect } from 'react'

// export default function PropertySearch() {
//   return (
//     <div className='md:px-4 md:py-2 p-2 rounded-xl shadow-2xl bg-white max-w-3xl mx-auto'>
//       <div className='flex flex-col sm:flex-row items-center justify-between sm:gap-2 gap-3'>
//         <input
//           type='text'
//           placeholder='Search...'
//           className='input input-bordered w-full max-w-md focus:outline-none focus:ring-0 text-sm rounded-sm font-bold p-3 sm:p-1'
//         />

//         <select className='select select-bordered w-full sm:w-auto text-black focus:outline-none rounded-sm text-sm p-3 sm:p-1 max-w-md'>
//           {' '}
//           <option className='text-xl p-2 poppins-semibold'>
//             Lands and Plots
//           </option>
//           <option className='text-xl p-2 poppins-semibold'>Villa</option>
//           <option className='text-xl p-2 poppins-semibold'>Office</option>
//           <option className='text-xl p-2 poppins-semibold'>Hostel</option>
//           <option className='text-xl p-2 poppins-semibold'>Flat</option>
//         </select>

//         <button className='bg-black sm:bg-transparent flex flex-row items-center justify-center p-4 rounded-sm border border-black sm:border-0 max-w-md'>
//           {' '}
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             height='20px'
//             viewBox='0 -960 960 960'
//             width='30px'
//             fill='#000000'
//             className='hidden sm:inline'
//           >
//             <path d='M791-88 525.79-353.33q-29.46 21.61-68.43 34.3-38.97 12.7-84.73 12.7-117.45 0-198.21-80.87-80.75-80.87-80.75-196.67 0-115.8 80.87-196.46Q255.41-861 371.2-861q115.8 0 196.47 80.81 80.66 80.81 80.66 196.62 0 46.24-12.5 83.9-12.5 37.67-35.83 70l267 266L791-88ZM371.16-412.33q72.85 0 122.01-49.2 49.16-49.19 49.16-121.73 0-72.53-49.2-122.13Q443.93-755 371.22-755q-73.28 0-122.41 49.61-49.14 49.6-49.14 122.13 0 72.54 49.04 121.73 49.04 49.2 122.45 49.2Z' />
//           </svg>
//           <div className='sm:hidden  text-sm poppins-bold text-white'>
//             Search...
//           </div>
//         </button>
//       </div>
//     </div>
//   )
// }
import { useState } from 'react'

export default function PropertySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [propertyType, setPropertyType] = useState('Villa')
  const [listingType, setListingType] = useState('Buy')

  return (
    <div className='px-4 py-3 rounded-xl bg-white shadow-sm max-w-3xl mx-auto transition-all duration-300 hover:shadow-md'>
      {/* Desktop Layout (unchanged) */}
      <div className='hidden sm:flex flex-row items-center gap-3'>
        {/* Search Input */}
        <div className='relative flex-grow w-full'>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search by location, property...'
            className='w-full px-4 py-3 text-sm font-medium bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all duration-200 placeholder-gray-400'
          />
        </div>

        {/* Property Type Select */}
        <div className='relative w-auto'>
          <select
            value={propertyType}
            onChange={e => setPropertyType(e.target.value)}
            className='px-4 py-3 pr-8 text-sm font-medium bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 appearance-none cursor-pointer transition-all duration-200'
          >
            <option value='Villa'>Villa</option>
            <option value='Lands and Plots'>Lands and Plots</option>
            <option value='Office'>Office</option>
            <option value='Hostel'>Hostel</option>
            <option value='Flat'>Flat</option>
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <svg
              className='h-4 w-4 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>

        {/* Listing Type Select */}
        <div className='relative w-auto'>
          <select
            value={listingType}
            onChange={e => setListingType(e.target.value)}
            className='px-4 py-3 pr-8 text-sm font-medium bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 appearance-none cursor-pointer transition-all duration-200'
          >
            <option value='Buy'>Buy</option>
            <option value='Rent'>Rent</option>
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <svg
              className='h-4 w-4 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>

        {/* Search Button */}
        <button className='px-6 py-3 bg-[#FCE277] hover:bg-[#FFDF4D] text-gray-900 font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FFDF4D] focus:ring-opacity-50 flex items-center justify-center gap-2 shadow-sm hover:shadow-md'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
          <span>Search</span>
        </button>
      </div>

      {/* Mobile Layout - Two Line Version */}
      <div className='flex sm:hidden flex-col gap-3'>
        {/* Search Input Row */}
        <div className='relative w-full'>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search by location, property...'
            className='w-full px-4 py-3 text-sm font-medium bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all duration-200 placeholder-gray-400'
          />
        </div>

        {/* Buttons Row */}
        <div className='flex flex-row gap-2 w-full'>
          {/* Property Type Select */}
          <div className='relative flex-1'>
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className='w-full px-3 py-2 text-sm font-medium bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 appearance-none cursor-pointer'
            >
              <option value='Villa'>Villa</option>
              <option value='Lands and Plots'>Lands & Plots</option>
              <option value='Office'>Office</option>
              <option value='Hostel'>Hostel</option>
              <option value='Flat'>Flat</option>
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <svg
                className='h-4 w-4 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>

          {/* Listing Type Select */}
          <div className='relative flex-1'>
            <select
              value={listingType}
              onChange={e => setListingType(e.target.value)}
              className='w-full px-3 py-2 text-sm font-medium bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 appearance-none cursor-pointer'
            >
              <option value='Buy'>Buy</option>
              <option value='Rent'>Rent</option>
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <svg
                className='h-4 w-4 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>

          {/* Search Button */}
          <button className='flex-1 px-4 py-2 bg-[#FCE277] hover:bg-[#FFDF4D] text-gray-900 font-medium text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFDF4D] focus:ring-opacity-50 flex items-center justify-center gap-1 shadow-sm hover:shadow-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  )
}
