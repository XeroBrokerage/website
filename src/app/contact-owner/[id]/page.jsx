'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Image from 'next/image'
import {
  Mail,
  Phone,
  User,
  Home,
  ArrowLeft,
  MessageCircle,
  MapPin,
  Calendar,
  Star,
  Share2,
  Heart,
  Eye,
} from 'lucide-react'

const ContactOwner = () => {
  const params = useParams()
  const ownerId = params?.id
  const [loading, setLoading] = useState(true)
  const [propertiesLoading, setPropertiesLoading] = useState(true)
  const [userProperties, setUserProperties] = useState([])
  const [ownerData, setOwnerData] = useState(null)
  const [activeTab, setActiveTab] = useState('properties')

  // Safe URL construction function
  const getPropertyUrl = useCallback(property => {
    try {
      if (!property || typeof property !== 'object') {
        return '/properties'
      }

      if (!property._id) {
        return '/properties'
      }

      const propertyId = property._id.toString
        ? property._id.toString()
        : String(property._id)

      if (!propertyId || propertyId === 'undefined' || propertyId === 'null') {
        return '/properties'
      }

      return `/properties/${encodeURIComponent(propertyId)}`
    } catch (error) {
      return '/properties'
    }
  }, [])

  // Fetch owner data
  const fetchOwnerData = useCallback(async () => {
    if (!ownerId) return

    try {
      const res = await fetch('/api/users/get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: ownerId }),
      })

      if (!res.ok) throw new Error('Failed to fetch owner data')

      const data = await res.json()
      if (data.success && data.user) {
        setOwnerData(data.user)
      } else {
        throw new Error(data.error || 'Failed to fetch owner data')
      }
    } catch (error) {
      console.error('Error fetching owner data:', error)
      toast.error('Failed to load owner information')
    }
  }, [ownerId])

  // Fetch owner properties
  const fetchOwnerProperties = useCallback(async () => {
    if (!ownerId) {
      setPropertiesLoading(false)
      return
    }

    setPropertiesLoading(true)
    try {
      const res = await fetch('/api/users/get-user-properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: ownerId }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()

      if (data.success && Array.isArray(data.properties)) {
        const validProperties = data.properties.filter(property => {
          if (!property || typeof property !== 'object') return false
          if (!property._id) return false

          const idString = property._id.toString
            ? property._id.toString()
            : String(property._id)
          return (
            idString &&
            idString !== 'undefined' &&
            idString !== 'null' &&
            idString.length > 0
          )
        })

        setUserProperties(validProperties)
      } else {
        throw new Error(data.error || 'Invalid response format from API')
      }
    } catch (error) {
      console.error('Error fetching owner properties:', error)
      toast.error('Failed to load properties')
      setUserProperties([])
    } finally {
      setPropertiesLoading(false)
    }
  }, [ownerId])

  useEffect(() => {
    if (ownerId) {
      setLoading(true)
      Promise.all([fetchOwnerData(), fetchOwnerProperties()]).finally(() =>
        setLoading(false),
      )
    }
  }, [ownerId, fetchOwnerData, fetchOwnerProperties])

  // Share profile function
  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `Contact ${ownerData?.name} - Property Owner`,
        text: `Check out properties listed by ${ownerData?.name}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Profile link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-blue-800 text-lg'>Loading owner information...</p>
        </div>
      </div>
    )
  }

  if (!ownerData) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto px-4'>
          <div className='bg-white rounded-2xl shadow-xl p-8'>
            <div className='w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center'>
              <User className='h-10 w-10 text-blue-600' />
            </div>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>
              Owner Not Found
            </h2>
            <p className='text-gray-600 mb-6'>
              The requested property owner could not be found or may have
              removed their profile.
            </p>
            <Link
              href='/'
              className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              <ArrowLeft size={18} className='mr-2' />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header with Back Button */}
        <div className='flex justify-between items-center mb-8'>
          <Link
            href='/'
            className='inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md'
          >
            <ArrowLeft size={18} className='mr-2' />
            Back to Properties
          </Link>

          <button
            onClick={shareProfile}
            className='inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md'
          >
            <Share2 size={18} className='mr-2' />
            Share Profile
          </button>
        </div>

        {/* Owner Profile Card - Enhanced */}
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-amber-300'>
          {/* Profile Header with Gradient */}
          <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-12 text-center relative overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0 opacity-10'>
              <div className='absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16'></div>
              <div className='absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16'></div>
            </div>

            <div className='relative z-10'>
              <div className='w-fit mx-auto mb-6'>
                <div className='mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white'>
                  <img
                    src={ownerData.profilePic || '/def_profile.png'}
                    alt={ownerData.name || 'Profile'}
                    className='w-full h-full object-cover'
                    onError={e => {
                      e.target.onerror = null
                      e.target.src = '/def_profile.png'
                    }}
                  />
                </div>
              </div>

              <h1 className='text-3xl font-bold text-white mb-2'>
                {ownerData.name}
              </h1>
              <p className='text-white font-bold text-lg mb-4'>
                Property Owner
              </p>

              {/* Stats */}
              <div className='flex justify-center space-x-8 mt-6'>
                <div className='text-center'>
                  <div className='text-white text-2xl font-bold'>
                    {userProperties.length}
                  </div>
                  <div className='text-white text-sm'>Properties</div>
                </div>
                {/* <div className='text-center'>
                  <div className='text-white text-2xl font-bold'>
                    {
                      userProperties.filter(p => p.listingType === 'For Sell')
                        .length
                    }
                  </div>
                  <div className='text-white text-sm'>For Sale</div>
                </div> */}
                {/* <div className='text-center'>
                  <div className='text-white text-2xl font-bold'>
                    {
                      userProperties.filter(p => p.listingType === 'For Rent')
                        .length
                    }
                  </div>
                  <div className='text-white text-sm'>For Rent</div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Contact Information - Enhanced */}
          <div className='px-8 py-8'>
            {/* Tab Navigation */}
            <div className='flex border-b border-gray-200 mb-8'>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center px-6 py-3 font-medium text-lg border-b-2 transition-all duration-300 ${
                  activeTab === 'contact'
                    ? 'border-yellow-300 text-amber-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className='mr-2' size={20} />
                Contact Info
              </button>
              <button
                onClick={() => setActiveTab('properties')}
                className={`flex items-center px-6 py-3 font-medium text-lg border-b-2 transition-all duration-300 ${
                  activeTab === 'properties'
                    ? 'border-yellow-300 text-amber-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Home className='mr-2' size={20} />
                Properties ({userProperties.length})
              </button>
            </div>

            {activeTab === 'contact' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
                  <User className='text-yellow-600 mr-3' />
                  Get in Touch
                </h2>

                <div className='grid md:grid-cols-2 gap-6'>
                  {/* Email Card */}
                  <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start mb-4'>
                      <div className='bg-blue-100 p-3 rounded-lg mr-4'>
                        <Mail className='text-blue-600' size={24} />
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-800 mb-1'>
                          Email Address
                        </h3>
                        <p className='text-gray-600 text-sm'>
                          Send an email for inquiries
                        </p>
                      </div>
                    </div>
                    <a
                      href={`mailto:${ownerData.email}?subject=Inquiry about your property listing`}
                      className='block w-full text-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium'
                    >
                      Send Email
                    </a>
                  </div>

                  {/* Phone Card */}
                  {ownerData.phone && (
                    <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300'>
                      <div className='flex items-start mb-4'>
                        <div className='bg-green-100 p-3 rounded-lg mr-4'>
                          <Phone className='text-green-600' size={24} />
                        </div>
                        <div>
                          <h3 className='font-semibold text-gray-800 mb-1'>
                            Phone Number
                          </h3>
                          <p className='text-gray-600 text-sm'>
                            Call directly for quick response
                          </p>
                        </div>
                      </div>
                      <a
                        href={`tel:${ownerData.phone}`}
                        className='block w-full text-center bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium'
                      >
                        Call Now
                      </a>
                    </div>
                  )}
                </div>

                {/* Quick Contact */}
                <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 mt-6'>
                  <h3 className='font-semibold text-gray-800 mb-3 flex items-center'>
                    <MessageCircle className='text-purple-600 mr-2' />
                    Quick Message Templates
                  </h3>
                  <div className='grid sm:grid-cols-2 gap-3'>
                    {[
                      "Hi, I'm interested in your property. Can you share more details?",
                      'Hello, is this property still available?',
                      'Could you please schedule a property viewing?',
                    ].map((template, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const mailtoLink = `mailto:${
                            ownerData.email
                          }?subject=Property Inquiry&body=${encodeURIComponent(
                            template,
                          )}`
                          window.location.href = mailtoLink
                        }}
                        className='text-left p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-400 transition-all duration-300 text-sm text-gray-700 hover:shadow-md'
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
                  <Home className='text-yellow-600 mr-3' />
                  Properties Listed by {ownerData.name}
                </h2>

                {propertiesLoading ? (
                  <div className='text-center py-12'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
                    <p className='text-gray-500 mt-4'>Loading properties...</p>
                  </div>
                ) : userProperties.length === 0 ? (
                  <div className='text-center py-12'>
                    <div className='w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center'>
                      <Home className='h-12 w-12 text-blue-300' />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                      No Properties Listed
                    </h3>
                    <p className='text-gray-500'>
                      This owner hasn't listed any properties yet.
                    </p>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {userProperties.map((property, index) => {
                      const propertyUrl = getPropertyUrl(property)

                      return (
                        <div
                          key={property._id || `property-${index}`}
                          className='bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group'
                        >
                          {/* Image Section - FIXED: Use property.images directly like in User Profile */}
                          <div className='relative h-48 w-full overflow-hidden'>
                            <Image
                              src={property.images || '/placeholder-house.png'}
                              alt={property.title || 'Property'}
                              fill
                              className='object-cover'
                              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            />

                            {/* Property Type Badge */}
                            <div className='absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg'>
                              {property.propertyType || 'Property'}
                            </div>

                            {/* Listing Type Badge */}
                            <div
                              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                                property.listingType === 'For Rent'
                                  ? 'bg-green-500 text-white'
                                  : 'bg-orange-500 text-white'
                              }`}
                            >
                              {property.listingType || 'For Sale'}
                            </div>

                            {/* Overlay on Hover */}
                            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                              <Link
                                href={propertyUrl}
                                className='opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-amber-500 px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-yellow-400 hover:text-white'
                              >
                                <Eye size={20} className='inline mr-2' />
                                Click to View Details
                              </Link>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className='p-5'>
                            <h3 className='font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-yellow-500 transition-colors'>
                              {property.propertyType + ' Property' ||
                                'Untitled Property'}
                            </h3>

                            <div className='flex items-center text-gray-600 mb-3'>
                              <MapPin
                                size={14}
                                className='mr-1 flex-shrink-0'
                              />
                              <p className='text-sm line-clamp-1'>
                                {property.address || 'Address not specified'}
                              </p>
                            </div>

                            <div className='flex justify-between items-center mb-4'>
                              <span className='text-yellow-500 font-bold text-lg'>
                                {property.pricePerSqFt
                                  ? `₹${property.pricePerSqFt.toLocaleString()}/Sq Ft`
                                  : 'Price on Request'}
                              </span>
                            </div>

                            <div className='flex justify-between items-center pt-3 border-t border-gray-100'>
                              <div className='flex items-center text-gray-500 text-sm'>
                                <Calendar size={14} className='mr-1' />
                                {property.createdAt
                                  ? new Date(
                                      property.createdAt,
                                    ).toLocaleDateString()
                                  : 'Unknown date'}
                              </div>
                              <Link
                                href={propertyUrl}
                                className='bg-yellow-500 text-white  px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-all duration-300 shadow hover:shadow-md'
                              >
                                View Property
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-center text-white mb-8'>
          <h2 className='text-2xl font-bold mb-3'>Ready to Connect?</h2>
          <p className='text-white mb-6 text-lg'>
            Reach out to {ownerData.name} directly for any property inquiries
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href={`mailto:${ownerData.email}?subject=Inquiry about your property listing`}
              className='inline-flex items-center justify-center px-8 py-3 bg-white text-yellow-600 rounded-xl hover:bg-yellow-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl'
            >
              <MessageCircle size={20} className='mr-2' />
              Send Message
            </a>
            {ownerData.phone && (
              <a
                href={`tel:${ownerData.phone}`}
                className='inline-flex items-center justify-center px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl'
              >
                <Phone size={20} className='mr-2' />
                Call Now
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactOwner

// Perfectly working code below
// 'use client'

// import React, { useState, useEffect, useCallback } from 'react'
// import { useParams } from 'next/navigation'
// import { toast } from 'react-toastify'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Mail, Phone, User, Home, ArrowLeft, MessageCircle } from 'lucide-react'

// const ContactOwner = () => {
//   const params = useParams()
//   const ownerId = params?.id
//   const [loading, setLoading] = useState(true)
//   const [propertiesLoading, setPropertiesLoading] = useState(true)
//   const [userProperties, setUserProperties] = useState([])
//   const [ownerData, setOwnerData] = useState(null)

//   // Safe URL construction function
//   const getPropertyUrl = useCallback(property => {
//     try {
//       if (!property || typeof property !== 'object') {
//         return '/properties'
//       }

//       if (!property._id) {
//         return '/properties'
//       }

//       const propertyId = property._id.toString
//         ? property._id.toString()
//         : String(property._id)

//       if (!propertyId || propertyId === 'undefined' || propertyId === 'null') {
//         return '/properties'
//       }

//       return `/properties/${encodeURIComponent(propertyId)}`
//     } catch (error) {
//       return '/properties'
//     }
//   }, [])

//   // Safe image URL construction function - only validates, doesn't replace
//   const getSafeImageUrl = useCallback(imageUrl => {
//     if (!imageUrl) {
//       return null // Return null for missing images
//     }

//     // If it's already a valid URL, return it
//     if (
//       imageUrl.startsWith('http://') ||
//       imageUrl.startsWith('https://') ||
//       imageUrl.startsWith('/')
//     ) {
//       return imageUrl
//     }

//     // If it's a data URL, return it
//     if (imageUrl.startsWith('data:')) {
//       return imageUrl
//     }

//     // For other cases, assume it's a relative path and add leading slash
//     if (!imageUrl.startsWith('/')) {
//       return `/${imageUrl}`
//     }

//     return imageUrl
//   }, [])

//   // Fetch owner data
//   const fetchOwnerData = useCallback(async () => {
//     if (!ownerId) return

//     try {
//       const res = await fetch('/api/users/get-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: ownerId }),
//       })

//       if (!res.ok) throw new Error('Failed to fetch owner data')

//       const data = await res.json()
//       if (data.success && data.user) {
//         setOwnerData(data.user)
//       } else {
//         throw new Error(data.error || 'Failed to fetch owner data')
//       }
//     } catch (error) {
//       console.error('Error fetching owner data:', error)
//       toast.error('Failed to load owner information')
//     }
//   }, [ownerId])

//   // Fetch owner properties
//   const fetchOwnerProperties = useCallback(async () => {
//     if (!ownerId) {
//       setPropertiesLoading(false)
//       return
//     }

//     setPropertiesLoading(true)
//     try {
//       const res = await fetch('/api/users/get-user-properties', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: ownerId }),
//       })

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`)
//       }

//       const data = await res.json()

//       if (data.success && Array.isArray(data.properties)) {
//         // Process properties - keep original images but validate them
//         const validProperties = data.properties.filter(property => {
//           if (!property || typeof property !== 'object') {
//             return false
//           }

//           if (!property._id) {
//             return false
//           }

//           const idString = property._id.toString
//             ? property._id.toString()
//             : String(property._id)

//           if (
//             !idString ||
//             idString === 'undefined' ||
//             idString === 'null' ||
//             idString.length === 0
//           ) {
//             return false
//           }

//           return true
//         })

//         console.log(
//           'Properties with images:',
//           validProperties.map(p => ({
//             title: p.title,
//             images: p.images,
//             firstImage: p.images?.[0],
//           })),
//         )

//         setUserProperties(validProperties)
//       } else {
//         throw new Error(data.error || 'Invalid response format from API')
//       }
//     } catch (error) {
//       console.error('Error fetching owner properties:', error)
//       toast.error('Failed to load properties')
//       setUserProperties([])
//     } finally {
//       setPropertiesLoading(false)
//     }
//   }, [ownerId])

//   useEffect(() => {
//     if (ownerId) {
//       setLoading(true)
//       Promise.all([fetchOwnerData(), fetchOwnerProperties()]).finally(() =>
//         setLoading(false),
//       )
//     }
//   }, [ownerId, fetchOwnerData, fetchOwnerProperties])

//   // Simple Image component with error handling
//   const PropertyImage = useCallback(
//     ({ src, alt, ...props }) => {
//       const [imgSrc, setImgSrc] = useState(() => getSafeImageUrl(src))
//       const [hasError, setHasError] = useState(false)

//       // Reset when src changes
//       React.useEffect(() => {
//         const newSrc = getSafeImageUrl(src)
//         setImgSrc(newSrc)
//         setHasError(false)
//       }, [src, getSafeImageUrl])

//       const handleError = () => {
//         console.warn('Image failed to load:', src)
//         if (!hasError) {
//           setHasError(true)
//           // Don't set a fallback - let the parent handle missing images
//         }
//       }

//       // If no image source or image failed to load, show a placeholder div
//       if (!imgSrc || hasError) {
//         return (
//           <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//             <Home className='h-12 w-12 text-gray-400' />
//           </div>
//         )
//       }

//       return <Image src={imgSrc} alt={alt} onError={handleError} {...props} />
//     },
//     [getSafeImageUrl],
//   )

//   if (loading) {
//     return (
//       <div className='min-h-screen bg-yellow-50 flex items-center justify-center'>
//         <div className='text-center'>
//           <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto'></div>
//           <p className='mt-4 text-yellow-800'>Loading owner information...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!ownerData) {
//     return (
//       <div className='min-h-screen bg-yellow-50 flex items-center justify-center'>
//         <div className='text-center'>
//           <h2 className='text-2xl font-bold text-yellow-800 mb-4'>
//             Owner Not Found
//           </h2>
//           <p className='text-yellow-700 mb-6'>
//             The requested property owner could not be found.
//           </p>
//           <Link
//             href='/'
//             className='inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition'
//           >
//             <ArrowLeft size={16} className='mr-2' />
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className='min-h-screen bg-yellow-50 py-8 px-4 sm:px-6 lg:px-8'>
//       <div className='max-w-6xl mx-auto'>
//         {/* Back Button */}
//         <Link
//           href='/'
//           className='inline-flex items-center text-yellow-700 hover:text-yellow-900 mb-6'
//         >
//           <ArrowLeft size={18} className='mr-2' />
//           Back to Properties
//         </Link>

//         {/* Owner Profile Card */}
//         <div className='bg-white shadow-lg rounded-xl overflow-hidden mb-8 border-2 border-yellow-200'>
//           {/* Header with Yellow Accent */}
//           <div className='bg-yellow-500 px-6 py-6 text-center rounded-t-xl'>
//             <div className='w-fit mx-auto mb-4'>
//               <div className='mx-auto w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-300 shadow-lg bg-white'>
//                 <img
//                   src={ownerData.profilePic || '/def_profile.png'}
//                   alt={ownerData.name || 'Profile'}
//                   className='w-full h-full object-cover'
//                   onError={e => {
//                     e.target.onerror = null
//                     e.target.src = '/def_profile.png'
//                   }}
//                 />
//               </div>
//             </div>

//             <h1 className='text-2xl font-bold text-white mb-1'>
//               {ownerData.name}
//             </h1>
//             <p className='text-yellow-100'>Property Owner</p>
//           </div>

//           {/* Contact Information */}
//           <div className='px-6 py-8'>
//             <h2 className='text-xl font-semibold text-gray-800 mb-6 border-b border-yellow-200 pb-2 flex items-center'>
//               <User className='text-yellow-600 mr-2' />
//               Contact Information
//             </h2>

//             <div className='space-y-4'>
//               <div className='flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100'>
//                 <Mail className='text-yellow-600 mr-4' size={20} />
//                 <div>
//                   <p className='text-sm text-yellow-700'>Email</p>
//                   <a
//                     href={`mailto:${ownerData.email}`}
//                     className='font-medium text-gray-900 hover:text-yellow-700 transition'
//                   >
//                     {ownerData.email}
//                   </a>
//                 </div>
//               </div>

//               {ownerData.phone && (
//                 <div className='flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100'>
//                   <Phone className='text-yellow-600 mr-4' size={20} />
//                   <div>
//                     <p className='text-sm text-yellow-700'>Phone Number</p>
//                     <a
//                       href={`tel:${ownerData.phone}`}
//                       className='font-medium text-gray-900 hover:text-yellow-700 transition'
//                     >
//                       {ownerData.phone}
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className='mt-8 pt-6 border-t border-yellow-200'>
//               <a
//                 href={`mailto:${ownerData.email}?subject=Inquiry about your property listing`}
//                 className='w-full flex justify-center items-center px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition shadow-md hover:shadow-lg'
//               >
//                 <MessageCircle size={18} className='mr-2' />
//                 Contact Owner
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Owner's Properties */}
//         <div className='bg-white shadow-lg rounded-xl overflow-hidden p-6 mb-8 border-2 border-yellow-200'>
//           <h2 className='text-xl font-semibold text-gray-800 mb-6 border-b border-yellow-200 pb-2 flex items-center'>
//             <Home className='text-yellow-600 mr-2' />
//             Properties Listed by {ownerData.name}
//           </h2>

//           {propertiesLoading ? (
//             <div className='text-center py-8'>
//               <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto'></div>
//               <p className='text-gray-500 mt-2'>Loading properties...</p>
//             </div>
//           ) : userProperties.length === 0 ? (
//             <div className='text-center py-8 text-gray-500'>
//               <Home className='mx-auto h-12 w-12 text-gray-300 mb-4' />
//               <p>This owner hasn't listed any properties yet.</p>
//             </div>
//           ) : (
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//               {userProperties.map((property, index) => {
//                 const propertyUrl = getPropertyUrl(property)
//                 const firstImage = property.images?.[0]

//                 return (
//                   <div
//                     key={property._id || `property-${index}-${Date.now()}`}
//                     className='border rounded-lg overflow-hidden hover:shadow-md transition-shadow border-yellow-100'
//                   >
//                     <div className='relative h-48 w-full'>
//                       <PropertyImage
//                         src={firstImage}
//                         alt={property.title || 'Property'}
//                         fill
//                         className='object-cover'
//                       />
//                       <div className='absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs'>
//                         {property.propertyType || 'Property'}
//                       </div>
//                     </div>

//                     <div className='p-4'>
//                       <h3 className='font-semibold text-lg mb-2 line-clamp-1 text-yellow-900'>
//                         {property.title || 'Untitled Property'}
//                       </h3>

//                       <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
//                         {property.address || 'No address provided'}
//                       </p>

//                       <div className='flex justify-between items-center mb-3'>
//                         <span className='text-yellow-700 font-bold'>
//                           {property.pricePerSqFt
//                             ? `₹${property.pricePerSqFt}/Sq Ft.`
//                             : 'Price on Request'}
//                         </span>
//                         <span className='text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded'>
//                           {property.listingType || 'For Sale'}
//                         </span>
//                       </div>

//                       <Link
//                         href={propertyUrl}
//                         className='block w-full text-center bg-yellow-500 text-white py-2 px-4 rounded text-sm hover:bg-yellow-600 transition'
//                       >
//                         View Property
//                       </Link>

//                       <p className='text-xs text-gray-400 mt-3'>
//                         Listed on{' '}
//                         {property.createdAt
//                           ? new Date(property.createdAt).toLocaleDateString()
//                           : 'Unknown date'}
//                       </p>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ContactOwner

// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { toast } from 'react-toastify'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Mail, Phone, User, Home, ArrowLeft, MessageCircle } from 'lucide-react'

// const ContactOwner = () => {
//   const params = useParams()
//   const ownerId = params?.id
//   const [loading, setLoading] = useState(true)
//   const [propertiesLoading, setPropertiesLoading] = useState(true)
//   const [userProperties, setUserProperties] = useState([])
//   const [ownerData, setOwnerData] = useState(null)

//   // Fetch owner data
//   const fetchOwnerData = async () => {
//     if (!ownerId) return

//     try {
//       const res = await fetch('/api/users/get-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: ownerId }),
//       })

//       if (!res.ok) throw new Error('Failed to fetch owner data')

//       const data = await res.json()
//       if (data.success && data.user) {
//         setOwnerData(data.user)
//       }
//     } catch (error) {
//       console.error('Error fetching owner data:', error)
//       toast.error('Failed to load owner information')
//     }
//   }

//   // Fetch owner properties
//   const fetchOwnerProperties = async () => {
//     if (!ownerId) return

//     setPropertiesLoading(true)
//     try {
//       const res = await fetch('/api/users/get-user-properties', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: ownerId }),
//       })

//       if (!res.ok) throw new Error('Failed to fetch owner properties')

//       const data = await res.json()
//       if (data.success) {
//         setUserProperties(data.properties || [])
//       }
//     } catch (error) {
//       console.error('Error fetching owner properties:', error)
//       toast.error('Failed to load properties')
//     } finally {
//       setPropertiesLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (ownerId) {
//       setLoading(true)
//       Promise.all([fetchOwnerData(), fetchOwnerProperties()]).finally(() =>
//         setLoading(false),
//       )
//     }
//   }, [ownerId])

//   if (loading) {
//     return (
//       <div className='min-h-screen bg-yellow-50 flex items-center justify-center'>
//         <div className='text-center'>
//           <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto'></div>
//           <p className='mt-4 text-yellow-800'>Loading owner information...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!ownerData) {
//     return (
//       <div className='min-h-screen bg-yellow-50 flex items-center justify-center'>
//         <div className='text-center'>
//           <h2 className='text-2xl font-bold text-yellow-800 mb-4'>
//             Owner Not Found
//           </h2>
//           <p className='text-yellow-700 mb-6'>
//             The requested property owner could not be found.
//           </p>
//           <Link
//             href='/'
//             className='inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition'
//           >
//             <ArrowLeft size={16} className='mr-2' />
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className='min-h-screen bg-yellow-50 py-8 px-4 sm:px-6 lg:px-8'>
//       <div className='max-w-6xl mx-auto'>
//         {/* Back Button */}
//         <Link
//           href='/'
//           className='inline-flex items-center text-yellow-700 hover:text-yellow-900 mb-6'
//         >
//           <ArrowLeft size={18} className='mr-2' />
//           Back to Properties
//         </Link>

//         {/* Owner Profile Card */}
//         <div className='bg-white shadow-lg rounded-xl overflow-hidden mb-8 border-2 border-yellow-200'>
//           {/* Header with Yellow Accent */}
//           <div className='bg-yellow-500 px-6 py-6 text-center rounded-t-xl'>
//             <div className='w-fit mx-auto mb-4'>
//               <div className='mx-auto w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-300 shadow-lg bg-white'>
//                 <img
//                   src={ownerData.profilePic || '/def_profile.png'}
//                   alt={ownerData.name || 'Profile'}
//                   className='w-full h-full object-cover'
//                   onError={e => {
//                     e.target.onerror = null
//                     e.target.src = '/def_profile.png'
//                   }}
//                 />
//               </div>
//             </div>

//             <h1 className='text-2xl font-bold text-white mb-1'>
//               {ownerData.name}
//             </h1>
//             <p className='text-yellow-100'>Property Owner</p>
//           </div>

//           {/* Contact Information */}
//           <div className='px-6 py-8'>
//             <h2 className='text-xl font-semibold text-gray-800 mb-6 border-b border-yellow-200 pb-2 flex items-center'>
//               <User className='text-yellow-600 mr-2' />
//               Contact Information
//             </h2>

//             <div className='space-y-4'>
//               <div className='flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100'>
//                 <Mail className='text-yellow-600 mr-4' size={20} />
//                 <div>
//                   <p className='text-sm text-yellow-700'>Email</p>
//                   <a
//                     href={`mailto:${ownerData.email}`}
//                     className='font-medium text-gray-900 hover:text-yellow-700 transition'
//                   >
//                     {ownerData.email}
//                   </a>
//                 </div>
//               </div>

//               {ownerData.phone && (
//                 <div className='flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100'>
//                   <Phone className='text-yellow-600 mr-4' size={20} />
//                   <div>
//                     <p className='text-sm text-yellow-700'>Phone Number</p>
//                     <a
//                       href={`tel:${ownerData.phone}`}
//                       className='font-medium text-gray-900 hover:text-yellow-700 transition'
//                     >
//                       {ownerData.phone}
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className='mt-8 pt-6 border-t border-yellow-200'>
//               <a
//                 href={`mailto:${ownerData.email}?subject=Inquiry about your property listing`}
//                 className='w-full flex justify-center items-center px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition shadow-md hover:shadow-lg'
//               >
//                 <MessageCircle size={18} className='mr-2' />
//                 Contact Owner
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Owner's Properties */}
//         <div className='bg-white shadow-lg rounded-xl overflow-hidden p-6 mb-8 border-2 border-yellow-200'>
//           <h2 className='text-xl font-semibold text-gray-800 mb-6 border-b border-yellow-200 pb-2 flex items-center'>
//             <Home className='text-yellow-600 mr-2' />
//             Properties Listed by {ownerData.name}
//           </h2>

//           {propertiesLoading ? (
//             <div className='text-center py-8'>
//               <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto'></div>
//               <p className='text-gray-500 mt-2'>Loading properties...</p>
//             </div>
//           ) : userProperties.length === 0 ? (
//             <div className='text-center py-8 text-gray-500'>
//               <Home className='mx-auto h-12 w-12 text-gray-300 mb-4' />
//               <p>This owner hasn't listed any properties yet.</p>
//             </div>
//           ) : (
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//               {userProperties.map(property => (
//                 <div
//                   key={property._id}
//                   className='border rounded-lg overflow-hidden hover:shadow-md transition-shadow border-yellow-100'
//                 >
//                   <div className='relative h-48 w-full'>
//                     <Image
//                       src={property.images?.[0] || '/placeholder-house.png'}
//                       alt={property.title || 'Property'}
//                       fill
//                       className='object-cover'
//                     />
//                     <div className='absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs'>
//                       {property.propertyType}
//                     </div>
//                   </div>

//                   <div className='p-4'>
//                     <h3 className='font-semibold text-lg mb-2 line-clamp-1 text-yellow-900'>
//                       {property.title || 'Untitled Property'}
//                     </h3>

//                     <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
//                       {property.address}
//                     </p>

//                     <div className='flex justify-between items-center mb-3'>
//                       <span className='text-yellow-700 font-bold'>
//                         {property.pricePerSqFt
//                           ? `₹${property.pricePerSqFt}/Sq Ft.`
//                           : 'Price on Request'}
//                       </span>
//                       <span className='text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded'>
//                         {property.listingType || 'For Sale'}
//                       </span>
//                     </div>

//                     <Link
//                       href={`/properties/${property._id}`}
//                       className='block w-full text-center bg-yellow-500 text-white py-2 px-4 rounded text-sm hover:bg-yellow-600 transition'
//                     >
//                       View Property
//                     </Link>

//                     <p className='text-xs text-gray-400 mt-3'>
//                       Listed on{' '}
//                       {new Date(property.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ContactOwner
