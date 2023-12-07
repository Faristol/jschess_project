export{route};
import { home } from "./templates/home.js";
import { table } from "./templates/tablegame.js";
import { start } from "./main.js";
async function route(route){
    const main = document.querySelector('#container');
    switch (route) {
        case '#/':
          main.innerHTML = "";
          main.append(home());
          break;
        case '#/game':
          main.innerHTML = "";
          main.append(table());
          await start();
          
        break;
        default:
          window.location.hash = '#/';
      }
}