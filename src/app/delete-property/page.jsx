'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export default function DeletePropertyButton({
  propertyId,
  propertyType,
  uploaderEmail,
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const {
    user,
    isAuthenticated,
    loading: authLoading,
    getUserEmail,
  } = useAuth()

  const handleDelete = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this property? This action cannot be undone.',
      )
    )
      return

    setLoading(true)
    setError('')

    try {
      const userEmail = getUserEmail()

      if (!userEmail) {
        setError('You must be logged in to delete a property.')
        setLoading(false)
        return
      }

      const res = await fetch('/api/users/delete-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId,
          propertyType,
          userEmail: userEmail,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        alert('Property deleted successfully.')
        router.push('/')
      } else {
        setError(data.error || 'Failed to delete property.')
      }
    } catch (err) {
      setError('Failed to delete property. Please try again.')
      console.error('Delete error:', err)
    }

    setLoading(false)
  }

  if (authLoading) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='bg-white rounded-xl shadow-md p-6 text-center'>
          <p className='text-sm text-gray-500'>Loading...</p>
        </div>
      </div>
    )
  }

  const userEmail = getUserEmail()
  const isAdmin =
    userEmail === 'yashrawalkar04@gmail.com' ||
    userEmail === 'xerobrokerage@gmail.com' ||
    userEmail === 'ankitdulhani11@gmail.com'
  const isOwner = userEmail === uploaderEmail

  // Only show button if user is owner or admin
  if (!isOwner && !isAdmin) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='bg-white rounded-xl shadow-md p-6 text-center'>
          <p className='text-sm text-gray-500'>
            Delete option not available. You must be the property owner/admin to
            delete this property.
          </p>
          <p className='text-xs text-gray-400 mt-2'>
            Logged in as: {userEmail || 'Not logged in'}
          </p>
          {/* {userEmail && (
            <p className='text-xs text-gray-400 mt-1'>
              Your email: {userEmail}
            </p>
          )} */}
          {uploaderEmail && (
            <p className='text-xs text-gray-400 mt-1'>
              Property Owner Email: {uploaderEmail}
            </p>
          )}
          {!isAuthenticated && (
            <p className='text-xs text-red-400 mt-1'>
              Please Log-In to see delete options
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <div className='bg-white rounded-xl shadow-md p-6 text-center'>
        {/* <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Property Management
        </h3> */}
        <button
          onClick={handleDelete}
          disabled={loading}
          className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Deleting...' : 'Delete Property'}
        </button>
        {error && <div className='text-red-500 mt-2'>{error}</div>}
        <p className='text-sm text-gray-500 mt-2'>
          {isAdmin
            ? 'Admin: You can delete any property'
            : 'You can delete your own property'}
        </p>
        <p className='text-xs text-gray-400 mt-1'>Logged in as: {userEmail}</p>
        {isAdmin && (
          <p className='text-xs text-yellow-600 mt-1'>
            Admin Mode: You can delete any property
          </p>
        )}
      </div>
    </div>
  )
}
