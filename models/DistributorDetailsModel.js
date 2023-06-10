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

module.exports = DistributorDetails;
