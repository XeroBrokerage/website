import { useState } from 'react'

export default function PropertySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [propertyType, setPropertyType] = useState('Villa')
  const [listingType, setListingType] = useState('Buy')

  return (
    <div className='px-4 py-3 rounded-xl bg-white shadow-[0_0_35px_rgba(0,0,0,0.3)] max-w-3xl mx-auto transition-all duration-300 hover:shadow-[0_0_55px_rgba(0,0,0,0.3)]'>
      {/* Desktop Layout (unchanged) */}
      <div className='hidden sm:flex flex-row items-center gap-3'>
        {/* Search Input */}
        <div className='relative flex-grow w-full'>
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search by location, property...'
            className='w-full px-4 py-3 text-sm font-medium bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all duration-200 placeholder-gray-400'
          />
        </div>

        {/* Property Type Select */}
        <div className='relative w-auto'>
          <select
            value={propertyType}
            onChange={e => setPropertyType(e.target.value)}
            className='px-4 py-3 pr-8 text-sm font-medium bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 appearance-none cursor-pointer transition-all duration-200'
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
            className='px-4 py-3 pr-8 text-sm font-medium bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 appearance-none cursor-pointer transition-all duration-200'
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
            className='w-full px-4 py-3 text-sm font-medium bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all duration-200 placeholder-gray-400'
          />
        </div>

        {/* Buttons Row */}
        <div className='flex flex-row gap-2 w-full'>
          {/* Property Type Select */}
          <div className='relative flex-1'>
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className='w-full px-3 py-2 text-sm font-medium bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 appearance-none cursor-pointer'
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
              className='w-full px-3 py-2 text-sm font-medium bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 appearance-none cursor-pointer'
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
