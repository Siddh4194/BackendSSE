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
app.use(cors({
  origin:['https://shri-swami-samartha.vercel.app'],
  methods:['GET', 'POST','PUT'],
  credentials:true
}));

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


// people interactionwith the web
const People = new mongoose.Schema({
    no:Number,
    date:String
  }
  ,{
    colllection:"PeopleCollectionEvent"
  });
  
  const count = mongoose.model("PeopleCollectionEvent", People);
app.get("/addOne", (req, res, next) => {
        count.find({})
        .then(data => res.send(data))
        .catch(error => res.send(error))
    // count.findOneAndUpdate(
    //     {date : new Date()},
    //     {$inc:{no : 1}},
    //     {new:true , upsert:true}
    //     )
    //   .catch(error => console.error("Error : ",error))
    // )
})
  app.put("/addOne", (req, res, next) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    count.findOneAndUpdate(
        { date: formattedDate },
        { $inc: { no: 1 } },
        { new: true, upsert: true }
    )
    .then(updatedCount => {
        res.send({ status: "Success", updatedCount });
    })
    .catch(error => {
        console.error("Error: ", error);
        res.status(500).send({ status: "Error", message: error.message });
    });
});


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
