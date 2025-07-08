import { connectDB } from "@/lib/db";
import CommercialPropertyModel from "@/lib/models/CommercialProperty";

export async function GET() {
  try {
    await connectDB();
    const listings = await CommercialPropertyModel.find({});

    return Response.json({ success: true, listings });
  } catch (err) {
    console.error("GET ERROR (Commercial):", err);
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

    const newProperty = new CommercialPropertyModel(body);
    await newProperty.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Commercial property listed successfully.",
        property: newProperty,
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("POST ERROR (Commercial):", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to add listing." }),
      { status: 500 }
    );
  }
}
