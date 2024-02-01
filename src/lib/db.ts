import mongoose from "mongoose";

const url = process.env.MONGODB_URI as string;
const dbName = process.env.DB_NAME as string;

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return true;

    try {
        await mongoose.connect(url, {
            dbName: dbName,
        });
        console.log('MongoDB Connected!');
        return true;
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;