import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default async function ConnectDbMongoose() {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_PASS}`);
    console.log("Connected to Mongoose on ENV: ", process.env.MONGO_DB_PASS);
  } catch (error) {
    console.log("Not connected to Mongoose", error);
  }
}
