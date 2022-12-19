const HOST_URL = "http://localhost:5000";

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

async function render() {
  let data = await request("users", "GET");
  let author = JSON.parse(localStorage.getItem("author"));
  let listUser = document.querySelector(".list-user");
  let newUsers = data.filter((user) => user.id !== author.id);
  for (const user of newUsers) {
    listUser.innerHTML += `
      <li style="cursor: pointer" onclick="handleRoom('${user.id}', '${user.username}')">${user.username}</li>
  `;
  }
}

render();

const handleRoom = (id, username) => {
  let user = { id, username };
  localStorage.setItem("partner", JSON.stringify(user));
  window.location.href = "./room.html";
};
