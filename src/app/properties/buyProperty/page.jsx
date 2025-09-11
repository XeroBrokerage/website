'use client'

import React, { useState } from 'react'
import ResidentialListing from '@/app/viewProperty/Residential/page'
import CommercialListing from '@/app/viewProperty/Commercial/page'
import LandListing from '@/app/viewProperty/Land-Plots/page'

const TABS = [
  {
    label: 'Residential',
    component: <ResidentialListing advertiseAs='Sell' />,
  },
  { label: 'Commercial', component: <CommercialListing advertiseAs='Sell' /> },

  { label: 'Land / Plots', component: <LandListing /> },
]

const Page = () => {
  const [activeTab, setActiveTab] = useState('Residential')

  const ActiveComponent = TABS.find(tab => tab.label === activeTab)?.component

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <h1 className='text-4xl text-center poppins-bold mb-10'>
        Browse Verified Properties Listed for Sale
      </h1>

      <div className='flex justify-center gap-4 mb-8 flex-wrap'>
        {TABS.map(tab => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-4 py-2 rounded-xl border text-lg transition-all duration-300 ${
              activeTab === tab.label
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Component */}
      <div className='animate-fade-in-up transition-all duration-300'>
        {ActiveComponent}
      </div>
    </div>
  )
}

export default Page
