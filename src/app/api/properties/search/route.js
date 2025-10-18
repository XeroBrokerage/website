import { connectDB } from '@/lib/db'
import CommercialPropertyModel from '@/lib/models/CommercialProperty'
import ResidentialPropertyModel from '@/lib/models/ResidentialProperty'
import HostelPropertyModel from '@/lib/models/HostelProperty'
import PlotPropertyModel from '@/lib/models/PlotProperty'

export async function POST(req) {
  try {
    await connectDB()

    const { searchTerm, propertyType, listingType } = await req.json()

    console.log('Search request:', { searchTerm, propertyType, listingType })

    // Validate input
    if (!searchTerm || !propertyType || !listingType) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required parameters.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
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
            headers: { 'Content-Type': 'application/json' },
          },
        )
    }

    // Split search term into individual words for partial matching
    const searchWords = searchTerm
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 2) // Only words with 3+ characters

    if (searchWords.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          properties: [],
          count: 0,
          message: 'Search term too short. Use at least 3 characters per word.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Create search conditions for each word
    const searchConditions = searchWords.map(word => ({
      address: { $regex: word, $options: 'i' }, // Case-insensitive
    }))

    // Find properties that match ALL criteria:
    // 1. Correct property type
    // 2. Correct listing type (Buy/Rent)
    // 3. Address contains at least one search word
    const properties = await PropertyModel.find({
      listingType: listingType,
      $or: searchConditions,
    }).lean()

    console.log(`Found ${properties.length} properties for search`)

    // Add propertyType to each result
    const propertiesWithType = properties.map(property => ({
      ...property,
      propertyType: propertyType,
      _id: property._id.toString(), // Convert ObjectId to string
    }))

    return new Response(
      JSON.stringify({
        success: true,
        properties: propertiesWithType,
        count: propertiesWithType.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (err) {
    console.error('SEARCH PROPERTIES ERROR:', err)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error. Please try again later.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
