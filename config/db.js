import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`MongoDB Error ${error}`.bgBlue.white)
    }
};

export default connectDB;