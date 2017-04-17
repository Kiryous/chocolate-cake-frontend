var express = require('express');
var app = new express();
var path = require('path');
var port = process.env.PORT || 8888;

app.use('/',express.static(__dirname)); 
app.get('/', function(req, res) {
  res.sendFile(path.resolve('index.html'));
});

var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});