const loginForm = document.getElementById("login-form");
const errorContainer = document.getElementById("error-container");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, userId } = await response.json();
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    window.location.href = "./index.html";
  } else {
    const errorMessage = await response.text();
    console.error(errorMessage);
    errorContainer.innerHTML = "Usuario o contraseña incorrectos";
  }
});
