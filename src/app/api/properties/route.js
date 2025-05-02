import { connectDB } from "@/lib/db";
import PropertyModel from "@/lib/models/Property";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

export async function GET() {
  try {
    await connectDB();
    const listings = await PropertyModel.find({});
    return Response.json({ success: true, listings });
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch listings." }),
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    // await connectDB();
    const body = await req.json();
    console.log("data we getting....");
    console.log(body);
    return new Response(JSON.stringify({ success: true, received: body }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ success: false, error: e.message || "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
