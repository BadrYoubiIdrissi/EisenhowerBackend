var passport = require("passport");
var session = require("cookie-session");
var User = require("../../models/user");
var Boom = require("boom");

function userRoutes(router){

    configPassport(router)

    router.get("/user", function(req, res){
        if(req.user){
            res.json({user : req.user.username});
        }
        else{
            res.json({user : ""});
        }
    })
    
    router.post("/register", function (req,res, next){
        User.register(
        new User({username: req.body.username}),
        req.body.password, 
        err => err ? next(err) : res.send("User registered!"));
    });
    
    router.post("/login", function(req, res, next) {
        passport.authenticate("local", function(err, usr, info){
            if(err) { return next(err) };
            if(!usr) { 
                return next(info);   
            }else{
                req.login(usr, err => {
                    err ? next(err) : res.send("User logged in.");
                });
            }
        })(req,res,next);
    });
    
    router.get("/logout", function(req,res) {
        req.logout();
        res.send("User logged out");
    });
}

function configPassport(router){
    router.use(session({ keys: ["TEMP_SECRET_DO_NOT_COMMIT"],maxAge:604800000}));
    router.use(passport.initialize());
    router.use(passport.session());
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}

module.exports = userRoutes;

