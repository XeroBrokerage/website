'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
} from 'react-icons/fi'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
  }

  return (
    <div className=' py-12 px-4 sm:px-6 lg:px-8 '>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h1 className='text-4xl font-bold text-black mb-4'>Contact Us</h1>
          <div className='w-24 h-1 bg-blue-500 mx-auto mb-6'></div>
          <p className='text-xl text-black max-w-2xl mx-auto'>
            Get in touch with our team for zero-brokerage property solutions
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='bg-white rounded-2xl shadow-xl overflow-hidden'
          >
            <div className='p-8 sm:p-10'>
              {!submitted ? (
                <>
                  <h2 className='text-2xl font-semibold text-black mb-6'>
                    Send us a message
                  </h2>
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-black mb-1'
                      >
                        Your Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='block w-full px-4 py-3 rounded-lg bg-[#F2F1EF]'
                        placeholder='Enter your name'
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-black mb-1'
                      >
                        Email Address
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='block w-full px-4 py-3 rounded-lg  bg-[#F2F1EF]'
                        placeholder='your@email.com'
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium text-black mb-1 '
                      >
                        Phone Number
                      </label>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='block w-full px-4 py-3 rounded-lg  bg-[#F2F1EF]'
                        placeholder='+91 9876543210'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='message'
                        className='block text-sm font-medium text-black mb-1'
                      >
                        Your Message
                      </label>
                      <textarea
                        id='message'
                        name='message'
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className='block w-full px-4 py-3 rounded-lg  bg-[#F2F1EF]'
                        placeholder='How can we help you?'
                        required
                      ></textarea>
                    </div>

                    <motion.button
                      type='submit'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='w-full bg-[#FCE277] hover:bg-[#FFDF4D] text-gray-600 hover:text-black poppins-bold py-3 px-4 rounded-lg shadow-md flex items-center justify-center'
                    >
                      <FiSend className='mr-2' />
                      Send Message
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='text-center py-10'
                >
                  <div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-300 mb-6'>
                    <FiCheckCircle className='h-8 w-8 text-green-900' />
                  </div>
                  <h3 className='text-2xl font-bold text-black mb-2'>
                    Thank You!
                  </h3>
                  <p className='text-black mb-6'>
                    Your message has been sent successfully. Our team will
                    contact you shortly.
                  </p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='inline-flex items-center px-6 py-2 rounded-md shadow-sm text-white bg-black/90 hover:bg-black'
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='bg-white text-black rounded-2xl shadow-xl overflow-hidden'
          >
            <div className='p-8 sm:p-10 h-full'>
              <h2 className='text-2xl font-semibold mb-8'>
                Our Contact Information
              </h2>

              <div className='space-y-8'>
                <motion.div className='flex items-start'>
                  <div className='bg-opacity-20 p-3 rounded-full mr-4'>
                    <FiMail className='text-xl' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold mb-1'>Email Us</h3>
                    <p className='text-black'>xerobrokerage@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div className='flex items-start'>
                  <div className=' bg-opacity-20 p-3 rounded-full mr-4'>
                    <FiPhone className='text-xl' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold mb-1'>Call Us</h3>
                    <p className='text-black'>+91 9876543210</p>
                    <p className='text-black'>+91 9876543211</p>
                  </div>
                </motion.div>

                <motion.div className='flex items-start'>
                  <div className=' bg-opacity-20 p-3 rounded-full mr-4'>
                    <FiMapPin className='text-xl' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold mb-1'>Visit Us</h3>
                    <p className='text-black'>123 Property Plaza</p>
                    <p className='text-black'>Raipur, Chhattisgarh 492001</p>
                  </div>
                </motion.div>
              </div>

              <div className='mt-12 bg-[#FCE277] bg-opacity-10 p-6 rounded-xl'>
                <h3 className='text-lg text-blue-900 font-bold mb-3'>
                  Office Hours
                </h3>
                <ul className='space-y-2 text-blue-900'>
                  <li className='flex justify-between'>
                    <span>Mon - Fri</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className='flex justify-between'>
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className='flex justify-between'>
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
