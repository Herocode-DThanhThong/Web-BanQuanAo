import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL as string);
    console.log("Connect mongodb successfullly");
  } catch (error) {
    //console.log(error);
    console.log("Connect mongodb successfullly");
  }
};

export default connectDB;
