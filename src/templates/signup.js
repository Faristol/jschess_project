import { registerUser } from "../services/users.js";

export { registerForm };

function registerForm() {
  const divLogin = document.createElement("div");
  divLogin.classList.add("form-centrat");
  divLogin.innerHTML = `  <form class="container mt-5 p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
    <div class="mb-3">
      <label for="signupemail" class="form-label">Email address</label>
      <input type="email" class="form-control" id="signupemail" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="signuppassword" class="form-label">Password</label>
      <input type="password" class="form-control" id="signuppassword">
      <label for="signuppassword2" class="form-label">Repeat Password</label>
      <input type="password" class="form-control" id="signuppassword2">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="remember">
      <label class="form-check-label" for="remember">Remember</label>
    </div>
    <button type="submit" id="signupbtn" class="btn btn-primary">Submit</button>
    <div id="errors"></div>
    </form>`;

  divLogin
    .querySelector("#signupbtn")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      const email = divLogin.querySelector("#signupemail").value;
      const password = divLogin.querySelector("#signuppassword").value;
      registerUser(email, password).then((status) => {
        console.log(status)
        if (status.success) {
          window.location.hash = "#/login";
        } else {
          divLogin.querySelector("#errors").innerHTML = status.msg;
        }
      });
    });
    return divLogin;
}
