import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";
import OtpSchema from "@/lib/models/Otp";

export async function POST(req) {
  await connectDB();
  const { email } = await req.json();

  if (!email) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Email is required",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OtpSchema.deleteMany({ email });
  await OtpSchema.create({ email, otp });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🚀 Your XeroBrokerage OTP Is Here!",
    text: `Your OTP is: ${otp}`, 
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px; background: #f9f9f9;">
        <h2 style="color: #4A90E2;">Welcome to <span style="color: #000;">XeroBrokerage</span> 👋</h2>
        <p style="font-size: 16px; color: #333;">Use the OTP below to complete your sign-up:</p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #2ecc71; background: #ecf0f1; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #999;">This OTP is valid for 5 minutes. If you didn’t request this, just ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #bbb;">Sent with 💼 by XeroBrokerage • Raipur, India</p>
      </div>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully sent OTP",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to send OTP",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
