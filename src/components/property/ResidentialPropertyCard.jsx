import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi"; // 🧠 Install react-icons if not done: npm i react-icons
import placeholderImage from "@/assets/placeholder-house.png";

export default function PropertyCard({ property }) {
  return (
    <div className="flex flex-col justify-between bg-white/90 backdrop-blur-xs border border-gray-200/50 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden w-full max-w-[450px] mx-auto">
      {/* Image */}
      <figure className="relative w-full h-[240px] overflow-hidden group">
        <Image
          alt="Property Image"
          src={property.images || placeholderImage}
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </figure>

      {/* Details */}
      <div className="flex-1 px-5 py-3 flex flex-col justify-between gap-3 text-black">
        <div className="space-y-1">
          <h3 className="text-2xl poppins-bold tracking-wide truncate">
            ₹{property.price}
          </h3>

          <h4 className="text-base poppins-semibold tracking-wide text-gray-800">
            {property.bhkConfig} {property.residentialType} for {property.advertiseAs}
          </h4>

          <p className="text-sm text-gray-700 flex items-center gap-1 line-clamp-1">
            <FiMapPin className="text-red-500 text-base shrink-0" />
            <span className="truncate">{property.address}</span>
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span>{property.bhkConfig}</span>
            <span>•</span>
            <span>{property.area} sqft</span>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/properties/${property._id}`}
          className="w-full mt-3 text-center text-sm font-medium px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
