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