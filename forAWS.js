const express = require('express');
const sqlite3 = require('sqlite3');
const json = require('json');
const app = express();

const path = require('path')
const auth_controller = require('./controllers/auth.controller.js')
const imagesRoute = require('./routes/images.js')

// Create a new SQLite database connection
// const db = new sqlite3.Database(':memory:'); 



const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to database SQLite database.');
});





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
        row.location = JSON.parse(row.location);
      
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
app.post('/managers',auth_controller.signUp);
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


app.post('/listOfTasks/subTasks/:taskId', (req, res) => {
  const {taskId } = req.params;
  const { subtaskId, stockName, pid, batchNo, mfgDate, expDate, noOfCases, pieces, outer } = req.body;


  db.run(
    'INSERT INTO subtasks (subtaskId, stockName, pid, batchNo, mfgDate, expDate, noOfCases, pieces, outer, taskId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [subtaskId, stockName, pid, batchNo, mfgDate, expDate, noOfCases, pieces, outer, taskId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(201).send('Subtask created successfully');
      }
    }
  );
});




app.use("/image/",imagesRoute);


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listeningg on port ${port}`);                                                                                                 
});


