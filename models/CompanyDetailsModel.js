// const mongoose = require("mongoose");


// const companyDetailsSchema = new mongoose.Schema({
//   companyName: {
//     type: String,

//   },
//   salesOfficerName: {
//     type: String,

//   },
//   salesOfficerContact: {
//     type: String,
 
//   }
// });

// const CompanyDetails = mongoose.model('CompanyDetails', companyDetailsSchema);

// const CompanyData = new CompanyDetails(
//     [
//         {
//             companyName:"Tata",
//             salesOfficerName:"Gayathri",
//             salesOfficerContact:"34567 82341"
//         },
//         {
//             companyName:"Britania",
//             salesOfficerName:"Ragul",
//             salesOfficerContact:"34567 82341"
//         }
//     ]
    
    
// )


// CompanyDetails.insertMany(CompanyData).then((result,error)=>{
//     if(error){
//         console.log("Unable to insert to Model",error)
//     }
//     else{
//         console.log(result)
//     console.log("Users Added Successfully")
//     }
// }
// )

// // CompanyData.save();
// module.exports = CompanyDetails;


// import mongoose from "mongoose";
const mongoose = require("mongoose");

const companyDetailsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  salesOfficerName: {
    type: String,
    required: true,
  },
  salesOfficerContact: {
    type: String,
    required: true,
  },
});

const CompanyDetails = mongoose.model("CompanyDetails", companyDetailsSchema);

const companyData = [
  {
    companyName: "Tata",
    salesOfficerName: "Gayathri",
    salesOfficerContact: "34567 82341",
  },
  {
    companyName: "Britania",
    salesOfficerName: "Ragul",
    salesOfficerContact: "34567 82341",
  },
];

// CompanyDetails.deleteMany({
//   salesOfficerContact: "34567 82341"
// }).then((result)=>{
// console.log(result);

// });

CompanyDetails.insertMany(companyData)
  .then((result) => {
    console.log(result);
    console.log("Documents inserted successfully");
  })
  .catch((error) => {
    console.log("Unable to insert documents", error);
  });

module.exports = { CompanyDetails} ; 
