let socket = io();
socket.on('connected', () => {
    console.log("Connected " + socket.id)
})

$(function () {
    let msglist = $('#msglist')
    let sendbtn = $('#sendmsg')
    let msgbox = $('#msgbox')
    let loginbox = $('#loginbox')
    let loginbtn = $('#loginbtn')
    let loginDiv = $('#login-div')
    let chatDiv = $('#chat-div')
    let salutation = $('#salutation')

    let user = ''

    sendbtn.click(function () {
        socket.emit('send_msg', {
            user: user,
            message: msgbox.val()
        })
    })

    loginbtn.click(function () {
        user = loginbox.val()
        chatDiv.show()
        loginDiv.hide()
        socket.emit('login', {
            user: user
        })
        salutation.append($('<h3>' + 'Hey, ' +user+  ' fell free to chat with your friends' + '</h3>'))
    })

    socket.on('recv_msg', function (data) {
        if (data.message.startsWith('@')) {
            msglist.append($('<p>' + '<strong>'+data.user+'</strong>' + ': ' + data.message.split(':')[1].substr(0) + '</p>'))
        }
        else{
            msglist.append($('<p>' + '<strong>'+data.user+'</strong>' + ': ' + data.message + '</p>'))
        }
        
    })
})