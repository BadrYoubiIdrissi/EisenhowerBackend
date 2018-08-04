function errorHandler(err,req,res,next){
    if(err.isBoom) {
        if(err.isServer){
            return console.log(err.output.payload);
        }else{
            return res.status(err.output.statusCode).json(err.output.payload);
        }
    }
    res.status(500).json(err);
}

module.exports = errorHandler;