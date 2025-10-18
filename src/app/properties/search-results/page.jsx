'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const searchTerm = searchParams.get('searchTerm')
  const propertyType = searchParams.get('propertyType')
  const listingType = searchParams.get('listingType')

  // Map UI property types to database property types
  const propertyTypeMap = {
    Villa: 'Residential',
    LandsAndPlots: 'Plot/Land',
    Office: 'Commercial',
    Hostel: 'Hostel',
    Flat: 'Residential',
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      // Check if we have the required parameters
      if (!searchTerm || !propertyType || !listingType) {
        setError('Missing search parameters. Please try your search again.')
        setLoading(false)
        return
      }

      try {
        // Convert UI property type to database property type
        const dbPropertyType = propertyTypeMap[propertyType] || 'Residential'

        const res = await fetch('/api/properties/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            searchTerm,
            propertyType: dbPropertyType,
            listingType,
          }),
        })

        // Check if response is JSON
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server returned an invalid response')
        }

        const data = await res.json()

        if (res.ok && data.success) {
          setResults(data.properties || [])
        } else {
          setError(data.error || 'Failed to fetch search results')
        }
      } catch (error) {
        console.error('Search error:', error)
        setError('Failed to load search results. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [searchTerm, propertyType, listingType])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h1 className='text-2xl font-bold text-gray-800 mb-4'>Error</h1>
          <p className='text-gray-600 mb-6'>{error}</p>
          <div className='flex justify-center gap-4'>
            <button
              onClick={() => router.back()}
              className='px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700'
            >
              Go Back
            </button>
            <Link
              href='/'
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>
          Search Results
        </h1>

        <div className='mb-6'>
          <p className='text-gray-600'>
            Found {results.length} properties for "{searchTerm}" in{' '}
            {propertyType} for {listingType.toLowerCase()}
          </p>
        </div>

        {results.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>🔍</div>
            <h2 className='text-xl font-semibold text-gray-600 mb-2'>
              No properties found
            </h2>
            <p className='text-gray-500 mb-4'>
              Try adjusting your search criteria or browse all properties.
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={() => router.back()}
                className='px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700'
              >
                Go Back
              </button>
              <Link
                href='/properties'
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
              >
                Browse All Properties
              </Link>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {results.map(property => (
              <div
                key={property._id}
                className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
              >
                <div className='relative h-48 w-full'>
                  <Image
                    src={property.images || '/placeholder-house.png'}
                    alt={property.title || 'Property'}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs'>
                    {property.propertyType}
                  </div>
                </div>

                <div className='p-4'>
                  <h3 className='font-semibold text-lg mb-2'>
                    {property.title || 'Untitled Property'}
                  </h3>

                  <p className='text-gray-600 text-sm mb-3'>
                    {property.address}
                  </p>

                  <div className='flex justify-between items-center mb-3'>
                    <span className='text-blue-600 font-bold'>
                      {property.price
                        ? `₹${property.price.toLocaleString()}`
                        : 'Price on Request'}
                    </span>
                    <span className='text-sm text-gray-500 capitalize'>
                      {property.listingType || 'For Sale'}
                    </span>
                  </div>

                  <Link
                    href={`/properties/${property._id}`}
                    className='block w-full bg-blue-600 text-white py-2 px-4 rounded text-center text-sm hover:bg-blue-700'
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
