var express = require('express');
var app = express();
var cons = require('consolidate');
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io')();
var bodyParser = require('body-parser');

// Set everything up to load the views
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// The user id
var id = 1;

// The home directory
app.get('/', function(req, res){
	res.render('home', {path: __dirname + 'views/style/main.css'});
});

app.post('/chat', function(req, res){
	// Loads the socket
	io.attach(server);
	var nickname = req.body.nickname;
	res.render('chat', {nickname: nickname, id: id});
});


io.on('connection', function(socket){
	// Defines the username
	var username;
	id = socket.client.id;
	socket.on('username', function(nickname){
		username = nickname;
		io.emit('username', username);
	});

	// Gets and sends the messages
	socket.on('message', function(msg){
		io.emit('message', {msg:msg.msg, username:username, id:msg.id});
	});

	// When a user disconnect
	socket.on('disconnect', function(){
		if(username != null){
			io.emit('disconn', username);
		}
	})
});


