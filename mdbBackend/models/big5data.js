const mongoose = require('mongoose');

const big5DataSchema = new mongoose.Schema({
  userId:String,  
  openness: Number,
  consientiousness:Number,
  extraversion:Number,
  agreeableness:Number,
  neuroticism:Number
});

const Big5Data = mongoose.model('Big5Data', big5DataSchema);
module.exports=Big5Data;