var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({  // initalising a new database  using mongoose
    name: String,
    image: String,
    price:String,
    description: String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"  // schema we are refeering
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }]
});
var Campground=mongoose.model("Campground",campgroundSchema);   // adding mongose model
module.exports= Campground;