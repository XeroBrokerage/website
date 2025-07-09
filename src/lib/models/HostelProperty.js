import mongoose from "mongoose";

const HostelPropertySchema = new mongoose.Schema(
  {
    uploadedBy: {
      name: { type: String, required: true },
      id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
      email: { type: String, required: true },
    },
    rentPerMonth: { type: String, required: true }, // e.g., "5000"
    sharingType: { type: String, required: true }, // e.g., "Single", "Double", etc.
    foodIncluded: { type: String, required: true }, // e.g., "Yes" / "No"
    furnishing: { type: String, required: true }, // e.g., "Fully Furnished"
    attachedBathroom: { type: String, required: true }, // e.g., "Yes" / "No"
    acAvailable: { type: String, required: true }, // e.g., "Yes" / "No"
    wifi: { type: String, required: true }, // e.g., "Yes" / "No"
    address: { type: String, required: true },
    images: { type: String, required: true }, // One image or comma-separated
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.hostelProperty ||
  mongoose.model("hostelProperty", HostelPropertySchema);
