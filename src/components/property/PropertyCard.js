import Image from "next/image";
import Link from "next/link";
import placeholderImage from '@/assets/placeholder-house.png';

export default function PropertyCard({ property }) {
  return (
    <div className="card bg-black/10 backdrop-blur-sm shadow-md hover:shadow-xl transition-shadow rounded-[30px] lg:w-[30%] md:w-[45%] w-[95%] overflow-hidden">
      <figure className="relative w-full h-0 pb-[66.66%] overflow-hidden  shadow-sm group">
        <Image
          alt={property.title || "Property Image"}
          src={property.images[0] || placeholderImage} 
          layout="fill" 
          objectFit="cover" 
          className="object-cover group-hover:scale-102 transition-transform duration-300 ease-in-out"
          priority={property.featured} 
        />
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

          <div className="card-actions flex flex-col gap-2">
            <Link
              href={`/properties/${property._id}`}
              className="btn  backdrop-blur-xs p-2 px-4 hover:bg-black/30 text-black btn-sm rounded-full w-fit transition text-center"
            >
              View Details
            </Link>
            <p className="text-xs opacity-60 text-center">ID: {property._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
