module.exports = function(io) {
	io.on('connection', (socket) => {
		console.log("user connected");

		socket.on("disconnect", function() {
			console.log("user disconnected");
		});

		socket.on('message', (data) => {
			console.log('message', data);
			socket.broadcast.emit('message', data);
		});
	});
};