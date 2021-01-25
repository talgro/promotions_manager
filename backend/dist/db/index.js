"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = "mongodb+srv://talgropper:0546455401@cluster0.uloms.mongodb.net/PromotionsManager?retryWrites=true&w=majority";
const connectMongoDB = async () => {
    await mongoose_1.default.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log("Connected successfully to MongoDB");
};
exports.default = connectMongoDB;
