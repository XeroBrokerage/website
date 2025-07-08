import { connectDB } from "@/lib/db";
import ResidentialPropertyModel from "@/lib/models/ResidentialProperty";

export async function GET() {
  try {
    await connectDB();
    const listings = await ResidentialPropertyModel.find({});
    console.log(listings);

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
    await connectDB();
    const body = await req.json();

    if (
      !body?.uploadedBy?.id ||
      !body?.uploadedBy?.name ||
      !body?.uploadedBy?.email ||
      !body.area ||
      !body.price ||
      !body.advertiseAs ||
      !body.residentialType ||
      !body.bhkConfig ||
      !body.parking ||
      !body.furnishing ||
      !body.address ||
      !body.images ||
      !body.description
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing or invalid required fields.",
        }),
        { status: 400 }
      );
    }

   
    const newProperty = new ResidentialPropertyModel(body);
    await newProperty.save();
    console.log("hehhe");
    
    console.log(newProperty);
    

    return new Response(
      JSON.stringify({
        success: true,
        message: "Property listed successfully.",
        property: newProperty,
      }),
      { status: 201 }
    );
  } catch (e) {
    console.error("POST ERROR:", e);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to add property." }),
      { status: 500 }
    );
  }
}
