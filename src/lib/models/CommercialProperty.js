import mongoose from "mongoose";

const commercialPropertySchema = new mongoose.Schema(
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
    advertiseAs: {
      type: String,
      required: true,
      trim: true,
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
      required: true,
    },
    parking: {
      type: String,
      trim: true,
      required: true,
    },
    lift: {
      type: String,
      trim: true,
      required: true,
    },
    security: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    images: {
      type: String, 
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

const CommercialProperty =
  mongoose.models.CommercialProperty || mongoose.model("CommercialProperty", commercialPropertySchema);

export default CommercialProperty;
