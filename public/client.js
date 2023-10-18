const socket = io()

let userName;

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
let sendBtn = document.querySelector('#send')
let msgValue = document.getElementById('textarea')

do{
    userName = prompt('Please Enter Your Name')

}while(!userName)

sendBtn.addEventListener('click',()=>{

    sendMessage(msgValue.value)
    
})

// textarea.addEventListener('keyup',(e)=>{
//     if(e.key === 'Enter'){
//         sendMessage(e.target.value)
//     }
// })

function sendMessage(message){
    let msg = {
        user:userName,
        message:message.trim()
    }

    appendMessage(msg,'outgoing')
    textarea.value = ""
    scrollToBottom()

    //send to server

    socket.emit('message',msg)
}``

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markUp

    messageArea.appendChild(mainDiv)


}

//recive msg

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()

})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}