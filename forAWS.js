const express = require('express');
const sqlite3 = require('sqlite3');
const json = require('json');
const app = express();
const multer = require('multer')
const path = require('path')
const auth_controller = require('./auth_controller.js')



const storage = multer.diskStorage({
      destination: function(req,file,cb){
        cb(null,'./uploads');
      },
      filename:function(req,file,cb){
        cb(null, new Data().getTime() + path.extname(file.originalname));
      }
});


const fileFilter = (req,file,cb) =>{
  if(mime.fileType === 'image/jpeg'|| mime.fileType === 'image/png'){
    cb(null,true);
  }
  else{
    cb(new Error('Unsupported file type. Send jpeg or png'),false);
  }
}


const upload = multer({
 storage:storage,
 limits:{
  fileSize:1024*1024*10
  // 10MB
 },
})








// Create a new SQLite database connection
const db = new sqlite3.Database(':memory:'); // Use an in-memory database for this example


// const db = new sqlite3.Database('database.db'); 

// Create a table and insert some data (run this only once)
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS auditors (auditorId INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT, age number(3), gender varchar(1),email TEXT,phoneNumber varchar(13),address TEXT,password varchar(50),managerId INTEGER, location JSON , FOREIGN KEY (managerId) REFERENCES managers(managerId) )');
  db.run("INSERT INTO auditors (auditorId , name,age, gender,email,phoneNumber,address,password,managerId,location) VALUES (96789 ,'Thrishalini Dwaraknath',56,'3','trishalini973@gmail.com' ,'9940179755','dubai mall,dubai main road,dubai','123' ,76543, ?)","{\"latitude\": 123.456, \"longitude\": 789.012} ");
  db.run("INSERT INTO auditors (name,age,gender ,email,phoneNumber,address,password,managerId,location) VALUES ('Vansh Agarwal',34,'1', 'vanshAgarwal@gmail.com','9600193145','dubai mall,dubai main road,dubai','456' ,76543, ?  )", "{\"latitude\": 123.456, \"longitude\": 789.012}");
  // vansh
});

// db.serialize(()=>{
// });

// male-1,female-2,non-binary-3,prefer not to say-4



db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS managers (managerId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age number(3),gender varchar(1), email TEXT,phoneNumber varchar(13),address TEXT,password varchar(50))');
  db.run("INSERT INTO managers (managerId , name,age,gender, email,phoneNumber,address,password) VALUES (76543 ,'Tanvi Gupta',68,'2','fluteGupta@kpmCC.in','5675656756','Kuwait Mall,Kuwait Main Road,Kuwait','123' )");
  db.run("INSERT INTO managers (name,age,gender, email,phoneNumber,address,password) VALUES ('Jane Smith',37,'2','janeSmi@kpmCC.in' ,'9677285350','Kuwait Mall,Kuwait Main Road,Kuwait', '456' )");
  // vansh
});


db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS subtasks(subtaskId INTEGER PRIMARY KEY AUTOINCREMENT, stockName VARCHAR(255) , pid INTEGER , batchNo INTEGER , mfgDate DATE , expDate DATE, noOfCases INTEGER, pieces INTEGER, outer INTEGER , taskId INTEGER, FOREIGN KEY (taskId) REFERENCES tasks(taskId))');
  db.run(`INSERT INTO subtasks (subtaskId, stockName, pid, batchNo, mfgDate, expDate, noOfCases, pieces, outer, taskId)
          VALUES (1, 'ABC Stock', 942738, 453867456, '2022-01-01', '2023-01-01', 10, 100, 5, 1)`);
  db.run(`INSERT INTO subtasks (subtaskId, stockName, pid, batchNo, mfgDate, expDate, noOfCases, pieces, outer, taskId)
          VALUES (2, 'DEF Stock', 784729, 978543217, '2022-02-01', '2022-10-01', 111, 110, 9, 1)`);
  db.run(`INSERT INTO subtasks (subtaskId, stockName, pid, batchNo, mfgDate, expDate, noOfCases, pieces, outer, taskId)
          VALUES (3, 'britania', 786729, 65734217, '2017-07-01', '2022-10-01', 566, 78, 9, 2)`);
});




