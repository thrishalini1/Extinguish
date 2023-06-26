const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const {AuditorDetails,auditorData }= require('./auditorDetails');


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

const managerData = [
  {
    profilePic: '/path/to/profilepic1.jpg',
    empID: 'EMP001',
    name: 'John Doe',
    phoneNumber: '1234567890',
    email: 'john.doe@example.com',
    taskList: [
      mongoose.Types.ObjectId(), 
      mongoose.Types.ObjectId() 
    ],
    auditorList: [
      mongoose.Types.ObjectId(),
      mongoose.Types.ObjectId() 
    ]
  },
  {
    profilePic: '/path/to/profilepic2.jpg',
    empID: 'EMP002',
    name: 'Jane Smith',
    phoneNumber: '9876543210',
    email: 'jane.smith@example.com',
    taskList: [
      mongoose.Types.ObjectId(), 
      mongoose.Types.ObjectId() 
    ],
    auditorList: [
      mongoose.Types.ObjectId(), 
      mongoose.Types.ObjectId()
    ]
  }
];


const ManagerDetails = mongoose.model('ManagerDetails', managerSchema);



module.exports = { ManagerDetails};