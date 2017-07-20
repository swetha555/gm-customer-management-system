var express = require('express');
var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/app', express.static(__dirname + '/app'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});
app.listen(8085);
console.log('app is running on 8085');