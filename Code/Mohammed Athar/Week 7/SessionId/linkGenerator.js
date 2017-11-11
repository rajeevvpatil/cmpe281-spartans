var http = require('http');
var url = require("url");

var localIP = "127.0.0.1";
var port = 4000;

var server = http.createServer(function (req, res) {

 
    console.log("request on " + req.url);

   
    
    var urlObj = url.parse(req.url, true);

    
    for(q in urlObj['query']) {
            console.log( q + " = " + urlObj['query'][q]);
    }
    
    
    if (urlObj['query']['thename'] != undefined) {
        
        console.log("updating 'defaultName' variable to " + urlObj['query']['thename']);
        
        defaultName = urlObj['query']['thename'];
    }
    
    
    res.writeHead(200, {'Content-Type': 'text/html'});

   
    res.write('<html>\n<body>\n');
    res.write('<h1>Hello ' + defaultName + '<h1>\n');
    res.write('<form method="GET">\n<input type="text" placeholder="type a name" name="thename">\n<input type="submit" value="submit new name">\n</form>\n');
    res.write('</body>\n</html>');
    
    
    res.end();
    
});

server.listen(port, localIP);

console.log('Server running at http://'+ localIP +':'+ port +'/');
