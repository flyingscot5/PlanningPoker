const config = require('./config.json');
const http = require('http');

const server = http.createServer({}).listen(config.ports.socket, () => {
    console.log(`Server has started on Port: ${config.ports.socket}`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {

    console.log(`connected ${socket.id}`);

    let currentRoomId;
    socket.on('disconnect', () => {
        console.log(`disconnect ${socket.id} - ${currentRoomId}`);
        socket.in(currentRoomId).emit('leaveRoom', {socketId: socket.id});
    });

    function getRoomUsers(roomId, fn) {
        fn(io.sockets.adapter.rooms.get(roomId));
    }

    socket.on('joinRoom', (joinRoomEvent) => {
        currentRoomId = joinRoomEvent.roomId;
        console.log("join room", joinRoomEvent);
        socket.to(joinRoomEvent.roomId).emit('joinRoom', {socketId: socket.id, username: joinRoomEvent.data.username});

        getRoomUsers(joinRoomEvent.roomId, function (clients) {
            if (clients)
                socket.emit('getRoomData', {clients: Array.from(clients)});
        });

        socket.join(joinRoomEvent.roomId);
    });

    socket.on('action', (actionEvent) => {
        console.log("send actionEvent", actionEvent);
        actionEvent.from = socket.id;
        socket.to(actionEvent.roomId).emit('action', actionEvent);
    });
});

