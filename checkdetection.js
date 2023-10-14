import { gameState } from "./main.js";
export {isKingCheck};
/*
->  Idea a partir d'un torn donat-> agafar el contrari, i filtrar les pecesAlive per ixe color
-> aplicar a cada peça la seua lògica de moviment simulant una espècie de raigs X, veure
en totes les direccions possibles si l'atack es propaga fins:
->limits del tauler: en aquest cas passarem a comprovar l'altre possible moviment o l'altra peça
-> peça contrincant: si no es el rei passem a comprovar l'altra peça 
-> peça del mateix color -> passem a l'altre moviment o altra peça




*/
const limits =['`9','a9','b9','c9','d9','e9','f9','g9','h9','i9',];

function isKingCheck(turn){

}