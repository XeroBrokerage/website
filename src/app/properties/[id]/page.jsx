import { connectDB } from '@/lib/db'
import PropertyModel from '@/lib/models/Property'
import placeholderImage from '@/assets/placeholder-house.png'
import { FaBed, FaBath, FaRulerCombined, FaCalendarAlt } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import Footer from '../../../components/ui/footer'

export async function generateMetadata({ params }) {
  return {
    title: 'Property Details',
    description: 'View property listing details',
  }
}

export default async function PropertyDetails({ params }) {
  const { id } = await params

  await connectDB()

  const property = await PropertyModel.findById(id).lean()

  if (!property) {
    return (
      <div className='min-h-screen flex justify-center items-center text-gray-600'>
        Property not found
      </div>
    )
  }

  return (
    <div className='min-h-screen py-6 px-4 sm:px-6 max-w-7xl mx-auto'>
      <div className='flex items-center text-sm text-gray-500 mb-4'>
        <span>Home</span>
        <IoIosArrowForward className='mx-2' />
        <span>{property.propertyType}s for Sale</span>
        <IoIosArrowForward className='mx-2' />
        <span className='text-gray-700 font-medium'>{property.title}</span>
      </div>

      {/* Property Title and Address */}
      <div className='mb-6'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
          {property.title}
        </h1>
        <p className='text-gray-600 mt-1'>{property.address}</p>
      </div>

      <div className='mb-6'>
        <p className='text-gray-600 mt-1'>
          Uploaded By : {property.uploadedBy.name}
        </p>
      </div>

      {/* Price and Basic Info */}
      <div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='text-2xl font-bold text-blue-600'>
              ₹{property.price.toLocaleString()}
            </p>
            <p className='text-gray-500 text-sm'>
              ₹{(property.price / property.size).toLocaleString()} per sq.ft
            </p>
          </div>
          <div className='flex items-center space-x-4 mt-3 sm:mt-0'>
            <div className='flex items-center text-gray-700'>
              <FaBed className='mr-1' />
              <span>{property.beds} Beds</span>
            </div>
            <div className='flex items-center text-gray-700'>
              <FaBath className='mr-1' />
              <span>{property.baths} Baths</span>
            </div>
            <div className='flex items-center text-gray-700'>
              <FaRulerCombined className='mr-1' />
              <span>{property.size} sq.ft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Images Gallery */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='md:col-span-2'>
          <img
            src={property.images[0] || placeholderImage.src}
            alt='Main property image'
            className='rounded-lg object-cover w-full h-80 shadow-sm'
          />
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className='relative'>
              <img
                src={
                  property.images[i] ||
                  'https://via.placeholder.com/300x200?text=Property'
                }
                alt={`Property image ${i}`}
                className='rounded-lg object-cover w-full h-36 shadow-sm'
              />
              {i === 3 && property.images.length > 4 && (
                <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg'>
                  <span className='text-white font-bold'>
                    +{property.images.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='lg:w-2/3'>
          {/* Overview Card */}
          <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              Overview
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <div>
                <p className='text-gray-500 text-sm'>Property Type</p>
                <p className='font-medium'>{property.propertyType}</p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Configuration</p>
                <p className='font-medium'>{property.bhkConfig}</p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Furnishing</p>
                <p className='font-medium'>{property.furnishingStatus}</p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Flooring</p>
                <p className='font-medium'>{property.flooringType}</p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Maintenance</p>
                <p className='font-medium'>
                  ₹{property.maintainence}/sq.ft/month
                </p>
              </div>
              <div>
                <p className='text-gray-500 text-sm'>Possession</p>
                <p className='font-medium'>
                  {new Date(property.possessionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>
              Description
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {property.description}
            </p>
          </div>

          {/* Amenities Card */}
          {property.amenities && property.amenities.length > 0 && (
            <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
              <h2 className='text-xl font-semibold mb-4 text-gray-800'>
                Amenities
              </h2>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className='flex items-center text-gray-700 text-sm'
                  >
                    <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Contact/CTA */}
        <div className='lg:w-1/3'>
          <div className='bg-white rounded-lg shadow-sm p-6 sticky top-4'>
            <h3 className='text-lg font-semibold mb-4'>Contact Owner</h3>
            <div className='space-y-4'>
              <button className='w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors'>
                Call Now
              </button>
              <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'>
                WhatsApp
              </button>
              <button className='w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors'>
                Email
              </button>
            </div>

            <div className='mt-6 pt-6 border-t border-gray-200'>
              <h4 className='font-medium mb-2'>Price Insights</h4>
              <p className='text-sm text-gray-600 mb-1'>
                Avg. price in this area: ₹
                {(property.price * 0.9).toLocaleString()}
              </p>
              <p className='text-sm text-gray-600'>
                Price trend: <span className='text-green-600'>↑ 7.38%</span>{' '}
                this year
              </p>
            </div>

            <div className='mt-6 pt-6 border-t border-gray-200'>
              <h4 className='font-medium mb-2'>Property Activity</h4>
              <div className='flex justify-between text-sm text-gray-600'>
                <span>Views</span>
                <span>1,385</span>
              </div>
              <div className='flex justify-between text-sm text-gray-600 mt-1'>
                <span>Shortlists</span>
                <span>67</span>
              </div>
              <div className='flex justify-between text-sm text-gray-600 mt-1'>
                <span>Posted On</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className='bg-white rounded-lg shadow-sm p-6 mt-6'>
        <h2 className='text-xl font-semibold mb-4 text-gray-800'>
          Location Map
        </h2>
        <div className='h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500'>
          Map View - {property.address}
        </div>
      </div>

      {/* Similar Properties */}
      <div className='mt-10'>
        <h2 className='text-xl font-semibold mb-4 text-gray-800'>
          Similar Properties
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Placeholder for similar properties */}
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <div className='h-40 bg-gray-200 rounded-lg mb-3'></div>
            <h3 className='font-medium'>3 BHK Flat in Prestige Pine Wood</h3>
            <p className='text-gray-600 text-sm'>Koramangala, Bangalore</p>
            <p className='font-bold mt-2'>₹1.2 Cr</p>
          </div>
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <div className='h-40 bg-gray-200 rounded-lg mb-3'></div>
            <h3 className='font-medium'>2 BHK Flat in Brigade Gateway</h3>
            <p className='text-gray-600 text-sm'>Malleshwaram, Bangalore</p>
            <p className='font-bold mt-2'>₹85 L</p>
          </div>
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <div className='h-40 bg-gray-200 rounded-lg mb-3'></div>
            <h3 className='font-medium'>4 BHK Villa in Sobha City</h3>
            <p className='text-gray-600 text-sm'>Whitefield, Bangalore</p>
            <p className='font-bold mt-2'>₹2.5 Cr</p>
          </div>
        </div>
      </div>
      <div className='mt-20 w-full'>
        <Footer />
      </div>
    </div>
  )
}
