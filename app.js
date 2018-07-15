http = require("http");

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end("Hello Julie ! <3");
}).listen(1337);