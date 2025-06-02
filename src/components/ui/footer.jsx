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
          <a
            rel='noopener noreferrer'
            href='#'
            className='flex justify-center space-x-3 lg:justify-start'
          >
            <div className='flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-600'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                fill='currentColor'
                className='flex-shrink-0 w-5 h-5 rounded-full dark:text-gray-50'
              >
                <path d='M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z'></path>
              </svg>
            </div>
            <span className='self-center text-2xl font-semibold'>
              XeroBrokerage
            </span>
          </a>
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
                <Link href='/notFound404' className='hover:text-blue-300'>
                  Developers Page
                </Link>
              </li>
              <li>
                <a rel='noopener noreferrer' href='#'>
                  Documentation
                </a>
              </li>
              <li>
                <a rel='noopener noreferrer' href='#'>
                  Guides
                </a>
              </li>
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
