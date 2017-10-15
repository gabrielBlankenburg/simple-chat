var $ = require('jquery');
// configs the socket
var socket = io();
$(function () {
	socket.emit('username', username);
	// send the message to the socket
	$('#chat form').submit(function(){		
		socket.emit('message', {msg:$('#msg').val(), id:id});
		$('#msg').val('');
		return false;
	});

	// When a user login
	socket.on('username', function(resp){
		$('#sentMsg').append($('<li class="message">').html('<div class="message"><b>Server: </b> <span class="time">'+
				time()+'</span> <span class="lineMessage server">'+resp+' entrou na sala</span></div>'));
	});

	// When a user login
	socket.on('disconn', function(resp){
		$('#sentMsg').append($('<li class="message">').html('<div class="message"><b>Server: </b> <span class="time">'+
				time()+'</span> <span class="lineMessage server">'+resp+' saiu da sala</span></div>'));
	});

	// when a message is sent to the socket it pushes the messages
	socket.on('message', function(resp){
		// Adds the class if the username that sent the message is the current user
		if(resp.id == id){
			$('#sentMsg').append($('<li class="currentUser">').html('<div class="message"><b>'+resp.username+'</b> <span class="time">'+
				time()+'</span> <span class="lineMessage">'+resp.msg+'</span></div>'));
		}
		else{
			var audio = new Audio('../audio/solemn.mp3');
			$('#sentMsg').append($('<li>').html('<div class="message"><b>'+resp.username+'</b> <span class="time">'+
				time()+'</span> <span class="lineMessage">'+resp.msg+'</span></div>'));
			audio.play();
		}

		// Scroll to the last message
		$('#sentMsg').scrollTop($('#sentMsg')[0].scrollHeight);
	});
});

// return the time
function time(){
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
	var time = hours+':'+minute;

	return time;
}