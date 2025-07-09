import { connectDB } from "@/lib/db";
import HostelPropertyModel from "@/lib/models/HostelProperty";

export async function GET() {
  try {
    await connectDB();
    const listings = await HostelPropertyModel.find({});

    return Response.json({ success: true, listings });
  } catch (err) {
    console.error("GET ERROR (hostel):", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch listings." }),
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("New Hostel listing received:", body);

    const newHostel = new HostelPropertyModel(body);
    await newHostel.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Hostel listed successfully.",
        property: newHostel,
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("POST ERROR (Hostel):", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to add hostel." }),
      { status: 500 }
    );
  }
}

