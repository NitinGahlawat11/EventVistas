var express= require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser= require("body-parser");
var passport= require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User= require("./models/user");
var campgroundRoutes = require("./routes/campground");
var commentsRoutes = require("./routes/comments");
var authRoutes = require("./routes/auth");
var methodOverride= require("method-override");
var flash = require("connect-flash");
// seedDB(); seed the daatabase

app.use(bodyParser.urlencoded({encoded:true}));
//mongoose.connect("mongodb://localhost/yelp_camp")   we have used two databases, if we want to make changes use local version otherwise use below global version
mongoose.connect("mongodb://nitingahlawat007:eyeofthetiger7@ds133127.mlab.com:33127/myapp");// to connect mongoose to our database

app.use(express.static(__dirname +"/public")); // to connect css
app.set("view engine","ejs");  // to set by default loading of files to ejs
app.use(methodOverride("_method"));
app.use(flash());

 // Passport configuration

app.use(require("express-session")({
    secret:"nitin is my name",
    resave:false,
     saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());





passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error =req.flash("error");
   res.locals.success =req.flash("success");
   next();
});
app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("yelp camp is connected"); 
});