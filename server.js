const { mongoose } = require("mongoose");

// import mongoose from "mongoose";


const CompanyDetails = require("./models/CompanyDetailsModel");

const connectToMongo = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/Extinguish_Backend",{ 
    useNewUrlParser: true});
    console.log("Connected to MongoDB");

  };
  
 console.log(CompanyDetails)
  connectToMongo()