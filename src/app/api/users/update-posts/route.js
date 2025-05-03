import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, propertyId } = await req.json();

    if (!userId || !propertyId) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing userId or propertyId." }),
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found." }),
        { status: 404 }
      );
    }

    user.posts.push(propertyId);
    await user.save();

    return new Response(
      JSON.stringify({ success: true, message: "User posts updated successfully." }),
      { status: 200 }
    );
  } catch (err) {
    console.error("UPDATE USER POSTS ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Something went wrong." }),
      { status: 500 }
    );
  }
}
