const mongoose = require("mongoose");


// struct Auditor{
    
//     var profilePic : String
//     var empID : String
//     var name : String
//     var phoneNumber : String
//     var email: String
//     var location : String
//     var assignedTasks : [Task]?
    
// }


const mongoose = require('mongoose');

const auditorSchema = new mongoose.Schema({
  profilePic: {
    type: String,
    required: true
  },
  empID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  location: {
    type: Map,
    required: true
  },
  assignedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks'
  }]
});

const AuditorDetails = mongoose.model('AuditorDetails', auditorSchema);

module.exports = AuditorDetails;
