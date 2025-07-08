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

      <div className="card-body px-5 py-3 space-y-2 text-black">
        <h3 className="text-3xl poppins-bold tracking-wide">
          ₹{property.price.toLocaleString("en-IN")}
        </h3>
        <p className="text-sm opacity-80">{property.address}</p>
        <div className="flex gap-3 mt-2 text-sm">
          <div className="px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 text-sm text-black shadow-sm">
            <span className="flex items-center gap-1 font-medium text-sm">
              {property.beds} <span className=" opacity-50">Beds</span>
            </span>
            <span className="text-sm text-black/40">•</span>
            <span className="flex items-center gap-1 font-medium text-sm">
              {property.baths} <span className=" opacity-50">Baths</span>
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
