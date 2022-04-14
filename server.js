const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

server.listen(3000, () => {
    console.log('Rodando no link http://localhost:3000/')
});

let messages = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('Socket conectado: ' + socket.id);

    socket.on('sendMessage', username => {
        socket.broadcast.emit('atualizarUsuarios', {
            joined: username
        });

        socket.on('disconnect', () => {
            socket.broadcast.emit('atualizarUsuarios', {
                left: username
            });
        });

        socket.on('sendMessgeUser', msg => {
            let obj = {
                username: username,
                msg: msg
            }
            socket.broadcast.emit('showMsg', obj);
            socket.emit('showMsg', obj);
        });
    });




    // socket.on('sendMessage', data => {
    //     messages.push(data);
    //     socket.broadcast.emit('receiveMessage', data)
    // });
})