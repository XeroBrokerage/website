'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome,
  FiDollarSign,
  FiUser,
  FiShield,
  FiFileText,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi'

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqs = [
    {
      question: 'How does your no-brokerage service work?',
      answer:
        'We connect property buyers and sellers directly through our platform, eliminating the need for brokers. Sellers can list properties for free, and buyers can contact them directly without paying any brokerage fees.',
      icon: <FiHome className='text-blue-500' />,
    },
    {
      question: 'Is it really completely free to list my property?',
      answer:
        'Yes! Our basic listing is completely free with no hidden charges. We also offer premium plans with additional features like featured listings and professional photography, but these are optional.',
      icon: <FiDollarSign className='text-green-500' />,
    },
    {
      question: 'How do I verify property listings?',
      answer:
        'We have multiple verification processes including document checks, site visits for select properties, and owner verification. However, we still recommend buyers conduct their own due diligence before finalizing any deal.',
      icon: <FiShield className='text-purple-500' />,
    },
    {
      question: 'What safety measures do you have for transactions?',
      answer:
        'While we facilitate connections, all transactions happen directly between parties. We recommend using registered agreements, escrow services for payments, and verifying all documents with a legal professional.',
      icon: <FiUser className='text-red-500' />,
    },
    {
      question: 'Can I negotiate the price directly with the owner?',
      answer:
        'Absolutely! One of the main benefits of our no-brokerage model is that you can negotiate directly with the property owner without any middleman influencing the price.',
      icon: <FiFileText className='text-orange-500' />,
    },
    {
      question: 'How do I contact a property owner?',
      answer:
        "Once you find a property you're interested in, you can view the owner's contact details (if it's a free listing) or request contact through our platform. For premium listings, contact details are visible immediately.",
      icon: <FiHelpCircle className='text-yellow-500' />,
    },
    {
      question: 'What if I encounter fake listings?',
      answer:
        "We have strict measures against fake listings including verification processes and user reporting. If you find any suspicious listing, please report it immediately through our platform and we'll investigate.",
      icon: <FiShield className='text-blue-500' />,
    },
    {
      question: 'Do you provide legal documentation assistance?',
      answer:
        "While we don't provide legal services directly, we partner with legal professionals who can assist with documentation at special rates for our users. We also provide standard agreement templates.",
      icon: <FiFileText className='text-green-500' />,
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
            <FiHelpCircle className='text-blue-600 text-2xl' />
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Frequently Asked Questions
          </h1>
          <p className='text-xl text-gray-600'>
            Find answers to common questions about our no-brokerage services
          </p>
        </motion.div>

        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className='bg-white rounded-xl shadow-sm overflow-hidden'
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-5 text-left flex items-center justify-between ${
                  activeIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
              >
                <div className='flex items-start'>
                  <div className='mr-4 mt-1'>{faq.icon}</div>
                  <h3 className='text-lg font-medium text-gray-800'>
                    {faq.question}
                  </h3>
                </div>
                {activeIndex === index ? (
                  <FiChevronUp className='text-gray-500 ml-4 flex-shrink-0' />
                ) : (
                  <FiChevronDown className='text-gray-500 ml-4 flex-shrink-0' />
                )}
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='overflow-hidden'
                  >
                    <div className='px-6 pb-5 pt-2 ml-10 text-gray-600'>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='mt-16 bg-white rounded-xl shadow-sm p-8 text-center'
        >
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Still have questions?
          </h3>
          <p className='text-gray-600 mb-6'>
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQPage
