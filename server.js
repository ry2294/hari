var express = require('express'); // Handles HTTP requests Eg: GET, PUT etc.
var path = require("path"); // Manipulates file path names

/*
Handles HTTP GET Request for URL localhost:5000/ and sends the home.html back
to the client browser. 
*/
var app = express();
var router = express.Router();
router.get('/', function(req, res) {
  res.sendfile(path.join(__dirname + '/home.html'));
});

router.get('/search', function(req, res) {
    console.log(req.query.text);
    var words = ["wedding word", "wedding date", "wedding anniversary"];
    return res.status(200).send(JSON.stringify(words)).end();
});

/*
Creates the server and listens on port 5000.
*/
app.use('/', router);
var http = require('http').Server(app);
var server = http.listen(process.env.PORT || 5000, function(){
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
