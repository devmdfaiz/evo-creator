import mongoose from "mongoose";

/**
 * For stablishing connection to mongo database 
 */
const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Database connection succ");
    }

    console.log("Databse connection already exits");
  } catch (error) {
    console.log("Some thing error in databse connection", error);
  }
};

export default connectToDb;
