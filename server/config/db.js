import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, { autoIndex: true });
    console.log(`Server running on port http://localhost:${process.env.PORT || 5000}`)
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
