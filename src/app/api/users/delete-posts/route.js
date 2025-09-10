// import { connectDB } from '@/lib/db'
// import CommercialPropertyModel from '@/lib/models/CommercialProperty'
// import ResidentialPropertyModel from '@/lib/models/ResidentialProperty'
// import HostelPropertyModel from '@/lib/models/HostelProperty'
// import PlotPropertyModel from '@/lib/models/PlotProperty'

// const MASTER_EMAIL = 'yashrawalkar04@gmail.com' // <-- Set your master email here

// const getModelByType = type => {
//   switch (type) {
//     case 'Commercial':
//       return CommercialPropertyModel
//     case 'Residential':
//       return ResidentialPropertyModel
//     case 'Hostel':
//       return HostelPropertyModel
//     case 'Plot/Land':
//       return PlotPropertyModel
//     default:
//       return null
//   }
// }

// export async function DELETE(req) {
//   try {
//     await connectDB()
//     const { id, propertyType, userEmail } = await req.json()

//     if (!id || !propertyType || !userEmail) {
//       return new Response(
//         JSON.stringify({ success: false, error: 'Missing required fields.' }),
//         { status: 400 },
//       )
//     }

//     const Model = getModelByType(propertyType)
//     if (!Model) {
//       return new Response(
//         JSON.stringify({ success: false, error: 'Invalid property type.' }),
//         { status: 400 },
//       )
//     }

//     const property = await Model.findById(id)
//     if (!property) {
//       return new Response(
//         JSON.stringify({ success: false, error: 'Property not found.' }),
//         { status: 404 },
//       )
//     }

//     // Only allow if user is uploader or master
//     if (
//       property.uploadedBy?.email !== userEmail &&
//       userEmail !== MASTER_EMAIL
//     ) {
//       return new Response(
//         JSON.stringify({ success: false, error: 'Unauthorized.' }),
//         { status: 403 },
//       )
//     }

//     await Model.findByIdAndDelete(id)

//     return Response.json({ success: true, message: 'Property deleted.' })
//   } catch (err) {
//     console.error('DELETE ERROR:', err)
//     return new Response(
//       JSON.stringify({ success: false, error: 'Failed to delete property.' }),
//       { status: 500 },
//     )
//   }
// }
import { connectDB } from '@/lib/db'
import CommercialPropertyModel from '@/lib/models/CommercialProperty'
import ResidentialPropertyModel from '@/lib/models/ResidentialProperty'
import HostelPropertyModel from '@/lib/models/HostelProperty'
import PlotPropertyModel from '@/lib/models/PlotProperty'
import User from '@/lib/models/User'

export async function POST(req) {
  try {
    await connectDB()

    const { propertyId, propertyType, userEmail } = await req.json()

    if (!propertyId || !propertyType || !userEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            'Missing required parameters: propertyId, propertyType, or userEmail.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    // Check if user is authenticated
    if (!userEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'User not Authenticated.',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    // Determine the correct model based on propertyType
    let PropertyModel
    switch (propertyType) {
      case 'Commercial':
        PropertyModel = CommercialPropertyModel
        break
      case 'Residential':
        PropertyModel = ResidentialPropertyModel
        break
      case 'Hostel':
        PropertyModel = HostelPropertyModel
        break
      case 'Plot/Land':
        PropertyModel = PlotPropertyModel
        break
      default:
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Invalid property type.',
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
    }

    // Find the property
    const property = await PropertyModel.findById(propertyId)
    if (!property) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Property not found.',
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    // Check if user is admin or the owner of the property
    const ADMIN_EMAILS = [
      'xerobrokerage@gmail.com',
      'yashrawalkar04@gmail.com',
      'ankitdulhani11@gmail.com',
    ]

    const isAdmin = ADMIN_EMAILS.includes(userEmail)
    const isOwner =
      property.uploadedBy && property.uploadedBy.email === userEmail

    if (!isAdmin && !isOwner) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'You are not authorized to delete this property.',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    // Delete the property
    await PropertyModel.findByIdAndDelete(propertyId)

    // Remove the property ID from all users' posts arrays
    await User.updateMany(
      { posts: propertyId },
      { $pull: { posts: propertyId } },
    )

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Property deleted successfully.',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (err) {
    console.error('DELETE PROPERTY ERROR:', err)
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Something went wrong.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
