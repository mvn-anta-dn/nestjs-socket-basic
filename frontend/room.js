const HOST_URL = "http://localhost:5000";
const SOCKET = io(HOST_URL);

const request = async (url, method, data = null) => {
  let response;
  if (method == "GET") {
    response = await fetch(`${HOST_URL}/${url}`, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    response = await fetch(`${HOST_URL}/${url}`, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return response.json();
};

const message = document.querySelector(".message");
const messages = document.querySelector(".messages");

let author = JSON.parse(localStorage.getItem("author"));
let partner = JSON.parse(localStorage.getItem("partner"));

SOCKET.on("connect", () => {
  console.log(SOCKET.id);
});
SOCKET.emit("joinUser", author);

async function render() {
  let postData = {
    senderId: author.id,
    recipientId: partner.id,
  };
  let data = await request("message/room", "POST", postData);
  messages.innerHTML = "";

  for (const message of data) {
    messages.innerHTML += `
        <li ><b>${message.sender.username}: </b>${message.message}</li>
    `;
  }
}

const handleSendMessage = async () => {
  let messageData = {
    message: message.value,
    fromUserId: author.id,
    username: author.username,
    toUserId: partner.id,
  };
  let data = await request("message", "POST", messageData);

  messages.innerHTML += `
          <li ><b>${author.username}: </b>${data.message}</li>
      `;

  message.value = "";
  SOCKET.emit("addMessage", messageData);
};

message.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSendMessage();
  }
});

window.onload = () => {
  render();
};

SOCKET.on("addMessage", (msg) => {
  messages.innerHTML += `
    <li ><b>${msg.username}: </b>${msg.message}</li>
`;
});

// SOCKET.off("addMessage");
