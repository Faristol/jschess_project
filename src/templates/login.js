export { loginForm };
import { loginUser, logout, forgotPassword } from '../services/users.js';

function loginForm() {
    const divLogin = document.createElement('div');
    divLogin.classList.add("form-centrat")

  
    divLogin.innerHTML = `  <form class="container mt-5 p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
    <div class="mb-3">
      <label for="loginpassword" class="form-label">Email address</label>
      <input type="email" class="form-control" id="loginemail" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="loginpassword" class="form-label">Password</label>
      <input type="password" class="form-control" id="loginpassword">
    </div>
    <a href="#" id="forgotPassword">I forgot my password</a>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="remember">
      <label class="form-check-label" for="remember">Remember</label>
    </div>
    <button type="submit" id="loginbutton" class="btn btn-primary">Submit</button>
    <a href="#/signup">Sign up</a>
    <div id="errors"></div>
    </form>`;
  
    divLogin.querySelector('#loginbutton').addEventListener('click', async (event) => {
      event.preventDefault();
      const email = divLogin.querySelector('#loginemail').value;
      const password = divLogin.querySelector('#loginpassword').value;
      loginUser(email, password).then((status) => {
        if (status.success) window.location.hash = '#/';
        else {
          divLogin.querySelector('#errors').innerHTML = status.errorText;
        }
      });
    });
  
    divLogin.querySelector('#forgotPassword').addEventListener('click', (event) => {
      event.preventDefault();
      const email = divLogin.querySelector('#loginemail').value;
      forgotPassword(email);
      event.target.parentElement.append('You have an Email');
    });
  
    return divLogin;
  }