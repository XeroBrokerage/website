import mongoose from "mongoose";

const residentialPropertySchema = new mongoose.Schema(
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
    area: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    advertiseAs: {
      type: String,
      required: true,
    },
    residentialType: {
      type: String,
      required: true,
    },
    bhkConfig: {
      type: String,
      required: true,
    },
    parking: {
      type: String,
    },
    furnishing: {
      type: String,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ResidentialProperty = mongoose.models.ResidentialProperty || mongoose.model("ResidentialProperty", residentialPropertySchema);

export default ResidentialProperty;
