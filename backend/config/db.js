import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URL; // Get URI from .env
    console.log(dbURI);
    if (!dbURI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    console.log("MongoDB URI:", dbURI); // Debugging line

    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
