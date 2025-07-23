'use client'
import Link from 'next/link'
import Tooltip from '@/styles/Tooltip'
import React from 'react'
import Image from 'next/image'
import Apartment from '@/assets/city.png'
import { TermsAndConditions } from '../../app/terms-and-conditions/page'
// import TermsAndConditions from '../../app/terms-and-condition/page'
// import FooterIcon from '@/assets/footer.svg'
// import { ReactComponent as FooterIcon } from '@/assets/footer.svg'
const Footer = () => {
  return (
    <footer className='px-4 divide-y text-black'>
      <div className='container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0'>
        <div className='lg:w-1/3 flex flex-col items-center lg:items-start'>
          {/* illustration */}
          <div>
            <div className='w-full max-w-[800px] mx-auto'>
              <Image
                src={Apartment}
                alt='City Image'
                width={450}
                height={60}
                quality={85} // Quality reduced so that it loads even on slow internet
                className='rounded-lg object-cover'
                priority
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4'>
          <div className='space-y-3'>
            <h3 className='tracking-wide uppercase font-extrabold dark:text-gray-900'>
              Quick Links
            </h3>
            <ul className='space-y-1'>
              {/* <li>
                <a rel='noopener noreferrer' href='#'>
                  Careers
                </a>
              </li> */}
              <li>
                <Link href='/about-us' className='hover:text-blue-300'>
                  About US
                </Link>
              </li>

              <li>
                <Link href='/FAQ' className='hover:text-blue-300'>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href='/feedback' className='hover:text-blue-300'>
                  Feedback
                </Link>
              </li>
              <li>
                <Link href='/report-a-problem' className='hover:text-blue-300'>
                  Report a Problem
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h3 className='tracking-wide uppercase font-extrabold dark:text-gray-900'>
              Company
            </h3>
            <ul className='space-y-1'>
              <li>
                <Link href='/privacy-page' className='hover:text-blue-300'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                {/* <TermsAndConditions /> */}
                <Link
                  href='/terms-and-conditions'
                  className='hover:text-blue-300'
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h3 className='uppercase font-extrabold dark:text-gray-900'>
              Developers
            </h3>
            <ul className='space-y-1'>
              <li>
                <Link href='/dev' className='hover:text-blue-300'>
                  Developer's Page
                </Link>
              </li>
              {/* <li>
                <a rel='noopener noreferrer' href='#'>
                  Documentation
                </a>
              </li>
              <li>
                <a rel='noopener noreferrer' href='#'>
                  Guides
                </a>
              </li> */}
            </ul>
          </div>
          <div className='space-y-3'>
            <div className='uppercase font-extrabold dark:text-gray-900'>
              Social media
            </div>
            <Tooltip />
          </div>
        </div>
      </div>
      <div className='py-6 text-sm text-center dark:text-gray-600'>
        © 2025 XeroBrokerage.in - All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
