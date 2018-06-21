
module.exports = function (io) {
    let listRoom = {};
    io.on('connection', function (socket) {
        socket.on('join-room', function (data) {
            socket.idRoom = data.idConversation;
            socket.username = data.username;
            socket.join(data.idConversation);
            if(!listRoom[data.idConversation]) listRoom[data.idConversation] = [];
            let check = false;
            for(let username of listRoom[data.idConversation]) {
                if(username==data.username) {
                    check = true;
                    break;
                }
            }
            if(!check) listRoom[data.idConversation].push(data.username);
            io.in(data.idConversation).emit('send-members-online', listRoom[data.idConversation]);
            console.log('a user connect', listRoom);
        });
        socket.on('sendMessage', function (data) {
            io.in(data.idConversation).emit('sendMessage', data);
        });
        socket.on('off-project', function(data) {
            var index = listRoom[data.idConversation].indexOf(data.username);
            listRoom[data.idConversation].splice(index,1);
            if(!listRoom[data.idConversation].length) delete listRoom[data.idConversation];
            io.in(data.idConversation).emit('off-project', data);
            console.log('a user disconnect', listRoom);
        });
        socket.on('disconnect', function() {
            var index;
            if(listRoom[socket.idRoom]) {
                index = listRoom[socket.idRoom].indexOf(socket.username);
                listRoom[socket.idRoom].splice(index,1);
                if(!listRoom[socket.idRoom].length) delete listRoom[socket.idRoom];
            }
            socket.to(socket.idRoom).emit('disconnected', socket.username);
            console.log('a user disconnect', listRoom);
        });
    });
};
