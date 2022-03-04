const config = require('./config.json');
const https = require('https');

const server = https.createServer({}).listen(config.ports.socket, () => {
    console.log(`Server has started on Port: ${config.ports.socket}`);
});

const io = require('socket.io')(server);

io.on('connection', socket => {

    console.log(`connected ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`disconnect ${socket.id}`);
    });

    function getRoomUsers(roomId, fn) {
        io.in(roomId).clients((error, clients) => {
            fn(clients);
        });
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

    socket.on('signalData', (data) => {
        console.log(`offer to ${data.socketId} from ${socket.id}`);
        data.from = socket.id;
        io.to(data.socketId).emit('signalData', data);
    });
});

