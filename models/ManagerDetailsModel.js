const mongoose = require('mongoose');
// import mongoose from 'mongoose';




const managerSchema = new mongoose.Schema({
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
  taskList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks'
  }],
  auditorList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuditorDetails'
  }]
});


const ManagerDetails = mongoose.model('ManagerDetails', managerSchema);



module.exports = { ManagerDetails};