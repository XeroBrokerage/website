import { connectDB } from "@/lib/db";
import OtpSchema from "@/lib/models/Otp";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email?.trim() || !otp?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and OTP are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectDB();

    const record = await OtpSchema.findOne({ email: email.trim() });

    if (!record) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "OTP expired or not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (record.otp !== otp.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid OTP",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await OtpSchema.deleteOne({ email: email.trim() });

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP verified ✅",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("OTP verification error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
