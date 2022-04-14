const socket = io();
let container = document.querySelector('.container');
let connectUser = document.querySelector('.connectUser');
let btnEntrar = document.querySelector('#btnEntrar');
let username = '';
let messages = document.querySelector('.messages');
let btn = document.querySelector('#btn');

connectUser.style.display = 'flex';
container.style.display = 'none';

btnEntrar.addEventListener('click', () => {
    let inputName = document.querySelector('#inputName').value;
    username = inputName;

    if(inputName.length){
        connectUser.style.display = 'none';
        container.style.display = 'flex';
        document.title = 'Chat: ' + username;

        socket.emit('sendMessage', username);
    }
});

btn.addEventListener('click', () => {
    let inputMsg = document.querySelector('#inputMsg').value;

    if(inputMsg.length){
        socket.emit('sendMessgeUser', inputMsg)
    }
});

socket.on('atualizarUsuarios', user => {
    if(user.joined){
        addMessage('alert', user.joined + ' entrou no chat.')
    }
    if(user.left){
        addMessage('alert', user.left + ' saiu do chat.');
    }
});

socket.on('showMsg', mensagem => {
    addMessage('msg', mensagem.msg, mensagem.username);
});

function addMessage(type, message, user){
    switch(type){
        case 'msg':
            if(username === user){
                messages.innerHTML += '<div class="me"><strong>'+ user + ': </strong>' + message + '</div><br><br>';
            } else {
                messages.innerHTML += '<div class="msg"><strong>'+ user + ': </strong>' + message + '</div><br><br>';
            }
        break;
        case 'alert':
            messages.innerHTML += '<div class="alertMessage">'+ message +'</div><br>';
        break;
    }
    messages.scrollTop = messages.scrollHeight;
}










































/*

let socket = io();
let container = document.querySelector('.container');
let connectUser = document.querySelector('.connectUser');
let btn = document.querySelector('#btn');
let btnEntrar = document.querySelector('#btnEntrar')
let msgs = document.querySelector('.messages');
let username = '';

connectUser.style.display = 'flex';
container.style.display = 'none';

function renderMessage(type, message){
    switch(type){
        case 'msg':
            if(username === message.username){
                msgs.innerHTML += '<div class="me"><strong>'+ message.username + ': </strong>' + message.message + '</div><br><br>';
            } else {
                msgs.innerHTML += '<div class="msg"><strong>'+ message.username + ': </strong>' + message.message + '</div><br><br>';
            }
        break;
        case 'alert':
            msgs.innerHTML += '<div class="msgAlert">'+ message.username +' entrou na conversa</div>';
        break;
    }
    document.querySelector('#inputMsg').value = '';
    document.querySelector('#inputMsg').focus();
    msgs.scrollTop = msgs.scrollHeight;
};

socket.on('receiveMessage', function(message){
    renderMessage('msg' ,message);
});

btn.addEventListener('click', () => {
    username = document.querySelector('#inputName').value.toUpperCase();
    let message = document.querySelector('#inputMsg').value;

    if(username.length && message.length){
        let messageObject = {
            username: username,
            message: message
        };

        renderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
    };
});

btnEntrar.addEventListener('click', () => {
    let inputName = document.querySelector('#inputName').value;
    if(inputName.length){
        connectUser.style.display = 'none';
        container.style.display = 'flex';
        document.title = 'Chat: ' + inputName;
        renderMessage('alert', message);
    }
});
*/