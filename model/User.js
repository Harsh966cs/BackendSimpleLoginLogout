const { default: mongoose, Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
      username:{
        type:String,
        require:true,
        lowercase:true
      },
      password:{
        type:String,
        require:true
      }
})

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);
