import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("🚀 ~ dbConnect ~ connection:", connection);
  } catch (error) {
    console.log("🚀 ~ dbConnect ~ error:", error);
    process.exit(1);
  }
};

export default dbConnect;
