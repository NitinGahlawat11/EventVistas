var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware/index.js");


router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){   // tp select data from a collection in mongodb we use find
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds});
       }
    });
});

router.post("/",middleware.isLoggedIn, function(req, res){
var name = req.body.name;  // getting the details of files mentioned by us in form
var image = req.body.image;
var price = req.body.price;
var desc= req.body.description;
var author = {
        id: req.user._id,
        username: req.user.username
    }
var newCampground = {name: name,price:price, image: image,description:desc,author:author}
Campground.create(newCampground,function(err,newlyCreated){  // create a new campground
    if(err){
        console.log(err);
    }
    else{
      
    }
    res.redirect("campgrounds/campgrounds");           // after new campground has added , redirect to camogrounds pafe
});

});

//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// edit campground
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

        
    
 // update 
 router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
     Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
         if(err){
             res.redirect("/campgrounds");
         }
         else{
             res.redirect("/campgrounds/" + req.params.id);
         }
     });
 });
 
 // Removing a campground
 router.delete("/:id",function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
 });
    
    
   
    

module.exports = router;




