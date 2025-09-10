import { connectDB } from '@/lib/db'
import CommercialPropertyModel from '@/lib/models/CommercialProperty'
import ResidentialPropertyModel from '@/lib/models/ResidentialProperty'
import HostelPropertyModel from '@/lib/models/HostelProperty'
import PlotPropertyModel from '@/lib/models/PlotProperty'
import User from '@/lib/models/User'

export async function POST(req) {
  try {
    await connectDB()

    const { userId } = await req.json()

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing userId.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Get the user to find their posts
    const user = await User.findById(userId)
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'User not found.',
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Get all property IDs from user's posts
    const propertyIds = user.posts || []

    if (propertyIds.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          properties: [],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Fetch properties from all collections
    const commercialProperties = await CommercialPropertyModel.find({
      _id: { $in: propertyIds },
    }).lean()

    const residentialProperties = await ResidentialPropertyModel.find({
      _id: { $in: propertyIds },
    }).lean()

    const hostelProperties = await HostelPropertyModel.find({
      _id: { $in: propertyIds },
    }).lean()

    const plotProperties = await PlotPropertyModel.find({
      _id: { $in: propertyIds },
    }).lean()

    // Combine all properties and add propertyType
    const allProperties = [
      ...commercialProperties.map(p => ({ ...p, propertyType: 'Commercial' })),
      ...residentialProperties.map(p => ({
        ...p,
        propertyType: 'Residential',
      })),
      ...hostelProperties.map(p => ({ ...p, propertyType: 'Hostel' })),
      ...plotProperties.map(p => ({ ...p, propertyType: 'Plot/Land' })),
    ]

    // Sort by creation date (newest first)
    allProperties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return new Response(
      JSON.stringify({
        success: true,
        properties: allProperties,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (err) {
    console.error('GET USER PROPERTIES ERROR:', err)
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Something went wrong.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
