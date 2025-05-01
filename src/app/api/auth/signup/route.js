import { connectDB } from "@/lib/db";
import userSchema from "@/lib/models/User";
import { EqualApproximatelyIcon } from "lucide-react";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email already taken. Use different email",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const newUser = new userSchema({
      name,
      email,
      password,
      posts: [],
    });
    await newUser.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "User Registered Successfully..",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
