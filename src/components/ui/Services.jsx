import React from 'react'
import interiorGif from '../../assets/wired-flat-1639-stairs-hover-walking-upstairs.gif' // '../../public/wired-flat-1639-stairs-hover-walking-upstairs.gif'
// SVG Components for different services
const ConstructionSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='80'
    height='80'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M1 22h22M19.78 22.01v-4.46M19.8 10.89c-1.22 0-2.2.98-2.2 2.2v2.27c0 1.22.98 2.2 2.2 2.2 1.22 0 2.2-.98 2.2-2.2v-2.27c0-1.22-.98-2.2-2.2-2.2ZM2.1 6.02C2.1 4.01 3.1 3 5.09 3h6.23c1.99 0 2.98 1.01 2.98 3.02V22M2.1 22.002v-11.99M5.8 8.25h4.95M5.8 12h4.95M8.25 22v-3.75'
      stroke='#FF8A65'
      stroke-width='1.5'
      stroke-miterlimit='10'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
  </svg>
)

const LoanSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='90'
    height='90'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M2 8.5h11M6 16.5h2M10.5 16.5h4'
      stroke='#FF8A65'
      stroke-width='1.5'
      stroke-miterlimit='10'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
    <path
      d='M2 8.35v-.46c0-3.51.89-4.39 4.44-4.39h6.84M22 11.328v4.78c0 3.51-.89 4.39-4.44 4.39H6.44c-3.55 0-4.44-.88-4.44-4.39v-3.06'
      stroke='#FF8A65'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
    <path
      d='M17 3.25h3.13c.69 0 1.25.63 1.25 1.25 0 .69-.56 1.25-1.25 1.25H17v-2.5ZM17 5.75h3.57c.79 0 1.43.56 1.43 1.25s-.64 1.25-1.43 1.25H17v-2.5ZM18.76 8.25V9.5M18.76 2v1.25M18.19 3.25H16M18.19 8.25H16'
      stroke='#FF8A65'
      stroke-width='1.5'
      stroke-miterlimit='10'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
  </svg>
)

const InteriorSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='90'
    height='90'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M10.94 2H7.99c-.96 0-1.97.77-2.22 1.7l-2.2 8.07c-.44 1.6.56 2.91 2.23 2.91h12.42c1.66 0 2.66-1.31 2.23-2.91l-2.2-8.07c-.27-.93-1.28-1.7-2.24-1.7M12 15v7M8 22h8'
      stroke='#FF8A65'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
  </svg>
)

const LegalSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='90'
    height='90'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M20.498 11v6c0 .14 0 .28-.01.42M3.5 18V7c0-4 1-5 5-5h7c4 0 5 1 5 5'
      stroke='#FF8A65'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
    <path
      d='M6.35 15H20.5v3.5c0 1.93-1.57 3.5-3.5 3.5H7c-1.93 0-3.5-1.57-3.5-3.5v-.65C3.5 16.28 4.78 15 6.35 15ZM8 7h8M8 10.5h5'
      stroke='#FF8A65'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
  </svg>
)

const MaterialsSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='90'
    height='90'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M17.18 18c2.4 0 3-1.35 3-3V9c0-1.65-.6-3-3-3s-3 1.35-3 3v6c0 1.65.6 3 3 3ZM3.82 11.3V9c0-1.65.6-3 3-3s3 1.35 3 3v6c0 1.65-.6 3-3 3s-3-1.35-3-3M9.82 12h4.36M22.5 14.5v-5M1.5 14.5v-5'
      stroke='#FF8A65'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
  </svg>
)

const HardwareSVG = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='90'
    height='90'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z'
      stroke='#FF8A65'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>
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
