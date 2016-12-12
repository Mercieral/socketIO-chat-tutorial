var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){


    //console.log('a user connected');
    socket.on('disconnect', function(){
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.id === socket.id){
                io.emit('disconnected', {
                    name: user.name
                });
            }
        }
    });
    socket.on('chat message', function(msg){
        console.log(socket.id);
        users.push({
            id: socket.id,
            name: msg.name
        });
        io.emit('chat message', {
            message: msg.message,
            name: msg.name
        });
    });
});

http.listen(3000, function(){
    console.log('listening on localhost:3000');
});