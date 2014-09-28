var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
//var home = process.cwd();
var home = '/home/root/harmony';

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(home, 'clients', uri);

  var test_name = '';
  if(uri=='/fpc.html')    test_name = 'fpc_server.js';
  if(uri=='/b2f.html')    test_name = 'b2f_server.js';
  if(uri=='/fcount.html') test_name = 'fcount_server.js';
  if(uri=='/fdec.html')   test_name = 'fdec_server.js';
  if(test_name!='') test_name = path.join(home, 'servers', test_name);
  
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

  if(fs.statSync(filename).isDirectory()) filename = path.join(filename, 'index.html');

    if(test_name!=''){
	    var child = require('child_process').spawn('node',[test_name], {detached: true, stdio: [ 'ignore', 'ignore', 'ignore' ]});
	    child.unref();
    }

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
 
    response.writeHead(200);
    response.write(file, "binary");

    response.end();
    });
  });
}).listen(8999);