db.serialize(() => {
db.run("CREATE TABLE IF NOT EXISTS tasks (taskId INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT , date DATE , location JSON ,taskStatus NUMBER(4),auditorAssigned INTEGER,managerAssigned INTEGER,startTime TIME,endTime TIME,distributorDetails JSON,companyDetails JSON,FOREIGN KEY (auditorAssigned) REFERENCES auditors(auditorId) ,FOREIGN KEY (managerAssigned) REFERENCES managers(managerId) )");
//   db.run(`INSERT INTO tasks (name, date, location, taskStatus, auditorAssigned, startTime, endTime, distributorDetails, companyDetails) VALUES ('Task 1', '2023-06-10', '{"latitude": 123.456, "longitude": 789.012}', 'S1', 1, '09:00:00', '13:30:00', 'Distributor XYZ', 'Company ABC')`);
//   db.run(`INSERT INTO tasks (name, date, location, taskStatus, auditorAssigned, startTime, endTime, distributorDetails, companyDetails) VALUES ('Task 2', '2023-06-11', '{"latitude": 45.678, "longitude": 90.123}', 'S2', 2, '14:00:00', '16:30:00', 'Distributor PQR', 'Company XYZ'`);
db.run(
    'INSERT INTO tasks (name, date, location, taskStatus, auditorAssigned , managerAssigned, startTime, endTime, distributorDetails, companyDetails) ' +
    'VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, ?)',
    'Take the batches of Calpol and Dolo65',
    '2023-06-10',
    // JSON('{"latitude": 123.456, "longitude": 789.012 }'),
    JSON.stringify({ "latitude": 123.456, "longitude": 789.012 }),
    1,
    96789,
    76543,
    '09:00:00',
    '13:30:00',
    JSON.stringify({
      "distributorName": "GHT Distributors",
      "distributorContact": "9876543210",
      "distributorAddress": "456 Park Avenue, Mumbai City, Country"
    }
    ),
    JSON.stringify({ "companyName": "Kalinga pharma Corporation", "salesOfficerName": "Gayathri", "salesOfficerContact": "34567 82341" }),
    function(err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Row inserted successfully.');
      }
    }
  );
  db.run(
    'INSERT INTO tasks (name, date, location, taskStatus, auditorAssigned,managerAssigned, startTime, endTime, distributorDetails, companyDetails) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?, ?)',
    'Burn the Britania Wafer Covers and dispose',
    '2023-06-11',
    '{"latitude": 45.678, "longitude": 90.123}',
    2,
    96789,
    76544,
    '14:00:00',
    '21:45:00',
    JSON.stringify({"distributorName": "GHT Distributors","distributorContact": "9876543210","distributorAddress": "456 Park Avenue, Mumbai City, Country"}),
    JSON.stringify({"companyName": "Britania","salesOfficerName": "Ragul","salesOfficerContact": "34567 82341"}),
    function(err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Row inserted successfully.');
      }
    }
  );
  db.run(
    'INSERT INTO tasks (name, date, location, taskStatus, auditorAssigned,managerAssigned, startTime, endTime, distributorDetails, companyDetails) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?, ?)',
    'dispose the dolo650 tablets',
    '2021-1-5',
    '{"latitude": 45.678, "longitude": 90.123}',
    2,
    96789,
    76544,
    '5:45:00',
    '19:00:00',
    JSON.stringify({"distributorName": "Aishray Distributors","distributorContact": "9876543210","distributorAddress": "127/93 Pillaiyar Avenue, Chennai City, India"}),
    JSON.stringify({"companyName": "apollo","salesOfficerName": "senthil","salesOfficerContact": "34567 82341"}),
    function(err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Row inserted successfully.');
      }
    }
  );
  // vansh
});



app.get('/login/:email&:password',(req,res)=>{
  const {email,password}  = req.params;


  db.get('SELECT * FROM auditors WHERE email = ?',email,(err,row)=>{
    if(err){
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    else if(row){
      // console.log(res)
      db.get('SELECT * FROM auditors WHERE password = ?',password,(err,row)=>{
        if(err){
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
        else if(row){
          res.json({'exists':true,'who':'A','id':row.auditorId})
        }
        else{
          res.status(400).send('Wrong Password')
        }
      })
      // res.json(row)

    }
    else{
      db.get('SELECT * FROM managers WHERE email = ?',email,(err,row)=>{
        if(err){
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
        else if(row){
          db.get('SELECT * FROM managers WHERE password = ?',password,(err,row)=>{
            if(err){
              console.error(err);
              res.status(500).send('Internal Server Error');
            }
            else if(row){
              res.json({'exists':true,'who':'M','id':row.managerId})
            }
            else{
              res.status(400).send('Wrong Password')
            }
          })
        }
        else{
          res.json({'exists':false})
        }

      })

      
    }


  }) 

})






// Define a GET route to fetch all auditors
app.get('/auditors', (req, res) => {
  db.all('SELECT * FROM auditors', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      for(let i=0;i<rows.length;i++)
      { rows[i].location = JSON.parse(rows[i].location);

      }
      res.json(rows);
    }
  });
});

app.get('/managers', (req, res) => {
  db.all('SELECT * FROM managers', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

// Define a GET route to fetch an individual user by ID
app.get('/auditors/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM auditors WHERE auditorId = ?', id, (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else if (row) {
        row[i].location = JSON.parse(row[i].location);
      
        res.json(row);
      } else {
        res.status(404).send('User not found');
      }
    });
  });

app.get('/managers/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM managers WHERE managerId = ?', id, (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else if (row) {

        


        res.json(row);
      } else {
        res.status(404).send('User not found');
      }
    });
});
  

