'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  FiHome,
  FiDollarSign,
  FiUsers,
  FiMapPin,
  FiAward,
} from 'react-icons/fi'
import JoinJourneyModal from '../../app/journey-modal/page'
import { useState } from 'react'
import Link from 'next/link'

const AboutUsPage = () => {
  const [showModal, setShowModal] = useState(false)

  const features = [
    {
      title: 'Legacy of Trust',
      description:
        "Built over 6 years in Raipur's competitive market",
      icon: <FiAward className='text-blue-500 text-2xl' />,
    },
    {
      title: 'Zero Commission',
      description:
        'Complete savings for buyers and sellers with our no-brokerage model',
      icon: <FiDollarSign className='text-green-500 text-2xl' />,
    },
    {
      title: 'Exclusive Deals',
      description: 'Access to off-market properties at below-market prices',
      icon: <FiHome className='text-purple-500 text-2xl' />,
    },
    {
      title: 'Local Network',
      description:
        'Deep connections developed over decades in Raipur real estate',
      icon: <FiUsers className='text-orange-500 text-2xl' />,
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-gray-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className='max-w-7xl mx-auto relative'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              About <span className='text-blue-600'>Xero-Brokerage</span>
            </h1>
            <div className='w-24 h-1 bg-blue-500 mx-auto mb-6'></div>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
        Central India's most trusted & customer first Real Estate powerhouse
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='relative'
            >
              <div className='aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden'>
                <img
                  src='/logo.jpg'
                  alt='Raipur real estate'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-md border border-gray-100'>
                <div className='flex items-center'>
                  <div className='bg-blue-100 p-3 rounded-full mr-3'>
                    <FiHome className='text-blue-600' />
                  </div>
                  <div>
                    <p className='font-bold text-gray-800'>6+ Years</p>
                    <p className='text-sm text-gray-500'>
                      In Raipur Real Estate
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                Our Journey
              </h2>
              <div className='space-y-4 text-gray-600'>
                <p>
                  With over{' '}
                  <span className='font-semibold text-blue-600'>
                   6+ years of experience,
                  </span>{' '}
                  we’ve redefined how people buy, build, and beautify their dream spaces. At Xero, we believe buying a home shouldn’t come with hidden costs or hassles — which is why we proudly offer plots, homes, and flats at <b className='text-green-600'>ZERO</b> brokerage.
                </p>
                <p>
                  But we don’t stop there. We are a one-stop solution for everything real estate — whether it’s construction starting at just <b>₹799/sq.ft</b>, interior design that brings your vision to life, or home loans and property financing tailored to your need{' '}
                  {/* <span className='font-semibold'>
                    simple, fair, and value-driven
                  </span> */}
                  .
                </p>
                <p>
                  Whether you're a first-time homebuyer, a savvy investor, or someone dreaming of building from the ground up, Xero Brokerage is built around you — with transparent pricing, dedicated support, and expert guidance at every step.{' '}
                  {/* <span className='font-semibold text-green-600'>
                    Zero-Brokerage Model
                  </span> */}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Timeline Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Our Evolution
            </h2>
            <div className='w-24 h-1 bg-blue-500 mx-auto'></div>
          </motion.div>

          <div className='relative'>
            <div className='hidden md:block absolute left-1/2 h-full w-0.5 bg-blue-200 transform -translate-x-1/2'></div>
            {/* Timeline items */}
            <div className='space-y-12 md:space-y-0'>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className='relative md:flex md:items-center md:justify-between'
              >
                <div className='md:w-5/12 md:pr-8 mb-6 md:mb-0 text-right'>
                  <div className='bg-blue-50 p-6 rounded-xl shadow-sm'>
                    <h3 className='text-xl font-bold text-blue-600 mb-2'>
                      1998
                    </h3>
                    <p className='text-gray-600'>
                      Founded as Satguru Real Estate in Raipur
                    </p>
                  </div>
                </div>
                <div className='hidden md:flex md:items-center md:justify-center md:w-2/12'>
                  <div className='w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md'></div>
                </div>
                <div className='md:w-5/12'></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className='relative md:flex md:items-center md:justify-between'
              >
                <div className='md:w-5/12'></div>
                <div className='hidden md:flex md:items-center md:justify-center md:w-2/12'>
                  <div className='w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md'></div>
                </div>
                <div className='md:w-5/12 md:pl-8 mt-6 md:mt-0'>
                  <div className='bg-blue-50 p-6 rounded-xl shadow-sm'>
                    <h3 className='text-xl font-bold text-blue-600 mb-2'>
                      2010
                    </h3>
                    <p className='text-gray-600'>
                      Expanded to commercial property services
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className='relative md:flex md:items-center md:justify-between'
              >
                <div className='md:w-5/12 md:pr-8 mb-6 md:mb-0 text-right'>
                  <div className='bg-blue-50 p-6 rounded-xl shadow-sm'>
                    <h3 className='text-xl font-bold text-blue-600 mb-2'>
                      2018
                    </h3>
                    <p className='text-gray-600'>
                      Launched Digital Property Platform
                    </p>
                  </div>
                </div>
                <div className='hidden md:flex md:items-center md:justify-center md:w-2/12'>
                  <div className='w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md'></div>
                </div>
                <div className='md:w-5/12'></div>
              </motion.div>

              {/* 2023 - Xero Brokerage */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className='relative md:flex md:items-center md:justify-between'
              >
                <div className='md:w-5/12'></div>
                <div className='hidden md:flex md:items-center md:justify-center md:w-2/12'>
                  <div className='w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md'></div>
                </div>
                <div className='md:w-5/12 md:pl-8 mt-6 md:mt-0'>
                  <div className='bg-blue-50 p-6  shadow-sm'>
                    <h3 className='text-xl font-bold text-blue-600 mb-2'>
                      2023
                    </h3>
                    <p className='text-gray-600'>
                      Rebranded as Xero Brokerage with Zero-Commission Model
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating CTA */}
          {/* <Link href='/journey-modal' passHref>
            <motion.button
              className='mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Our Journey
            </motion.button>
          </Link> */}

          {/* Render the modal conditionally */}
          {showModal && (
            <JoinJourneyModal onClose={() => setShowModal(false)} />
          )}
        </div>
      </section>

      {/* Our Difference */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Why Choose Xero Brokerage
            </h2>
            <div className='w-24 h-1 bg-blue-500 mx-auto mb-6'></div>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              What sets us apart in Raipur's competitive real estate market
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className='bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all'
              >
                <div className='flex items-center mb-4'>
                  <div className='mr-4'>{feature.icon}</div>
                  <h3 className='text-xl font-semibold text-gray-800'>
                    {feature.title}
                  </h3>
                </div>
                <p className='text-gray-600'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='bg-white p-8 sm:p-10 rounded-2xl shadow-lg'
          >
            <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
              <FiHome className='text-blue-600 text-2xl' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Our Promise to You
            </h2>
            <p className='text-gray-600 mb-6'>
              "We're not just focused on closing deals; we're here to help you
              make the best decision at the best price, with complete
              transparency and no hidden costs."
            </p>
            <p className='text-gray-700 font-medium'>
              At Xero Brokerage, you're backed by experience, connected through
              a powerful local network, and guided to the best deals—without
              paying a single rupee in brokerage.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutUsPage
