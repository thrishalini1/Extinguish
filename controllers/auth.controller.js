const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const sqlite3 = require('sqlite3');
// const { run } = require('./forAWS');

const ourKey = 67666;



const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to database SQLite database.');
});






  



function signUp(req,res){
    
        const user = {
            key :req.body.key,
            name: req.body.name,
            age : req.body.age,
            gender: req.body.gender,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            address:req.body.address,
            password:req.body.password,
            vpassword:req.body.vpassword,
            managerId:req.body.managerId,


        }

        if(user.key === ourKey){
            if(user.password === user.vpassword){
                db.run('INSERT INTO auditors (name, age , gender ,email,phoneNumber,address, password, managerId) VALUES (?, ?, ?, ? ,? , ? ,? ,?)', [req.body.name, req.body.age , req.body.gender , req.body.email,req.body.phoneNumber, req.body.address ,req.body.password ], function(err) {
                    if (err) {
                        // console.log(this.lastID);
                      console.error(err);
                      res.status(500).send('Internal Server Error');
                    } 
                    else {
                    //   const auditorId = this.lastID;
                    //   res.status(201).json({ auditorId, name, email, password, location });
                    res.writeHead(200);
                    res.write(JSON.stringify(user));
                    res.end();
                    }
                  });

            }
            else{
                res.status(401).send('Password and verification password did not match')
            }
         }
         else{
            res.status(400).send('The key is not valid')
          
         }

        // models.User.create(user).then(result =>{

        // }).catch();






        
}

module.exports = {
    signUp:signUp
};