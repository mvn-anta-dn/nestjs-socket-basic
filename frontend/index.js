const HOST_URL = "http://localhost:5000";

const username = document.querySelector(".username");
const password = document.querySelector(".password");

const handleLogin = async () => {
  let user = {
    username: username.value,
    password: password.value,
  };
  let data = await request(`${HOST_URL}/login`, "POST", user);
  localStorage.setItem("author", JSON.stringify(data));

  window.location.href = "./home.html";
};

password.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleLogin();
  }
});

const request = async (url, method, data = null) => {
  const response = await fetch(url, {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
