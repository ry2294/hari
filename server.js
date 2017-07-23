var express = require('express'); // Handles HTTP requests Eg: GET, PUT etc.
var path = require("path"); // Manipulates file path names

/*
Handles HTTP GET Request for URL localhost:5000/ and sends the home.html back
to the client browser. 
*/
var app = express();
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  res.sendfile(path.join(__dirname + '/home.html'));
});

router.get('/search', function(req, res) {
    console.log(req.query.text);
    
    request('http://35.184.84.199:9200/bestbuy/products/_search?q=' + 
            req.query.text, 
            function (error, response, body) {
              var data = JSON.parse(body);
              var words = [];
              if (data != null && data.hits != null && data.hits.hits != null) {
                for (var i = 0; i < data.hits.hits.length; i++) {
                  words.push(data.hits.hits[i]._source.name);
                }
              }
              return res.status(200).send(JSON.stringify(words)).end();
            });
});

/*
Creates the server and listens on port 5000.
*/
app.use('/', router);
var http = require('http').Server(app);
var server = http.listen(process.env.PORT || 5000, function(){
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
