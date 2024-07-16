
const io = require("socket.io")(8000, {
    cors: {
        origin:'*',
    }
});

const users = {};

io.on("connection", socket => {
    
    socket.on("new-user-joined", namee => {
        console.log(namee);
        users[socket.id] = namee;
        socket.broadcast.emit("user-joined", namee);
    });

    socket.on("send", data => {
        socket.broadcast.emit("receive", {message: data, name: users[socket.id]})
    });

    socket.on("disconnect", data => {
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id];
    });

});