'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiThumbsUp,
  FiThumbsDown,
  FiMessageSquare,
  FiUser,
  FiMail,
  FiHome,
  FiPhone,
  FiStar,
} from 'react-icons/fi'
import emailjs from '@emailjs/browser'

const FeedbackPage = () => {
  const [feedbackType, setFeedbackType] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: '',
    rating: null,
    serviceUsed: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  emailjs.init('SvIIntMeP5IlnOZg-') //Public ID key

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.message) newErrors.message = 'Feedback is required'
    if (!feedbackType) newErrors.feedbackType = 'Please select feedback type'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSending(true)
    setErrors({}) // Clear previous errors

    try {
      const response = await emailjs.send(
        'service_rxm6qcn', // Service ID
        'template_dl8m8cb', // Template ID
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceUsed: formData.serviceUsed,
          message: formData.message,
          rating: formData.rating,
          feedbackType: feedbackType,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          websiteLink: 'https://xerobrokerage.in',
          dashboardLink: 'https://yourwebsite.com/admin/feedback',
        },
      )

      if (response.status !== 200) {
        throw new Error(`EmailJS responded with status ${response.status}`)
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Failed to send feedback:', error)
      setErrors({
        submit:
          error.message || 'Failed to send feedback. Please try again later.',
      })
    } finally {
      setIsSending(false)
    }
  }

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  }

  const ratingOptions = [1, 2, 3, 4, 5]
  const serviceOptions = [
    'Property Listing',
    'Property Search',
    'Loan Assistance',
    'Legal Services',
    'Construction',
    'Other',
  ]

  return (
    <div className='h-0 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Share Your Experience
          </h1>
          <p className='text-xl text-gray-600'>
            Your feedback helps us improve our no-brokerage services
          </p>
        </motion.div>

        <AnimatePresence>
          {!submitted ? (
            <motion.div
              key='form'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className='bg-white rounded-2xl shadow-xl overflow-hidden'
            >
              <div className='p-8 sm:p-10'>
                <div className='mb-10'>
                  <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                    How would you rate your experience?
                  </h2>
                  <div className='flex justify-center space-x-4 mb-2'>
                    <motion.button
                      variants={variants}
                      whileHover='hover'
                      whileTap='tap'
                      className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                        feedbackType === 'positive'
                          ? 'bg-green-50 border-2 border-green-400 shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        setFeedbackType('positive')
                        setFormData(prev => ({ ...prev, rating: 5 }))
                        setErrors(prev => ({ ...prev, feedbackType: null }))
                      }}
                    >
                      <FiThumbsUp
                        className={`text-3xl mb-2 ${
                          feedbackType === 'positive'
                            ? 'text-green-600'
                            : 'text-gray-500'
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          feedbackType === 'positive'
                            ? 'text-green-700'
                            : 'text-gray-600'
                        }`}
                      >
                        Positive
                      </span>
                    </motion.button>

                    <motion.button
                      variants={variants}
                      whileHover='hover'
                      whileTap='tap'
                      className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                        feedbackType === 'negative'
                          ? 'bg-red-50 border-2 border-red-400 shadow-md'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        setFeedbackType('negative')
                        setFormData(prev => ({ ...prev, rating: 1 }))
                        setErrors(prev => ({ ...prev, feedbackType: null }))
                      }}
                    >
                      <FiThumbsDown
                        className={`text-3xl mb-2 ${
                          feedbackType === 'negative'
                            ? 'text-red-600'
                            : 'text-gray-500'
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          feedbackType === 'negative'
                            ? 'text-red-700'
                            : 'text-gray-600'
                        }`}
                      >
                        Negative
                      </span>
                    </motion.button>
                  </div>
                  {errors.feedbackType && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='text-red-500 text-sm text-center mt-2'
                    >
                      {errors.feedbackType}
                    </motion.p>
                  )}
                </div>

                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: feedbackType ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                  className={`space-y-6 ${
                    !feedbackType ? 'pointer-events-none' : ''
                  }`}
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <motion.div variants={variants} className='space-y-1'>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700 flex items-center'
                      >
                        <FiUser className='mr-2 text-blue-500' /> Full Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                        placeholder='Your name'
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className='text-red-500 text-xs mt-1'
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div variants={variants} className='space-y-1'>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 flex items-center'
                      >
                        <FiMail className='mr-2 text-blue-500' /> Email Address
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                        placeholder='your@email.com'
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className='text-red-500 text-xs mt-1'
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div variants={variants} className='space-y-1'>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium text-gray-700 flex items-center'
                      >
                        <FiPhone className='mr-2 text-blue-500' /> Phone Number
                      </label>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                        placeholder='+91 9876543210'
                      />
                    </motion.div>

                    <motion.div variants={variants} className='space-y-1'>
                      <label
                        htmlFor='serviceUsed'
                        className='block text-sm font-medium text-gray-700 flex items-center'
                      >
                        <FiHome className='mr-2 text-blue-500' /> Service Used
                      </label>
                      <select
                        id='serviceUsed'
                        name='serviceUsed'
                        value={formData.serviceUsed}
                        onChange={handleChange}
                        className='block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white'
                      >
                        <option value=''>Select a service</option>
                        {serviceOptions.map(service => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  <motion.div variants={variants} className='space-y-1'>
                    <label className='block text-sm font-medium text-gray-700 flex items-center'>
                      <FiStar className='mr-2 text-blue-500' /> Rating (1-5)
                    </label>
                    <div className='flex space-x-2'>
                      {ratingOptions.map(star => (
                        <motion.button
                          key={star}
                          type='button'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            formData.rating && formData.rating >= star
                              ? 'bg-yellow-400 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                          onClick={() =>
                            setFormData(prev => ({ ...prev, rating: star }))
                          }
                        >
                          {star}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={variants} className='space-y-1'>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-gray-700 flex items-center'
                    >
                      <FiMessageSquare className='mr-2 text-blue-500' /> Your
                      Feedback
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 rounded-lg border ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder='Tell us about your experience...'
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='text-red-500 text-xs mt-1'
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {errors.submit && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className='text-red-500 text-sm text-center'
                    >
                      {errors.submit}
                    </motion.p>
                  )}

                  <motion.div variants={variants}>
                    <motion.button
                      type='submit'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center'
                      disabled={!feedbackType || isSending}
                    >
                      {isSending ? (
                        <>
                          <svg
                            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                            ></circle>
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Submit Feedback'
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='success'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='bg-white rounded-2xl shadow-xl overflow-hidden p-10 text-center'
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className='mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6'
              >
                <svg
                  className='h-14 w-14 text-green-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </motion.div>
              <h2 className='text-3xl font-bold text-gray-900 mb-3'>
                Thank You!
              </h2>
              <p className='text-gray-600 mb-6 text-lg'>
                We appreciate your valuable feedback.
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-gray-500'
              >
                Our team will review your comments and work to improve our
                services.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FeedbackPage
