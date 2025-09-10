import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(req) {
  try {
    await connectDB()

    const { userId, name, phone, profilePic } = await req.json()

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

    // Find the user
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

    // Update user fields
    if (name !== undefined) user.name = name
    if (phone !== undefined) user.phone = phone
    if (profilePic !== undefined) user.profilePic = profilePic

    // Save the updated user
    await user.save()

    // Return the updated user (excluding sensitive fields)
    const updatedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
      posts: user.posts,
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: updatedUser,
        message: 'Profile updated successfully.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (err) {
    console.error('UPDATE PROFILE ERROR:', err)
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
