const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
     question : {type : String , required: true},
     answer   : {type : String, required: true}
},{timestamps : true});

const FAQ = mongoose.model('faq', faqSchema)
module.exports = FAQ ;
