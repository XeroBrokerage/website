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
    await connectDB();

    const formData = await req.formData();
    const images = formData.get("images");

    const title = formData.get("title");
    const price = Number(formData.get("price")?.replace(/,/g, ""));
    const address = formData.get("address");
    const size = Number(formData.get("size"));
    const beds = Number(formData.get("beds"));
    const baths = Number(formData.get("baths"));
    const bhkConfig = formData.get("bhkConfig");
    const furnishingStatus = formData.get("furnishingStatus");
    const propertyType = formData.get("propertyType");
    const flooringType = formData.get("flooringType");
    const possessionDate = new Date(formData.get("possessionDate"));
    const maintainence = Number(formData.get("maintainence"));
    const description = formData.get("description");
    const amenities = JSON.parse(formData.get("amenities") || "[]");

    if (
      !title ||
      isNaN(price) ||
      !address ||
      isNaN(size) ||
      isNaN(beds) ||
      isNaN(baths) ||
      !bhkConfig ||
      !furnishingStatus ||
      !propertyType ||
      !flooringType ||
      isNaN(possessionDate.getTime()) ||
      isNaN(maintainence) ||
      !description ||
      !images 
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing or invalid required fields.",
        }),
        { status: 400 }
      );
    }


    // Create property
    const newProperty = await PropertyModel.create({
      title,
      price,
      address,
      size,
      beds,
      baths,
      bhkConfig,
      furnishingStatus,
      propertyType,
      flooringType,
      possessionDate,
      maintainence,
      description,
      amenities,
      images,
      uploadedAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, property: newProperty }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
    
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || "Something went wrong.",
      }),
      { status: 500 }
    );
  }
}
