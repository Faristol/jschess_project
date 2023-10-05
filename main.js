import { Bishop } from "./piecesobjects/bishop";
import { King } from "./piecesobjects/king";
import { Knight } from "./piecesobjects/knight";
import { Pawn } from "./piecesobjects/pawn";
import { Queen } from "./piecesobjects/queen";
import { Rock } from "./piecesobjects/rock";

document.addEventListener("DOMContentLoaded",start);
function start(){
    /*create table and put pieces*/
    let gameState = {
        piecesAlive : [],
        start : false,
        players: [],
        piecesDead:[],
        turn: 'player1',
    };
    createTablePieces();
}
function createTablePieces(){
    let chessBoard = document.querySelector("#chessboard");
    /*make a array of constructors*/
    let orderPiecesConstructors = [Rock,Knight,Bishop,King,Queen,Bishop,Knight,Rock];
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
        square.id = column+row;
        if(i===0){
            /* rock,knight,bishop,king,queen,bishop,knight,rock: black*/
            gameState.piecesAlive.push(new orderPiecesConstructors[j]('black',column+row));
            let index = gameState.piecesAlive.length-1;
            let srcImage = gameState.piecesAlive[index].image;
            square.setAttribute("src",srcImage);


        }else if(i===1){
            /*pawn: black*/

        }else if(i===6){
            /*pawn: white*/

        }else if(i===7){
            /* rock,knight,bishop,king,queen,bishop,knight,rock: white*/

        }
        chessBoard.appendChild(square);
    }
   }
}