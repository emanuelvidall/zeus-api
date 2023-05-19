import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
    const url = `mongodb+srv://emanuelvidal:${process.env.DB_PASSWORD}@zeusdb.pte5jht.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(url, {useNewUrlParser: true});

    console.log("Connecting to database...");
    try {
      const db = await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
  
export default connectDB;