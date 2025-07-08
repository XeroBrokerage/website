import mongoose from "mongoose";

const plotPropertySchema = new mongoose.Schema(
  {
    uploadedBy: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    },
    propertyType: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerSqFt: {
      type: String, 
      required: true,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    roadConnectivity: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: String, 
      default: "",
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const PlotProperty =
  mongoose.models.PlotProperty || mongoose.model("PlotProperty", plotPropertySchema);

export default PlotProperty;
