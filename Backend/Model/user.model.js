let mongoose= require("mongoose");
mongoose.Promise= global.Promise;

let userSchema= mongoose.Schema({
   userName:String,
   pass:String,
   fname:String,
   lname:String,
   email:String,
   addr:String,
   dob:Date,
   fund:Number,
   ticket:Boolean,
   loginAttempt:Number,
   phoneNum:String
});

let UserModel= mongoose.model(" ",userSchema, "usersTable");

module.exports= UserModel;

