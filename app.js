var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
// The home directory
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
	// Defines the username
	var username;
	socket.on('username', function(nickname){
		username = nickname;
	});

	// Get and send the messages
	socket.on('message', function(msg){
		io.emit('message', {msg:msg, username:username});
	});
});

