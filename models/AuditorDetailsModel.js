
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
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
      },
    required: [true, 'User phone number required'],
    trim : true
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



const auditorData = [
  {
    profilePic: '/path/to/profilepic1.jpg',
    empID: 'EMP001',
    name: 'John Doe',
    phoneNumber: '1234567890',
    email: 'john.doe@example.com',
    location: { lat: 37.7749, long: -122.4194 },
    assignedTasks: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ]
  },
  {
    profilePic: '/path/to/profilepic2.jpg',
    empID: 'EMP002',
    name: 'Jane Smith',
    phoneNumber: '9876543210',
    email: 'jane.smith@example.com',
    location: { lat: 40.7128, long: -74.0060 },
    assignedTasks: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ]
  }
];

// CompanyDetails.deleteMany({
//   salesOfficerContact: "34567 82341"
// }).then((result)=>{
// console.log(result);

// });

AuditorDetails.insertMany(auditorData)
  .then((result) => {
    console.log(result);
    console.log("Documents inserted successfully");
  })
  .catch((error) => {
    console.log("Unable to insert documents", error);
  });


module.exports = AuditorDetails;
