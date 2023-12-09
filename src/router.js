export{route};
import { home } from "./templates/home.js";
import { table } from "./templates/tablegame.js";
import { start } from "./main.js";
import { menu } from "./templates/menu.js";
import { loginForm } from "./templates/login.js";
import {registerForm} from "./templates/signup.js";
import { profileForm } from './templates/profile.js';
async function route(route){
    const main = document.querySelector('#container');
    const nav = document.querySelector('#menu');
    switch (route) {
        case '#/':
          main.innerHTML = "";
          nav.innerHTML = "";
          main.append(home());
          break;
        case '#/game':
          main.innerHTML = "";
          nav.innerHTML = "";
          nav.append(menu());
          main.append(table());
          await start();
        break;
        case '#/login':
          main.innerHTML = "";
          nav.innerHTML = "";
          main.append(loginForm());
          break;
        case '#/signup':
          main.innerHTML = "";
          nav.innerHTML = "";
          main.append(registerForm());
          break;
        case '#/profile':
          main.innerHTML = '';
          main.append(profileForm());
          break;
        default:
          window.location.hash = '#/login';
      }
}