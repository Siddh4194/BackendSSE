////////// packages -----------------------------------------------
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const env = require('dotenv').config();
const cors = require('cors');
// var ContactRouter = require('./routes/ContactAPI');
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
  
app.use(express.json());//we can assign the limits
app.use(bodyparser.urlencoded({extended:true}));


// set up the cors for the ss events
// app.use(cors({
//   origin:['https://shri-swami-samartha.vercel.app'],
//   methods:['GET', 'POST'],
//   credentials:true
// }));

// Save the contact forms

// contact form mongodb
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

const contactEvent = new mongoose.Schema({
    name:String,
    number:Number,
    event:String,
    place:String
  });


// people interactionwith the web
const People = new mongoose.Schema({
    no:Number,
    date:Date
  }
  ,{
    colllection:"PeopleCollectionEvent"
  });
  
  const count = mongoose.model("PeopleCollectionEvent", People);

  app.post("/addOne", (req, res, next) => {
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

//testimonials are imported
const TesmonialsSchema = new mongoose.Schema({
    name:String,
    comment:String
  }
  ,{
    colllection:"TestimonialCollection"
  });
  
  const testmonial = mongoose.model("TestimonialCollection", TesmonialsSchema);

  app.post("/testfetch", (req, res, next) => {
    try{
        const comm = new testmonial({
            name:req.body.name,
            comment:req.body.comment
        })
        comm.save();
        res.send({data:"stored"})
    } catch(err){
        res.send({status:"Error",data:err});
    }
})

app.get("/testfetch", async(req, res, next) => {
    try{
        await testmonial.find({}).then(data => {
            res.send({status:"ok",data:data})
        })
    } catch(err){
        res.send({status:"Error",data:err});
    }
})



app.get('/',(req,res)=>{
    res.send("you are damn monster!");
});


app.listen(process.env.PORT || 500 , function() {
    console.log("Server started on port 500");
});
