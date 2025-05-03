import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { userId } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing userId." }),
        { status: 400 }
      );
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found." }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, user }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET USER ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Something went wrong." }),
      { status: 500 }
    );
  }
}
