// struct Task {
//     var taskID : String
//     var name : String
//     var date : Date
//     var location : String
//     var taskStatus : Status
//     var auditorAssigned : Auditor?
//     var startTime : String
//     var endTime : String
//     var distributorDetails : DistributorDetails
//     var companyDetails : CompanyDetails
//     var subtask : [Subtask]?
//     var proof : [String]?
    
    
// }

// enum Status {
//     case completed
//     case inProgress
//     case unassigned
// }


const mongoose = require("mongoose");

// const connectToMongo = async () => {
//     await mongoose.connect("mongodb://127.0.0.1:27017/Extinguish_backend",{ 
//     useNewUrlParser: true});
//     console.log("Connected to MongoDB");

//   };
  
// connectToMongo()

const Status = {
    C:"completed",
    P:"in Progress",
    U:"un Assigned",
}

const TasksSchema = new mongoose.Schema ({

    taskID:String,
    name : String,
    date: Date,
    location: {
        type: Map,
        of: String
    },
    taskStatus : {
        type: String,
        enum : Object.values(Status)
    },
    auditorAssigned:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AuditorDetails',
    },
    startTime : Date,
    endTime : Date,
    distributerDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DistributerDetails'
    },
    companyDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CompanyDetails'
    },
    subTasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubTask'   
    }],
    proofs:[{
        type: String,
        required: true

    }]
       
        
}
)

const Tasks = mongoose.model('Tasks',TasksSchema)

module.exports = Tasks;