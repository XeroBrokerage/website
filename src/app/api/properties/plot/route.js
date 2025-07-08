import { connectDB } from "@/lib/db";
import PlotProperty from "@/lib/models/PlotProperty";

export async function GET() {
  try {
    await connectDB();
    const listings = await PlotProperty.find({});
    console.log("Plot listings fetched:", listings);

    return Response.json({ success: true, listings });
  } catch (err) {
    console.error("GET ERROR (Plot):", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch plot listings." }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("New plot listing received:", body);

    const newPlot = new PlotProperty(body);
    await newPlot.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Plot listed successfully.",
        property: newPlot,
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("POST ERROR (Plot):", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to add plot." }),
      { status: 500 }
    );
  }
}
