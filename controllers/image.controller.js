
const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');


const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
      return;
    }
    console.log('Connected to database SQLite database.');
  });


  const profilePicData = fs.readFileSync('/Users/thrisha/Desktop/backup/Extinguish_backend/Extinguish/uploads/recent.jpg');


function upload(req,res){
    if(req.file.filename){

        db.run('UPDATE auditors SET profile_pic = ? WHERE auditorId = ?',
            [profilePicData, req.body.Id],(err,row)=>{
            if(err){
                console.log(err);
            }
            else if (row){
                console.log(row);
            }
            else{

                db.run('UPDATE managers SET profile_pic = ? WHERE managerId = ?',
        [profilePicData, req.body.Id])
            }
        });
        res.status(201).json({
            message :"Image uploaded successfully",
            url: req.file.filename
        });
    }
    else{
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}


module.exports = {
    upload : upload
}