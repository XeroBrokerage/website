'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiAlertTriangle,
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiFileText,
  FiCheckCircle,
} from 'react-icons/fi'
import emailjs from '@emailjs/browser'

const ReportProblemPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceAffected: '',
    issueType: '',
    problemDescription: '',
    urgency: 'medium',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Initialize EmailJS with your User ID
  emailjs.init('hA2oG5Ijiiy7AMdsp')

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = phone => {
    const digitsOnly = phone.replace(/\D/g, '')
    return digitsOnly.length === 10
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
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    if (!formData.serviceAffected)
      newErrors.serviceAffected = 'Please select a service'
    if (!formData.issueType) newErrors.issueType = 'Please select issue type'
    if (!formData.problemDescription)
      newErrors.problemDescription = 'Please describe your problem'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSending(true)
    setErrors({})

    try {
      const response = await emailjs.send(
        'service_j81bdi1',  // Service ID
        'template_cgy886e', // Template ID
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          serviceAffected: formData.serviceAffected,
          issueType: formData.issueType,
          problemDescription: formData.problemDescription,
          urgency: formData.urgency,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          websiteLink: 'https://xerobrokerage.in',
          dashboardLink: 'https://yourwebsite.com/admin/issues'
        }
      )

      if (response.status !== 200) {
        throw new Error(`EmailJS responded with status ${response.status}`)
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Failed to send problem report:', error)
      setErrors({
        submit: error.message || 'Failed to submit problem report. Please try again later.'
      })
    } finally {
      setIsSending(false)
    }
  }

  const serviceOptions = [
    'Property Listing',
    'Property Search',
    'Loan Assistance',
    'Legal Documentation',
    'Construction Services',
    'Account Management',
    'Payment Processing',
    'Other',
  ]

  const issueTypes = [
    'Technical Glitch',
    'Service Not Working',
    'Incorrect Information',
    'Poor Customer Service',
    'Payment Issue',
    'Security Concern',
    'Other',
  ]

  const urgencyLevels = [
    { value: 'low', label: 'Low (Minor inconvenience)' },
    { value: 'medium', label: 'Medium (Affecting usage)' },
    { value: 'high', label: 'High (Critical problem)' },
  ]

  return (
    <div className='min-h-screen scrollbar-hide bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <div className='inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4'>
            <FiAlertTriangle className='text-red-600 text-2xl' />
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Report a Problem
          </h1>
          <p className='text-xl text-gray-600'>
            Help us improve by reporting any issues you've encountered
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
                <motion.form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-1'>
                      <label
                        htmlFor='name'
                        className=' text-sm font-medium text-gray-700 flex items-center'
                      >
                        <FiUser className='mr-2 text-red-500' /> Your Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all`}
                        placeholder='Your full name'
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
                    </div>

                    <div className='space-y-1'>
                      <label
                        htmlFor='email'
                        className='text-sm font-medium text-gray-700 flex items-center'
                      >
                        <FiMail className='mr-2 text-red-500' /> Email Address
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all`}
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
                    </div>

                    <div className='space-y-1'>
                      <label
                        htmlFor='phone'
                        className=' text-sm font-medium text-gray-700 flex items-center'
                      >
                        <FiPhone className='mr-2 text-red-500' /> Phone Number
                        (Optional)
                      </label>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all`}
                        placeholder='+91 9876543210 or 9876543210'
                      />
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className='text-red-500 text-xs mt-1'
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    <div className='space-y-1'>
                      <label
                        htmlFor='serviceAffected'
                        className=' text-sm font-medium text-gray-700 flex items-center'
                      >
                        <FiHome className='mr-2 text-red-500' /> Service
                        Affected
                      </label>
                      <select
                        id='serviceAffected'
                        name='serviceAffected'
                        value={formData.serviceAffected}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          errors.serviceAffected
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white`}
                      >
                        <option value=''>Select a service</option>
                        {serviceOptions.map(service => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.serviceAffected && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className='text-red-500 text-xs mt-1'
                        >
                          {errors.serviceAffected}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-1'>
                      <label
                        htmlFor='issueType'
                        className=' text-sm font-medium text-gray-700 flex items-center'
                      >
                        <FiAlertTriangle className='mr-2 text-red-500' /> Type
                        of Issue
                      </label>
                      <select
                        id='issueType'
                        name='issueType'
                        value={formData.issueType}
                        onChange={handleChange}
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          errors.issueType
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white`}
                      >
                        <option value=''>Select issue type</option>
                        {issueTypes.map(issue => (
                          <option key={issue} value={issue}>
                            {issue}
                          </option>
                        ))}
                      </select>
                      {errors.issueType && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className='text-red-500 text-xs mt-1'
                        >
                          {errors.issueType}
                        </motion.p>
                      )}
                    </div>

                    <div className='space-y-1'>
                      <label className='block text-sm font-medium text-gray-700'>
                        How urgent is this problem?
                      </label>
                      <div className='space-y-2'>
                        {urgencyLevels.map(level => (
                          <label
                            key={level.value}
                            className='flex items-center space-x-3'
                          >
                            <input
                              type='radio'
                              name='urgency'
                              value={level.value}
                              checked={formData.urgency === level.value}
                              onChange={handleChange}
                              className='h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300'
                            />
                            <span className='text-gray-700'>{level.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label
                      htmlFor='problemDescription'
                      className=' text-sm font-medium text-gray-700 flex items-center'
                    >
                      <FiFileText className='mr-2 text-red-500' /> Problem
                      Description
                    </label>
                    <textarea
                      id='problemDescription'
                      name='problemDescription'
                      rows={6}
                      value={formData.problemDescription}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 rounded-lg border ${
                        errors.problemDescription
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all`}
                      placeholder='Please describe the problem in detail.'
                    />
                    {errors.problemDescription && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='text-red-500 text-xs mt-1'
                      >
                        {errors.problemDescription}
                      </motion.p>
                    )}
                    <p className='text-xs text-gray-500 mt-1'>
                      Be as specific as possible. Include error messages,
                      screenshots (if available), and what you were trying to
                      do.
                    </p>
                  </div>

                  {errors.submit && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className='text-red-500 text-sm text-center'
                    >
                      {errors.submit}
                    </motion.p>
                  )}

                  <div className='pt-4'>
                    <motion.button
                      type='submit'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center'
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Problem Report'
                      )}
                    </motion.button>
                  </div>
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
                <FiCheckCircle className='h-14 w-14 text-green-600' />
              </motion.div>
              <h2 className='text-3xl font-bold text-gray-900 mb-3'>
                Problem Reported
              </h2>
              <p className='text-gray-600 mb-6 text-lg'>
                We've received your report and will investigate promptly.
              </p>

              <div className='bg-blue-50 p-6 rounded-lg text-left max-w-2xl mx-auto'>
                <h3 className='font-semibold text-blue-800 mb-3 flex items-center'>
                  <FiAlertTriangle className='mr-2' /> What happens next?
                </h3>
                <ul className='space-y-2 text-gray-700'>
                  <li className='flex items-start'>
                    <span className='inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-3'>
                      <svg
                        className='w-3 h-3'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                    Our team will review your report within 24 hours
                  </li>
                  <li className='flex items-start'>
                    <span className='inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-3'>
                      <svg
                        className='w-3 h-3'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                    We'll contact you if we need more information
                  </li>
                  <li className='flex items-start'>
                    <span className='inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-3'>
                      <svg
                        className='w-3 h-3'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                    We'll notify you when the issue is resolved
                  </li>
                  <li className='flex items-start'>
                    <span className='inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-3'>
                      <svg
                        className='w-3 h-3'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                    We'll use your feedback to improve our services
                  </li>
                </ul>
              </div>

              <p className='mt-8 text-gray-500'>
                Thank you for helping us improve our platform.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ReportProblemPage
