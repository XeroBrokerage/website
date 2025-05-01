import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    beds: {
      type: Number,
      default: 0,
    },
    baths: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      required: [true, "Size is required"],
    },
    maintainence: {
      type: Number,
      required: [true, "Maintenance is required"],
    },
    bhkConfig: {
      type: String,
      required: [true, "BHK configuration is required"],
    },
    furnishingStatus: {
      type: String,
      required: [true, "Furnishing status is required"],
    },
    propertyType: {
      type: String,
      required: [true, "Property type is required"],
    },
    flooringType: {
      type: String,
      required: [true, "Flooring type is required"],
    },
    possessionDate: {
      type: Date,
      required: [true, "Possession date is required"],
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
  },
  {
    timestamps: true, 
  }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
