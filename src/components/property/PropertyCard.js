import Image from 'next/image'
import Link from 'next/link'
import placeholderImage from '@/assets/placeholder-house.png'

export default function PropertyCard({ property }) {
  return (
    <div className='card bg-white/90 backdrop-blur-xs border border-gray-200/50 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden hover:-translate-y-1 w-full max-w-[350px] mx-auto'>
      <figure className='relative w-full h-0 pb-[75%] overflow-hidden group'>
        <Image
          alt={property.title || 'Property Image'}
          src={property.images[0] || placeholderImage}
          layout='fill'
          objectFit='cover'
          className='object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out'
          priority={property.featured}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </figure>

      <div className='card-body px-4 py-3 space-y-1.5'>
        <div className='flex justify-between items-start'>
          <h3 className='text-xl font-bold text-gray-900'>
            ₹{property.price.toLocaleString('en-IN')}
          </h3>
          <span className='text-xs px-2 py-1 bg-black/5 rounded-full'>
            {property.type || 'For Sale'}
          </span>
        </div>

        <p className='text-sm text-gray-600 line-clamp-1'>{property.address}</p>

        <div className='flex items-center gap-2 text-xs text-gray-500 mt-1'>
          <span>{property.beds} beds</span>
          {/* <span>•</span> */}
          <span>{property.baths} baths</span>
          {property.area && (
            <>
              {/* <span>•</span> */}
              <span>{property.size} sqft</span>
            </>
          )}
        </div>

        <Link
          href={`/properties/${property._id}`}
          className='mt-2 inline-block w-full text-center text-sm font-medium px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
