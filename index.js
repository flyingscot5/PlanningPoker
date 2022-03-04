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

    socket.on('disconnect', () => {
        console.log(`disconnect ${socket.id}`);
    });

    function getRoomUsers(roomId, fn) {
        fn(io.sockets.adapter.rooms.get(roomId));
    }

    socket.on('leaveRoom', (data) => {
        console.log("leave room", data);
        socket.in(data.roomId).emit('leaveRoom', {socketId: socket.id});

        socket.leave(data.roomId);
    });

    socket.on('joinRoom', (data) => {
        socket.to(data.roomId).emit('newClient', {socketId: socket.id});

        getRoomUsers(data.roomId, function (clients) {
            socket.emit('joinRoom', {clients: clients});
        });

        socket.join(data.roomId);
    });

    socket.on('data', (data) => {
        console.log(`offer to ${data.socketId} from ${socket.id}`);
        data.from = socket.id;
        io.to(data.socketId).emit('data', data);
    });
});

