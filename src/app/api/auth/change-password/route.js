import { connectDB } from "@/lib/db";
const User = require("@/lib/models/User");

export async function POST(req) {
  try {
    await connectDB();
    const { userId, currentPassword, newPassword } = await req.json();

    if (!userId || !currentPassword || !newPassword) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields." }),
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

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid current password." }),
        { status: 401 }
      );
    }

    user.password = newPassword;
    await user.save();

    return new Response(
      JSON.stringify({ success: true, message: "Password changed successfully." }),
      { status: 200 }
    );
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Something went wrong." }),
      { status: 500 }
    );
  }
}
