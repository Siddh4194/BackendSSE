////////// packages -----------------------------------------------
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const env = require('dotenv').config();
// const cors = require('cors');

// set up the cors for the ss events
// app.use(cors({
//     origin:['https://shri-swami-samartha.vercel.app'],
//     methods:['GET', 'POST'],
//     credentials:true
//   }));


// mongoose connection is checked first
var pass = process.env.PASS_DB;

mongoose.connect(pass,{
    useNewUrlParser:true
})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


// App setup
const app = express();
app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

// Save the contact forms


const contactEvent = new mongoose.Schema({
    name:String,
    number:Number,
    event:String,
    place:String
  });
  
  // /bad responce
  const Contact = mongoose.model("ContactsEventWebSite", contactEvent);

app.get("/contact", function(req, res, next) {
    // res.send("you are doing right job")
    res.send({message:"success"});
    })
app.post("/contact", function(req, res, next) {
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




app.get('/',(req,res)=>{
    res.send("you are damn monster!");
});


app.listen(process.env.PORT || 500 , function() {
    console.log("Server started on port 3000");
});
