// import { connectDB } from '@/lib/db'
// import PropertyModel from '@/lib/models/Property'
// import placeholderImage from 'assets/placeholder-house.png'
// import { IoIosArrowForward } from 'react-icons/io'
// import Footer from '../../../components/ui/footer'
// import Image from 'next/image'

// export async function generateMetadata({ params }) {
//   return {
//     title: 'Property Details',
//     description: 'View property listing details',
//   }
// }

// export default async function PropertyDetails({ params }) {
//   const { id } = await params

//   await connectDB()
//   const property = await PropertyModel.findById(id).lean()

//   if (!property) {
//     return (
//       <div className='min-h-screen flex justify-center items-center text-gray-600'>
//         Property not found
//       </div>
//     )
//   }

//   const {
//     propertyType,
//     listingType,
//     uploadedBy,
//     title,
//     address,
//     price,
//     area,
//     bedrooms,
//     bathrooms,
//     furnishing,
//     possessionDate,
//     description,
//     amenities,
//     images,
//     floors,
//     parking,
//     maintenance,
//     pricePerAcre,
//     totalAcres,
//     landType,
//   } = property

//   const renderAmenities = () => {
//     if (!amenities || amenities.length === 0) return null

//     return (
//       <div className='mt-2'>
//         <h4 className='font-semibold'>Amenities:</h4>
//         <ul className='list-disc list-inside'>
//           {amenities.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       </div>
//     )
//   }

//   const renderByType = () => {
//     switch (propertyType) {
//       case 'Residential':
//         return (
//           <div>
//             <p className='text-2xl font-bold text-blue-600'>
//               ₹{price.toLocaleString()}
//             </p>
//             <p>
//               <strong>Area:</strong> {area} sq.ft
//             </p>
//             <p>
//               <strong>Bedrooms:</strong> {bedrooms}
//             </p>
//             <p>
//               <strong>Bathrooms:</strong> {bathrooms}
//             </p>
//             <p>
//               <strong>Furnishing:</strong> {furnishing}
//             </p>
//             <p>
//               <strong>Possession Date:</strong>{' '}
//               {new Date(possessionDate).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Description:</strong> {description}
//             </p>
//             {renderAmenities()}
//           </div>
//         )

//       case 'Commercial':
//         return (
//           <div>
//             <p>
//               <strong>Price:</strong> ₹{price}
//             </p>
//             <p>
//               <strong>Area:</strong> {area} sq.ft
//             </p>
//             <p>
//               <strong>Floors:</strong> {floors}
//             </p>
//             <p>
//               <strong>Parking:</strong> {parking}
//             </p>
//             <p>
//               <strong>Maintenance:</strong> ₹{maintenance}
//             </p>
//             <p>
//               <strong>Possession Date:</strong>{' '}
//               {new Date(possessionDate).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Description:</strong> {description}
//             </p>
//             {renderAmenities()}
//           </div>
//         )

//       case 'Plot/Land':
//         return (
//           <div>
//             <p>
//               <strong>Price:</strong> ₹{price}
//             </p>
//             <p>
//               <strong>Price per Acre:</strong> ₹{pricePerAcre}
//             </p>
//             <p>
//               <strong>Total Acres:</strong> {totalAcres}
//             </p>
//             <p>
//               <strong>Land Type:</strong> {landType}
//             </p>
//             <p>
//               <strong>Possession Date:</strong>{' '}
//               {new Date(possessionDate).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Description:</strong> {description}
//             </p>
//             {renderAmenities()}
//           </div>
//         )
//       default:
//         return <p>Unknown property type</p>
//     }
//   }

//   return (
//     <div className='min-h-screen bg-gray-100 py-10 px-4'>
//       <div className='max-w-4xl mx-auto bg-white p-6 rounded shadow-md'>
//         <div className='mb-4'>
//           <Image
//             src={
//               Array.isArray(images) && images.length > 0
//                 ? images[0]
//                 : placeholderImage
//             }
//             alt='Property Image'
//             width={800}
//             height={450}
//             className='rounded w-full object-cover max-h-[450px]'
//           />
//         </div>
//         <h2 className='text-2xl font-bold mb-1'>{title}</h2>
//         <p className='text-gray-600 mb-2'>{address}</p>
//         <p className='text-indigo-600 font-medium mb-2'>
//           Property Type: {propertyType}
//         </p>
//         <p className='text-indigo-600 font-medium mb-2'>
//           Listing Type: {listingType}
//         </p>
//         <div className='border-t pt-4 space-y-2'>{renderByType()}</div>
//         <div className='mt-6 text-sm text-gray-500'>
//           Uploaded by: {uploadedBy?.name} ({uploadedBy?.email})
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page