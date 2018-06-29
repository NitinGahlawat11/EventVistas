var Campground =require("../models/campgrounds.js");
var Comment = require("../models/comment.js");

var middlewareObj ={};

middlewareObj.checkCampgroundOwnership =function(req,res,next){
     if(req.isAuthenticated()){
      Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            req.flash("error","Campground Not Found");
            res.redirect("back");
        }
        else{
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            }
            else{
          
    req.flash("error","You Do Not Have permission to do so");
                res.redirect("back");
            }
            
            }
      });
            }else{
                req.flash("error","You need to be logged in");
              res.redirect("back");
            }
            
    
    
        
}

middlewareObj.checkCommentOwnership= function(req,res,next){
     if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }
            else{
                req.flash("error","You Do not have Permission");
                res.redirect("back");
            }
            
            }
      });
            }else{
                req.flash("error","You need to be logged in");
              res.redirect("back");
            }
            
    
    
        
};

middlewareObj.isLoggedIn =function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please log in First !!");
    res.redirect("/login");
};

module.exports=middlewareObj;