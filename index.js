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

let roomData = new Map();

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
            if (clients) {
                socket.emit('getRoomData',
                    getRoomData(joinRoomEvent.roomId, clients)
                );
            }
        });

        joinRoom(joinRoomEvent.roomId, socket.id, joinRoomEvent);
        socket.join(joinRoomEvent.roomId);
    });

    socket.on('action', (actionEvent) => {
        console.log("send actionEvent", actionEvent);
        actionEvent.from = socket.id;
        socket.to(actionEvent.roomId).emit('action', actionEvent);
        actionEvents(actionEvent, socket.id);
    });
});

function joinRoom(roomId, socketId, joinRoomEvent) {
    if (!roomData.has(roomId))
        roomData.set(roomId, new Map());

    let currentRoomData = roomData.get(roomId);

    if (!currentRoomData.has(socketId)) {
        currentRoomData.set(socketId, {username: joinRoomEvent.data.username})
    }
}

function actionEvents(actionEvent, socketId) {
    let currentRoomData = roomData.get(actionEvent.roomId);
    let currentUser = currentRoomData.get(socketId);
    switch (actionEvent.action.type) {
        case 2: {
            currentUser.selected = actionEvent.action.data.selected;
        }
    }
}

function getRoomData(roomId, clients) {
    let currentRoomData = roomData.get(roomId);
    let clientIds = Array.from(clients);

    return {
        clients: clientIds.map((clientId) => {
            let currentUser = currentRoomData.get(clientId);
            return {
                socketId: clientId,
                username: currentUser.username,
                selected: currentUser.selected
            }
        })
    };
}
