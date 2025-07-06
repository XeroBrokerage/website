import React from 'react'

// SVG Components for different services
const ConstructionSVG = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-28'>
    <path
      fill='#5C2B29'
      d='M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z'
    />
    <path
      fill='#9f614b'
      d='M9 3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V9l-3 1.5V3.5z'
    />
  </svg>
)

const LoanSVG = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-28'>
    <path
      fill='#5C2B29'
      d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
    />
  </svg>
)

const InteriorSVG = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-28'>
    <path
      fill='#5C2B29'
      d='M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.8L18 10v8h-2v-6h-4v6H6v-8l6-4.2z'
    />
  </svg>
)

const LegalSVG = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-28'>
    <path
      fill='#5C2B29'
      d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'
    />
  </svg>
)

const MaterialsSVG = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-28'>
    <path
      fill='#5C2B29'
      d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
    />
  </svg>
)

const HardwareSVG = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-28'>
    <path
      fill='#5C2B29'
      d='M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm6 10h-4V5h4v14zm4-2h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z'
    />
  </svg>
)

const ServiceCard = ({ title, description, svgComponent }) => {
  return (
    <div className='font-sans relative p-10 w-full bg-white rounded-2xl flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e0d6d6]'>
      {/* Service Image */}
      <div className='w-36 h-36 bg-gradient-to-br from-[#FFF3F0] to-[#F5EDE0] rounded-full mx-auto flex items-center justify-center shadow-inner'>
        {svgComponent}
      </div>

      {/* Service Details */}
      <div className='text-center'>
        <h3 className='font-serif font-bold text-2xl text-[#5C2B29] mb-1 tracking-wider'>
          {title}
        </h3>
        <p className='font-light text-sm text-[#5C2B29]/90 px-4 leading-5'>
          {description}
        </p>
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-2 right-2 text-xs font-serif italic text-[#5C2B29]/50'>
        Service
      </div>
      <div className='absolute bottom-2 left-2 w-8 h-px bg-[#5C2B29]/30'></div>
      <div className='absolute bottom-2 right-2 w-8 h-px bg-[#5C2B29]/30'></div>
    </div>
  )
}

const ServiceCardCollection = () => {
  const services = [
    {
      title: 'Construction',
      description:
        'Build Your Dream Home with XeroBrokerage – Only Pay for Bricks, Not Commissions!',
      svgComponent: <ConstructionSVG />,
    },
    {
      title: 'Home/Land Loan',
      description:
        'Get Your Dream Home Loan with XeroBrokerage – Lowest Rates, Fast Approval, No Hidden Fees!',
      svgComponent: <LoanSVG />,
    },
    {
      title: 'Interior',
      description:
        'Transform your space without the extra cost—discover XeroBrokerage dream interiors today!',
      svgComponent: <InteriorSVG />,
    },
    {
      title: 'Legal Agreement',
      description:
        'Sign Smarter, Not Harder – Zero Brokerage, Zero Hassle Legal Agreements!',
      svgComponent: <LegalSVG />,
    },
    {
      title: 'Raw Materials',
      description:
        'Source Direct, Save Direct – Zero Brokerage Properties Straight from Raw Material!',
      svgComponent: <MaterialsSVG />,
    },
    {
      title: 'Hardware',
      description:
        'Unlock Prime Properties with Zero Brokerage – Your Dream Home, Hardware Strong!',
      svgComponent: <HardwareSVG />,
    },
  ]

  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-serif font-bold text-center text-[#5C2B29] mb-12'>
          Our Services
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              svgComponent={service.svgComponent}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceCardCollection
