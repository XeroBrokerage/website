'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setMessage({
        type: 'success',
        text: 'Password reset link has been sent to your email if it exists in our system.',
      })
    }, 1500)
  }

  return (
    <div className='fixed inset-0 overflow-hidden '>
      <div className='absolute inset-0 flex justify-center items-center p-5'>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-md max-h-[calc(100vh-40px)] overflow-y-auto bg-white rounded-xl shadow-lg p-10 flex flex-col gap-5 animate-fade-in hover:shadow-xl transition-all'
        >
          <h2 className='text-center text-2xl font-bold text-gray-800'>
            Forgot Password
          </h2>
          <p className='text-center text-gray-500 text-sm mb-5'>
            Enter your email to reset your password
          </p>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm mb-4 ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700'>Email</label>
            <div className='flex items-center border border-gray-200 rounded-lg h-12 px-3 bg-gray-50 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-colors'>
              <svg
                className='w-5 h-5 text-gray-400'
                viewBox='0 0 32 32'
                fill='currentColor'
              >
                <path d='m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z' />
              </svg>
              <input
                type='email'
                className='ml-2 w-full h-full bg-transparent outline-none text-sm text-gray-700'
                placeholder='Enter your email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className={`mt-4 w-full h-12 rounded-lg font-medium text-gray-600 hover:text-black transition-all ${
              isSubmitting
                ? 'bg-[#FCE277] text-gray-600 cursor-progress'
                : 'bg-[#FCE277] hover:bg-[#FFDF4D] active:translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <div className='flex justify-center items-center'>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              </div>
            ) : (
              'Reset Password'
            )}
          </button>

          <p className='text-center text-sm text-gray-500'>
            Remember your password?{' '}
            <Link
              href='../../Auth/login'
              className='text-blue-600 font-medium hover:text-blue-800 hover:underline'
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
