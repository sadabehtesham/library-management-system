import mongoose from "mongoose";

export const connectDB = () => {
  const uri = process.env.MONGO_URI || process.env.MONGO_URL;
  mongoose
    .connect(uri, {
      dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM",
    })
    .then((res) => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Error while connecting with database", err);
    });
};