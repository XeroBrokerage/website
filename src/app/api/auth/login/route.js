import userSchema from "@/lib/models/User";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  console.log("Attempting Login...");
  const user = await userSchema.findOne({ email });

  if (!user) {
    console.log("User not found: ", email);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid Email.. Please Try Again ",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Password Missmatch ", email);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid Password.. Please Try Again",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10h" } 
    );
    

  console.log("Token generated: ", token);

  return new Response(
    JSON.stringify({
      success: true,
      message: "Login Success..",
      token: token,
      user: {
        name: user.name,
        email: user.email,
        id: user._id
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
