import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    console.log("connecting to mongoDB....!");
    
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "xerobrokerage", 
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
