var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var env = require('dotenv').config();

var pass = process.env.PASS_DB;

mongoose.connect(pass, {
    useNewUrlParser:true
})

const ImageGallery = new mongoose.Schema({
    Image:String
  }
  ,{
    colllection:"GalleryCollection"
  });
  
  const Image = mongoose.model("GalleryCollection", ImageGallery);

router.get("/", async(req, res, next) => {
    try{
        await Image.find({}).then(data => {
            res.send({status:"ok",data:data})
        })
    } catch(err){
        res.send({status:"Error",data:err});
    }
})
router.post("/", async(req, res, next)=>{
      // res.send("you are doing right job")
      try{
        await Image.create({Image:req.body.image})
        res.send({status:"ok"})
      } catch(err){
        res.send({status:"Error",data:err});
      }
})

module.exports = router;