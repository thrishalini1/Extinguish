const express = require('express');
const sqlite3 = require('sqlite3');
const json = require('json');
const app = express();



// Create a new SQLite database connection
// const db = new sqlite3.Database(':memory:'); 


const db = new sqlite3.Database('database.db'); 

// Create a table and insert some data (run this only once)
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS auditors (auditorId INTEGER PRIMARY KEY AUTOINCREMENT ,profile_pic BLOB NULL, name TEXT, age number(3), gender varchar(1),email TEXT,phoneNumber varchar(13),address TEXT,password varchar(50),managerId INTEGER, location JSON , FOREIGN KEY (managerId) REFERENCES managers(managerId) )');
  db.run("INSERT INTO auditors (auditorId , name,age, gender,email,phoneNumber,address,password,managerId,location) VALUES (96789 ,'Thrishalini Dwaraknath',56,'3','trishalini973@gmail.com' ,'9940179755','dubai mall,dubai main road,dubai','123' ,76543, ?)","{\"latitude\": 123.456, \"longitude\": 789.012} ");
  db.run("INSERT INTO auditors (name,age,gender ,email,phoneNumber,address,password,managerId,location) VALUES ('Vansh Agarwal',34,'1', 'vanshAgarwal@gmail.com','9600193145','dubai mall,dubai main road,dubai','456' ,76543, ?  )", "{\"latitude\": 123.456, \"longitude\": 789.012}");
  // vansh
});

// db.serialize(()=>{
// });

// male-1,female-2,non-binary-3,prefer not to say-4



db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS managers (managerId INTEGER PRIMARY KEY AUTOINCREMENT,profile_pic BLOB NULL, name TEXT, age number(3),gender varchar(1), email TEXT,phoneNumber varchar(13),address TEXT,password varchar(50))');
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
    0,
    0,
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
    1,
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

// 0 - unassigned , 1 - in progress , 3 - completed 

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




db.serialize(()=>{
  db.run("CREATE TABLE IF NOT EXISTS documents (documentId INTEGER Primary Key, taskID INTEGER NULL,FOREIGN KEY (taskId) REFERENCES tasks(taskId) )");
  db.run("CREATE TABLE IF NOT EXISTS location_list (taskId INTEGER ,time TIME , date DATE , location JSON  )");
});