export{route};
import { home } from "./templates/home.js";
import { table } from "./templates/tablegame.js";
import { start } from "./main.js";
import { menu } from "./templates/menu.js";
import { loginForm } from "./templates/login.js";
import {registerForm} from "./templates/signup.js";
import { profileForm } from './templates/profile.js';
import { result } from "./templates/result.js";
import {listgames} from "./templates/listgames.js";
async function route(route){
    const main = document.querySelector('#container');
    const nav = document.querySelector('#menu');
    const params = route.split('?');
    console.log(route);
    console.log(params);
    if(params[1]!==undefined){
      route = params[0];
      console.log(route);
    }
    
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
          localStorage.removeItem('init');
          localStorage.removeItem('fi');
          await start();
        break;
        case '#/login':
          localStorage.clear();
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
          nav.innerHTML = "";
          localStorage.removeItem('init');
          localStorage.removeItem('fi');
          nav.append(menu());
          main.append(profileForm());
          break;
        case '#/result':
          main.innerHTML = "";
          nav.innerHTML = "";
          localStorage.removeItem('init');
          localStorage.removeItem('fi');
          main.append(result());
          break;
        case '#/listgames':
          main.innerHTML = "";
          nav.innerHTML = "";
          nav.append(menu());
          main.append(await listgames(params[1]));
          break;
        default:
          window.location.hash = '#/login';
      }
}