import mongoose from "mongoose"

const connectDB = async () => {

  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

    if (connectionInstance) {
      console.log("Database connected at host: ", connectionInstance.connection.host);
    }

  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }

}

export default connectDB;