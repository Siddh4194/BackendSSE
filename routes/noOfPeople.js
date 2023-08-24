var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var env = require('dotenv').config();

var pass = process.env.PASS_DB;

mongoose.connect(pass, {
    useNewUrlParser:true
})

const db = mongoose.connection;

db.on('error',console.error.bind(console,"connection error"));
db.once('open',()=>{
  console.log("MongoDb Connected Successfully");
})

const People = new mongoose.Schema({
    no:Number,
    date:Date
  }
  ,{
    colllection:"PeopleCollectionEvent"
  });
  
  const count = mongoose.model("PeopleCollectionEvent", People);

  router.post("/", (req, res, next) => {
    try{
        const one = new count({
            no:req.body.no,
            date:req.body.date
        })
        one.save();
        res.send({data:"stored"})
    } catch(err){
        res.send({status:"Error",data:err});
    }
})



module.exports = router;