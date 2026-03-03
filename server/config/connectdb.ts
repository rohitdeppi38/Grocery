import mongoose from 'mongoose';

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/grocery")
        .then(()=>{
            console.log("Connected to MongoDB");
        });
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDb;