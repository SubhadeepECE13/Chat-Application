
const socket = io("http://localhost:8000");

const form = document.getElementById("send-comtainer");

const messageInput = document.getElementById("messageInp");
const messageContainere = document.querySelector(".container");

var audio = new Audio("recources/ting.mp3");

const append = (message, position)=> {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainere.append(messageElement);
    if(position === "left")
    {
        audio.play();
    }
}

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value="";
});

const namee = prompt("Enter your name");
socket.emit("new-user-joined", namee);

socket.on("user-joined", name => {
    append(`${name} joined the chat`, "right");
});

socket.on("receive", data => {
    append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", name => {
    append(`${name} left the chat`, "left");
});

