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
		// Gets the current date and time
		var dt = new Date();
		var hours = ''+dt.getHours();
		var minute = ''+dt.getMinutes();
		if(minute.length == 1){
			minute = '0'+minute;
		}
		if(hours.length == 1){
			hours = '0'+hours;
		}
		console.log(minute.length)
		var time = hours+':'+minute;

		// Adds the class if the username that sent the message is the current user
		if(resp.username == username){
			$('#sentMsg').append($('<li class="currentUser">').html('<div class="message"><b>'+resp.username+'</b> <span class="time">'+
				time+'</span> <span class="lineMessage">'+resp.msg+'</span></div>'));
		}
		else{
			var audio = new Audio('../audio/solemn.mp3');
			$('#sentMsg').append($('<li>').html('<div class="message"><b>'+resp.username+'</b> <span class="time">'+
				time+'</span> <span class="lineMessage">'+resp.msg+'</span></div>'));
			audio.play();
		}



		// Scroll to the last message
		$('#sentMsg').scrollTop($('#sentMsg')[0].scrollHeight);
	});
});