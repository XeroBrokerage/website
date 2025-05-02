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
    const body = await req.json();
    console.log("s1");

    const {
      propertyType,
      listingType,
      title,
      address,
      price,
      area,
      bedrooms,
      bathrooms,
      furnishing,
      possessionDate,
      description,
      amenities,
      images,
      floors,
      parking,
      maintenance,
      pricePerAcre,
      totalAcres,
      landType,
      flooringType, // Add this in the frontend too!
    } = body;

    if (propertyType === "Residential") {
      if (bedrooms === undefined || bathrooms === undefined) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Missing bedrooms or bathrooms for Residential property.",
          }),
          { status: 400 }
        );
      }
    } else if (propertyType === "Commercial") {
      if (
        floors === undefined ||
        parking === undefined ||
        maintenance === undefined
      ) {
        return new Response(
          JSON.stringify({
            success: false,
            error:
              "Missing floors, parking, or maintenance for Commercial property.",
          }),
          { status: 400 }
        );
      }
    } else if (propertyType === "Plot/Land") {
      if (
        pricePerAcre === undefined ||
        totalAcres === undefined ||
        landType === undefined
      ) {
        return new Response(
          JSON.stringify({
            success: false,
            error:
              "Missing pricePerAcre, totalAcres, or landType for Plot/Land property.",
          }),
          { status: 400 }
        );
      }
    }

    // Clean and process data
    const cleanedPrice = Number(price?.toString().replace(/,/g, "")) || 0;
    const cleanedArea = Number(area) || 0;
    const cleanedMaintenance = Number(maintenance) || 0;
    const cleanedBedrooms = Number(bedrooms) || 0;
    const cleanedBathrooms = Number(bathrooms) || 0;
    const cleanedFloors = Number(floors) || 0;
    const cleanedPricePerAcre = Number(pricePerAcre) || 0;
    const cleanedTotalAcres = Number(totalAcres) || 0;
    const bhkConfig = `${cleanedBedrooms} BHK`;

    // Create new property document
    const newProperty = await PropertyModel.create({
      propertyType,
      listingType,
      title,
      address,
      price: cleanedPrice,
      size: cleanedArea, // Mongoose wants "size", not "area"
      bedrooms: cleanedBedrooms,
      bathrooms: cleanedBathrooms,
      bhkConfig,
      furnishingStatus: furnishing,
      flooringType: flooringType || "tiles", // default fallback
      possessionDate: new Date(possessionDate),
      description,
      amenities: Array.isArray(amenities) ? amenities : [],
      images: Array.isArray(images) ? images : [images], // just in case
      floors: cleanedFloors,
      parking: parking || "N/A",
      maintenance: cleanedMaintenance,
      pricePerAcre: cleanedPricePerAcre,
      totalAcres: cleanedTotalAcres,
      landType: landType || "",
    });

    console.log(newProperty);

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
      { status: 501 }
    );
  }
}
