
module.exports = function (io) {
    let listRoom = {};
    io.on('connection', function (socket) {
        socket.on('join-room', function (data) {
            socket.idRoom = data.idConversation;
            socket.username = data.username;
            socket.join(data.idConversation);
            if(!listRoom[data.idConversation]) listRoom[data.idConversation] = [];
            listRoom[data.idConversation].push(data.username);
            io.in(data.idConversation).emit('send-members-online', listRoom[data.idConversation]);
        });
        socket.on('sendMessage', function (data) {
            io.in(data.idConversation).emit('sendMessage', data);
        });
        socket.on('off-project', function(data) {
            var index = listRoom[data.idConversation].indexOf(data.username);
            listRoom[data.idConversation].splice(index,1);
            io.in(data.idConversation).emit('off-project', data);
        });
        socket.on('disconnect', function() {
        var index = listRoom[socket.idRoom].indexOf(socket.username);
        listRoom[socket.idRoom].splice(index,1);
            socket.to(socket.idRoom).emit('disconnected', socket.username);
        });
    });
};