app.get('/tasks/auditor/:auditorId',(req,res)=>{
  const {auditorId} = req.params;
  db.all('SELECT tasks.* FROM tasks JOIN auditors ON tasks.auditorAssigned = auditors.auditorId WHERE auditors.auditorId = ? ', auditorId,(err,rows)=>{
    if (err){
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
  else{
       for(let i=0;i<rows.length;i++)
         { rows[i].location = JSON.parse(rows[i].location);
          rows[i].distributorDetails = JSON.parse(rows[i].distributorDetails)
          rows[i].companyDetails = JSON.parse(rows[i].companyDetails)
         }
      res.json(rows);
  }
  })

})

app.get('/tasks/manager/:managerId',(req,res)=>{
  const {managerId} = req.params;
  db.all('SELECT tasks.* FROM tasks JOIN managers ON tasks.managerAssigned = managers.managerId WHERE managers.managerId = ? ', managerId,(err,rows)=>{
    if (err){
      
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
  else{
    for(let i=0;i<rows.length;i++)
    { rows[i].location = JSON.parse(rows[i].location);
     rows[i].distributorDetails = JSON.parse(rows[i].distributorDetails)
     rows[i].companyDetails = JSON.parse(rows[i].companyDetails)
    }
      res.json(rows);
  }
  })

})





app.get('/listOftasks',(req,res)=>{
    db.all('SELECT * FROM tasks',(err,rows)=>{
        if (err){
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else{
          for(let i=0;i<rows.length;i++)
          { rows[i].location = JSON.parse(rows[i].location);
           rows[i].distributorDetails = JSON.parse(rows[i].distributorDetails)
           rows[i].companyDetails = JSON.parse(rows[i].companyDetails)
          }
            res.json(rows);
            

        }
    });
})




app.get('/myAuditors/:managerId', (req, res) => {
  const { managerId } = req.params;

  db.all('SELECT * FROM auditors WHERE managerId = ?', managerId, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      for(let i=0;i<rows.length;i++)
      { rows[i].location = JSON.parse(rows[i].location);

      }
      res.json(rows);
    }
  });
});




app.get('/listOfTasks/:id',(req,res)=>{
  const { id }= req.params;
  // console.log(req.params)
  db.get('SELECT * FROM tasks WHERE taskId = ?',id,(err,row)=>{
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (row) {
        row[i].location = JSON.parse(row[i].location);
       row[i].distributorDetails = JSON.parse(row[i].distributorDetails)
       row[i].companyDetails = JSON.parse(row[i].companyDetails)
      
      res.json(row);
    } else {
      res.status(404).send('Task not found');
    }
  })

})


app.get('/listOfTasks/subTasks/:id',(req,res)=>{
  const {id} = req.params;
  db.all('SELECT subTasks.* FROM subtasks JOIN tasks ON subtasks.taskId = tasks.taskId WHERE tasks.taskId = ?  ' , id , (err,rows)=>{
    if (err){
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  else{
    
      res.json(rows);
  }
  })

})
app.use(express.json())

// app.post('/auditors',(req,res)=>{
//   const {name,email} = req.body;
//   db.run(
//     'INSERT INTO auditors (id, name, email) VALUES (?, ?)',
//     [name , email],(err,result)=>{
//     if(err)
//           {
//          console.error('Error inserting user:', err);
//          res.status(500).json({ error: 'Failed to create user' });
//          return;
//       }
//       console.log('User created successfully');
//       const responseData = {
//         message: 'User created successfully',
//         user: {
//           name,
//           email,
//         },
//       };
//       res.json(responseData);
//   }

// );
// });

// Define a POST route to create a new auditor
// app.post('/auditors', (req, res) => {
//   const { name, email, password, location } = req.body;


//   db.run('INSERT INTO auditors (name, email, password, location) VALUES (?, ?, ?, ?)', [name, email, password, location], function(err) {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       const auditorId = this.lastID;
//       res.status(201).json({ auditorId, name, email, password, location });
//     }
//   });
// });


app.post('/auditors',auth_controller.signUp);

// Define a POST route to create a new task
app.post('/tasks', (req, res) => {
  const {
    name,
    date,
    location,
    taskStatus,
    auditorAssigned,
    managerAssigned,
    startTime,
    endTime,
    distributorDetails,
    companyDetails
  } = req.body;

  db.run(
    'INSERT INTO tasks (name, date, location, taskStatus, managerAssigned, startTime, endTime, distributorDetails, companyDetails) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      name,
      date,
      JSON.stringify(location),
      taskStatus,
      managerAssigned,
      startTime,
      endTime,
      distributorDetails,
      companyDetails
    ],
    function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        const taskId = this.lastID;
        res.status(201).json({ taskId, name, date, location, taskStatus, auditorAssigned, managerAssigned, startTime, endTime, distributorDetails, companyDetails });
      }
    }
  );
});

// Define a PUT route to update the auditorAssigned field of a task
app.post('/tasks/auditor/:taskId/', (req, res) => {
  const { taskId } = req.params;
  const { auditorAssigned } = req.body;

  db.run(
    'UPDATE tasks SET auditorAssigned = ? WHERE taskId = ?',
    [auditorAssigned, taskId],
    function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else if (this.changes === 0) {
        res.status(404).send('Task not found');
      } else {
        res.status(200).send('Task updated successfully');
      }
    }
  );
});






// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listeningg on port ${port}`);                                                                                                 
});

module.exports = {
  run:db.run
} ;

