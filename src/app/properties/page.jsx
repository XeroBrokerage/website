import React from 'react'
import PropertyListing from '@/components/search/PropertyListing'

const page = () => {
  return (
    <div>
         <div className='text-4xl text-center poppins-bold p-8'>
            Explore All Properties...
        </div>
        <PropertyListing/>
    </div>
  )
}

export default page