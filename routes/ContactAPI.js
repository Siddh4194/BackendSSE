var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var env = require('dotenv').config();

var pass = process.env.PASS_DB;

mongoose.connect(pass, {
    useNewUrlParser:true
})

const contactEvent = new mongoose.Schema({
    name:String,
    number:Number,
    event:String,
    place:String
  });
  
  // /bad responce
  const Contact = mongoose.model("ContactsEventWebSite", contactEvent);

router.get("/", function(req, res, next) {
    // res.send("you are doing right job")
    res.send({message:"success"});
    })
router.post("/", function(req, res, next) {
      // res.send("you are doing right job")
      const contact = new Contact({
        name:req.body.name,
        number:req.body.number,
        event:req.body.event,
        place:req.body.place
      });
      contact.save();
      res.send(req.body);
})

module.exports = router;