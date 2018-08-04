var Boom = require("boom");

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        next(Boom.forbidden("You are not logged in"));
    }
}

function isAdmin(req,res,next){
    if(req.isAuthenticated() && req.user.username ==="admin"){
        next()
    }
    else{
        next(Boom.forbidden("You are not admin"));
    }
}

module.exports = {isAuthenticated, isAdmin};