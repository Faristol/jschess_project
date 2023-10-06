import { Bishop } from "./piecesobjects/bishop.js";
import { King } from "./piecesobjects/king.js";
import { Knight } from "./piecesobjects/knight.js";
import { Pawn } from "./piecesobjects/pawn.js";
import { Queen } from "./piecesobjects/queen.js";
import { Rook } from "./piecesobjects/rook.js";
import { PieceFather } from "./piecesobjects/piecefather.js";

let gameState = {
    movementTarget : [],
    piecesAlive : [],
    start : false,
    players: {
        'white':'pepe',
        'black':'paco',
    },
    piecesDead:[],
    turn: null,
};

document.addEventListener("DOMContentLoaded",start);
function start(){
    /*create table and put pieces*/
    
    createTablePieces();

}
function createTablePieces(){
    let chessBoard = document.querySelector("#chessboard");
    /*make a array of constructors*/
    let orderPiecesConstructors = [Rook,Knight,Bishop,King,Queen,Bishop,Knight,Rook];
    /*black top white down*/
    let charCode = 'a'.charCodeAt(0);
   for(let i=0;i<8;i++){
    let row = 8-i;
    /*if i%2==0 true (starts with green) else false (starts with white)*/
    let greenStart = i%2===0;
    for (let j=0;j<8;j++){
        /*if greenStart = true -> put green when j%2===0
        -> false: put white when j%2===0
        */
        let color = greenStart?(j%2===0?"green":"white"):(j%2===0?"white":"green");
        let column = String.fromCharCode((charCode+j));
        let square = document.createElement("span");
        square.classList.add(color);
        square.classList.add("square");
        square.addEventListener("click",captureAction);
        square.id = column+row;
        if(i===0){
            /* rock,knight,bishop,king,queen,bishop,knight,rock: black*/
            gameState.piecesAlive.push(new orderPiecesConstructors[j]('black',column+row));
        }else if(i===1){
            /*pawn: black*/
            gameState.piecesAlive.push(new Pawn('black',column+row));
        }else if(i===6){
            /*pawn: white*/
            gameState.piecesAlive.push(new Pawn('white',column+row));
        }else if(i===7){
            /* rock,knight,bishop,king,queen,bishop,knight,rock: white*/
            gameState.piecesAlive.push(new orderPiecesConstructors[j]('white',column+row));
        }
         if([0,1,6,7].includes(i)){
            let index = gameState.piecesAlive.length-1;
            let srcImage = gameState.piecesAlive[index].image;
            let image = document.createElement("img");
            image.classList.add("piece");
            image.src = srcImage;
            image.id = column+row;
            square.appendChild(image);
        }
        chessBoard.appendChild(square);
    }
   }
}
/*El joc començarà quan el jugador de les blanques faça un moviment valid, açò comporta
1) clickar sobre la peça
2) clickar a altre escac 
Comprovacions:
Aquesta peça pot fer aquest moviment?
-> Si el pot fer-> el joc comença, es fa copia de l'estat i es canvia el torn

Sistema de moviment-> click-click s'haura de tindre en compte que el destí 
no siga la mateixa posicio a l'actual
*/ 
/*de moment sols posarem dos condicions-> destí no siga el mateix a la posició actual
i que no hi haja cap peça seua en la casella destí*/
function captureAction(e){
    let element = e.target;
    if(gameState.movementTarget.length===0){
        gameState.movementTarget.push(element);
    }else if(gameState.movementTarget.length===1){
        gameState.movementTarget.push(element);
        let positionFinal = element.id;
        let copyImg = gameState.movementTarget[0].cloneNode(true);
        copyImg.id=positionFinal;
        element.appendChild(copyImg);
        gameState.movementTarget = [];
    }

}
function game(){

}