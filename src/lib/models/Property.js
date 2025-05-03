import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    uploadedBy: {
      type: Object,
      required: [true, "uploadedBy is required"]
    },    
    price: {
      type: Number,
      default: 0,
    },
    area: {
      type: Number,
      default: 0,
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    furnishing: {
      type: String,
      default: "N/A",
    },
    possessionDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 2000,
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    propertyType: {
      type: String,
      required: [true, "Property type is required"],
    },
    listingType: {
      type: String,
      required: [true, "Listing type is required"],
    },
    floors: {
      type: Number,
      default: 0,
    },
    parking: {
      type: String,
      default: "N/A",
    },
    maintenance: {
      type: Number,
      default: 0,
    },
    pricePerAcre: {
      type: Number,
      default: 0,
    },
    totalAcres: {
      type: Number,
      default: 0,
    },
    landType: {
      type: String,
      default: "Not Specified",
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
