'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    const url = '/api/auth/login'
    const values = { email, password }

    try {
      const response = await axios.post(url, values, { withCredentials: true })
      if (response.data.success) {
        login(response.data.token, response.data.user)
        toast.success('Logged in successfully!', {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 3000,
        })
      }
      router.push('/')
    } catch (err) {
      toast.error(err.response.data.message || 'error', {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='flex justify-center items-center h-fit w-screen p-5 overflow-hidden inset-0'>
      <div className='w-full max-w-md max-h-[calc(100vh-40px)] overflow-y-auto'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 bg-white p-10 rounded-xl shadow-lg animate-fade-in'
        >
          <h2 className='text-center text-2xl font-bold text-black mb-2'>
            XeroBrokerage Login
          </h2>

          {/* Email Input */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-black'>Email</label>
            <div className='flex items-center rounded-lg h-12 px-3 bg-[#F2F1EF]'>
              <svg
                className='w-5 h-5 text-black'
                viewBox='0 0 32 32'
                fill='currentColor'
              >
                <path d='m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z' />
              </svg>
              <input
                type='email'
                className='ml-2 w-full h-full bg-transparent outline-none text-sm text-black'
                placeholder='Enter your Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-black'>Password</label>
            <div className='flex items-center rounded-lg h-12 px-3 bg-[#F2F1EF]'>
              <svg
                className='w-5 h-5 text-black'
                viewBox='-64 0 512 512'
                fill='currentColor'
              >
                <path d='m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0' />
                <path d='m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0' />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                className='ml-2 w-full h-full bg-transparent outline-none text-sm text-black'
                placeholder='Enter your Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='text-black hover:text-gray-600 focus:outline-none'
              >
                {showPassword ? (
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 6a9.77 9.77 0 018.82 5.5 9.77 9.77 0 01-8.82 5.5A9.77 9.77 0 013.18 11.5 9.77 9.77 0 0112 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5z' />
                  </svg>
                ) : (
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 6a9.77 9.77 0 018.82 5.5 9.77 9.77 0 01-8.82 5.5A9.77 9.77 0 013.18 11.5 9.77 9.77 0 0112 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5z' />
                    <path d='M0 0h24v24H0z' fill='none' />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className='flex justify-between items-center mt-1'>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='rememberMe'
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className='w-4 h-4 text-blue-900 rounded '
              />
              <label
                htmlFor='rememberMe'
                className='text-sm text-black cursor-pointer select-none'
              >
                Remember me
              </label>
            </div>
            <Link
              href='../../Auth/forgotPass'
              className='text-sm text-blue-900 font-medium hover:underline transition-colors'
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className={`mt-3 w-full h-12 rounded-lg font-bold text-gray-600 hover:text-black transition-all ${
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
              'Sign In'
            )}
          </button>

          {/* Sign Up Link */}
          <p className='text-center text-sm text-black mt-1'>
            Don't have an account?{' '}
            <Link
              href='../../Auth/signup'
              className='text-blue-900 font-medium hover:underline transition-colors'
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
