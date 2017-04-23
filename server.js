var express = require('express');
var app = new express();
var path = require('path');
var port = process.env.PORT || 8888;

app.use('/',express.static(__dirname + '/build'));
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/build/index.html'));
});

var listener = app.listen(port, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
