const express = require('express');
const sqlite3 = require('sqlite3');
const json = require('json');
const app = express();
var cors = require('cors');
const path = require('path')
const auth_controller = require('./controllers/auth.controller.js')
const imagesRoute = require('./routes/images.js')

// Create a new SQLite database connection
// const db = new sqlite3.Database(':memory:'); 




app.use(cors());


const ImageKit = require('imagekit');
const imagekit = new ImageKit({ 
  publicKey : "public_kihjdWkJcQHMmeUpP2E4FU/Og2Q=",
  privateKey : "private_/sskfnb5JRWagUEfKNiLhz5J9Uo=",
  urlEndpoint : "https://ik.imagekit.io/uxv7hoiuz"
})


app.get("/auth", function (req, res) {
  var signature = imagekit.getAuthenticationParameters();
  res.status(200);
  res.send(signature);
});


const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to database SQLite database.');
});

app.get('/proofs',(req,res)=>{
  db.all('SELECT * FROM proofs',(err,rows)=>{
    if(err){
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      res.json(rows)
    }
  })
})

app.get('/proofs/:auditorId/',(req,res)=>{
  const {auditorId } = req.params;
  db.all('SELECT * FROM proofs WHERE auditorId = ?',[auditorId],(err,rows)=>{
    if(err){
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      res.json(rows)
    }
  })
})

app.get('/proofs/:auditorId/:url',(req,res)=>{
  const {auditorId ,url} = req.params;
  console.log(url)
  db.run(
    'INSERT INTO proofs(url, auditorId) VALUES(?,?)',
    [ url,auditorId],
    (err,row) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(row)
        res.status(200).send('proofs created successfully');
      }
    }
  )
})

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

app.get('tasks/:taskId/completed',(req,res)=>{
  const {taskId} = req.taskId;
  db.run(
    'UPDATE tasks SET taskStatus = ? WHERE taskId = ?',
    [2,taskId],
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
})

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
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
    function(err,row) {
      if (err) {
        console.error(err.message);
        console.log(row)
        res.status(500).send('Internal Server Error');
      } else {

        const taskId = this.lastID;
        res.status(200).json({ taskId, name, date, location, taskStatus, auditorAssigned, managerAssigned, startTime, endTime, distributorDetails, companyDetails });
      }
    }
  );
});

// a route to update the auditorAssigned field of a task
app.post('/tasks/auditor/:taskId/', (req, res) => {
  const { taskId } = req.params;
  const { auditorAssigned } = req.body;

  db.run(
    'UPDATE tasks SET auditorAssigned = ? , taskStatus = ? WHERE taskId = ?',
    [auditorAssigned,1,taskId],
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
  const { stockName, pid, batchNo, mfgDate, expDate, noOfCases, pieces, outer } = req.body;

  db.run(
    'INSERT INTO subtasks ( stockName, pid, batchNo, mfgDate, expDate, noOfCases, pieces, outer, taskId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [ stockName, pid, batchNo, mfgDate, expDate, noOfCases, pieces, outer, taskId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Subtask created successfully');
      }
    }
  );
});


function gh(auditorId) {
  return new Promise((resolve, reject) => {
    db.all('SELECT COUNT(*) AS len FROM tasks WHERE auditorAssigned=? AND taskStatus = 1', auditorId, (err, rama) => {
      if (err) {
        reject(err);
      } else {
        // console.log(rama[0]);
        resolve(rama[0].len);
      }
    });
  });
}
  
  

app.get('/myAuditors/:managerId/:taskId', (req, res) => {
  const { managerId ,taskId} = req.params;

  db.all('SELECT location FROM tasks WHERE taskId = ? ',taskId, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      
      row[0].location = JSON.parse(row[0].location);

      db.all('SELECT * FROM auditors WHERE managerId = ?',managerId , (err,rowsa)=>{

      let len =0
      for(let i=0;i<rowsa.length;i++)
      { 
         gh(rowsa[i].auditorId).then(result => {
          // console.log(result); 
          len = result
          }).catch(error => {
          console.error(error);
        });
        // console.log(len)
        rowsa[i].location = JSON.parse(rowsa[i].location);
        rowsa[i]['relativeDistance']= Math.sqrt((rowsa[i].location.latitude - row[0].location.latitude)**2 + (rowsa[i].location.longitude - row[0].location.longitude)**2)
        rowsa[i]['workLoad'] = len
        // console.log(len)
      
      }

 
      rowsa.sort((a,b)=>{
        return (a.relativeDistance - b.relativeDistance) 
      });


        res.json(rowsa);
      });
      
      
      
    }
  });
});

app.post('/task')


app.use("/image/",imagesRoute);


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listeningg on port ${port}`);                                                                                                 
});


