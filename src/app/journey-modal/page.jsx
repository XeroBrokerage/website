'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiArrowRight,
  FiMail,
  FiUser,
  FiPhone,
  FiDollarSign,
  FiCheckCircle,
  FiHome,
} from 'react-icons/fi'

const JoinJourneyModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'buyer', // or 'seller'
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  const handleSubmit = e => {
    e.preventDefault()
    // Submit logic here
    console.log('Form submitted:', formData)
    setCurrentStep(4) // Show success
  }

  return (
    <>
      {/* Floating CTA Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='fixed bottom-8 right-8 z-10'
      >
        <button
          onClick={() => setIsOpen(true)}
          className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-full shadow-xl flex items-center group'
        >
          Join Our Journey
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className='ml-2 group-hover:translate-x-1 transition-transform'
          >
            <FiArrowRight />
          </motion.span>
        </button>
      </motion.div>

      {/* Animated Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className='bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md'
            >
              {/* Header */}
              <div className='bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative'>
                <h3 className='text-2xl font-bold'>
                  {currentStep === 1 && 'Welcome Aboard!'}
                  {currentStep === 2 && 'Tell Us About Yourself'}
                  {currentStep === 3 && 'Almost There!'}
                  {currentStep === 4 && 'Welcome to the Journey!'}
                </h3>
                <p className='text-blue-100 mt-1'>
                  {currentStep === 1 &&
                    'Become part of our zero-brokerage revolution'}
                  {currentStep === 2 && 'Help us understand your needs'}
                  {currentStep === 3 && 'Final details to get started'}
                  {currentStep === 4 && 'Your journey begins now'}
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setTimeout(() => setCurrentStep(1), 500)
                  }}
                  className='absolute top-4 right-4 text-white hover:text-blue-200 transition-colors'
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Progress Bar */}
              {currentStep < 4 && (
                <div className='h-1 bg-gray-200'>
                  <motion.div
                    initial={{ width: `${(currentStep - 1) * 33}%` }}
                    animate={{ width: `${(currentStep - 1) * 33}%` }}
                    className='h-full bg-blue-500'
                  />
                </div>
              )}

              {/* Content */}
              <div className='p-6'>
                <AnimatePresence mode='wait'>
                  {/* Step 1: Interest Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key='step1'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className='space-y-6'
                    >
                      <h4 className='text-lg font-semibold text-gray-800'>
                        I'm interested as a:
                      </h4>
                      <div className='grid grid-cols-2 gap-4'>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              interest: 'buyer',
                            }))
                            nextStep()
                          }}
                          className={`p-6 rounded-xl border-2 ${
                            formData.interest === 'buyer'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          } transition-all flex flex-col items-center`}
                        >
                          <FiHome className='text-3xl mb-3 text-blue-500' />
                          <span className='font-medium'>Property Buyer</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              interest: 'seller',
                            }))
                            nextStep()
                          }}
                          className={`p-6 rounded-xl border-2 ${
                            formData.interest === 'seller'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          } transition-all flex flex-col items-center`}
                        >
                          <FiDollarSign className='text-3xl mb-3 text-blue-500' />
                          <span className='font-medium'>Property Seller</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Basic Info */}
                  {currentStep === 2 && (
                    <motion.div
                      key='step2'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className='space-y-4'
                    >
                      <div className='space-y-1'>
                        <label className='block text-sm font-medium text-gray-700 flex items-center'>
                          <FiUser className='mr-2 text-blue-500' /> Full Name
                        </label>
                        <input
                          type='text'
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          className='block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                          placeholder='Your name'
                          required
                        />
                      </div>
                      <div className='space-y-1'>
                        <label className='block text-sm font-medium text-gray-700 flex items-center'>
                          <FiMail className='mr-2 text-blue-500' /> Email
                          Address
                        </label>
                        <input
                          type='email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          className='block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                          placeholder='your@email.com'
                          required
                        />
                      </div>
                      <div className='flex justify-end pt-4'>
                        <motion.button
                          type='button'
                          onClick={nextStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors'
                        >
                          Continue
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Additional Info */}
                  {currentStep === 3 && (
                    <motion.div
                      key='step3'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className='space-y-4'
                    >
                      <div className='space-y-1'>
                        <label className='block text-sm font-medium text-gray-700 flex items-center'>
                          <FiPhone className='mr-2 text-blue-500' /> Phone
                          Number
                        </label>
                        <input
                          type='tel'
                          name='phone'
                          value={formData.phone}
                          onChange={handleChange}
                          className='block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                          placeholder='+91 9876543210'
                        />
                      </div>
                      <div className='space-y-1'>
                        <label className='block text-sm font-medium text-gray-700'>
                          What type of property are you{' '}
                          {formData.interest === 'buyer'
                            ? 'looking for?'
                            : 'selling?'}
                        </label>
                        <select className='block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white'>
                          <option value=''>Select property type</option>
                          <option value='residential'>Residential</option>
                          <option value='commercial'>Commercial</option>
                          <option value='land'>Land/Plot</option>
                        </select>
                      </div>
                      <div className='flex justify-between pt-4'>
                        <motion.button
                          type='button'
                          onClick={prevStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className='text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors'
                        >
                          Back
                        </motion.button>
                        <motion.button
                          type='button'
                          onClick={handleSubmit}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors'
                        >
                          Complete Journey
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Success */}
                  {currentStep === 4 && (
                    <motion.div
                      key='step4'
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className='text-center py-8'
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'
                      >
                        <FiCheckCircle className='text-green-600 text-4xl' />
                      </motion.div>
                      <h4 className='text-xl font-bold text-gray-800 mb-3'>
                        Welcome to Xero Brokerage!
                      </h4>
                      <p className='text-gray-600 mb-6'>
                        {formData.interest === 'buyer'
                          ? 'Our team will contact you with the best property matches in Raipur.'
                          : "We'll help you sell your property faster with zero brokerage fees."}
                      </p>
                      <motion.button
                        onClick={() => {
                          setIsOpen(false)
                          setTimeout(() => setCurrentStep(1), 500)
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors'
                      >
                        Start Exploring
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default JoinJourneyModal
