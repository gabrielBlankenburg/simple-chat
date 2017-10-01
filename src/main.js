var $ = require('jquery');
// configs the socket
var socket = io();
$(function () {
	// the current username
	var username;
	$('#user form').submit(function(){
		username = $('#nickname').val();
		// send the chosen username with socket
		socket.emit('username', username);
		// make the div disappear
		$('#user').css('display', 'none');
		$('#chat').css('display', 'block');
		return false;
	});

	// send the message to the socket
	$('#chat form').submit(function(){
		socket.emit('message', $('#msg').val());
		$('#msg').val('');
		return false;
	});

	// when a message is sent to the socket it pushes the messages
	socket.on('message', function(resp){
		// add the class if the username that sent the message is the current user
		if(resp.username == username){
			$('#sentMsg').append($('<li class="currentUser">').text(resp.username+': '+resp.msg));
		}
		else{
			$('#sentMsg').append($('<li>').text(resp.username+': '+resp.msg));
		}
	});
});