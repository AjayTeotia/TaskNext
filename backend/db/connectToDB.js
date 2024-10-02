// IMPORT PACKAGES
import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("CONNECTED TO MONGODB");
  } catch (err) {
    console.log(`ERROR WHILE CONNECTING TO MONGODB ${err}`);
  }
};

export default connectToDB;
