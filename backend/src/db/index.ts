import mongoose from "mongoose"

const mongoUri = "mongodb+srv://talgropper:0546455401@cluster0.uloms.mongodb.net/PromotionsManager?retryWrites=true&w=majority";

const connectMongoDB = async () => {
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log("Connected successfully to MongoDB");
};

export default connectMongoDB;