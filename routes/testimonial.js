var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var env = require('dotenv').config();

var pass = process.env.PASS_DB;

mongoose.connect(pass, {
    useNewUrlParser:true
})

const TesmonialsSchema = new mongoose.Schema({
    name:String,
    comment:String
  }
  ,{
    colllection:"TestimonialCollection"
  });
  
  const testmonial = mongoose.model("TestimonialCollection", TesmonialsSchema);

  router.post("/", (req, res, next) => {
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

router.get("/", async(req, res, next) => {
    try{
        await testmonial.find({}).then(data => {
            res.send({status:"ok",data:data})
        })
    } catch(err){
        res.send({status:"Error",data:err});
    }
})


module.exports = router;