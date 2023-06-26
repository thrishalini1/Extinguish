const mongoose = require("mongoose");


const distributorDetailsSchema = new mongoose.Schema({
  distributorName: {
    type: String,
    required: true
  },
  distributorContact: {
    type: String,
    required: true
  },
  distributorAddress: {
    type: String,
    required: true
  }
});


const DistributorDetails = mongoose.model('DistributorDetails', distributorDetailsSchema);

const distributorDetailsData = [
  {
    distributorName: 'ABC Distributors',
    distributorContact: '1234567890',
    distributorAddress: '123 Main Street, Delhi City, Country'
  },
  {
    distributorName: 'XYZ Distributors',
    distributorContact: '9876543210',
    distributorAddress: '456 Park Avenue, Mumbai City, Country'
  }
];


module.exports = DistributorDetails;
