

const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  
  name : {type : String, required : true},

  email: {type : String , required  : true , unique : true},
  
  password : {type : String , require : true},

  role : {type : String , enum : ['admin','user'] , default : 'user'},

  cart : {type: mongoose.Schema.Types.ObjectId,ref : 'Cart'}

},{ timestamps:true })

module.exports = mongoose.model('User' , userSchema)