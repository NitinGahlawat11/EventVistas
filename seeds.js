var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var data =[
    {
        name :"oceanic blue",
        image:"https://farm3.staticflickr.com/2939/14374484314_0761767341.jpg",
        description: "nice view"
    },
        {
        name :"Dazzling blue",
        image:"https://farm1.staticflickr.com/216/512562593_33dcb600f2.jpg",
        description: "nice view"
    },
        {
        name :"Mystic blue",
        image:"https://farm4.staticflickr.com/3170/2564771681_dc78210524.jpg",
        description: "nice view"
    }
    
    
    ];


function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        }); 
    }); 
    //add a few comments
} 

module.exports = seedDB;
