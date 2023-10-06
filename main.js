import { Bishop } from "./piecesobjects/bishop.js";
import { King } from "./piecesobjects/king.js";
import { Knight } from "./piecesobjects/knight.js";
import { Pawn } from "./piecesobjects/pawn.js";
import { Queen } from "./piecesobjects/queen.js";
import { Rook } from "./piecesobjects/rook.js";
import {PieceFather} from "./piecesobjects/piecefather.js";

let movementTarget = [];
let gameState = {
    piecesAlive : [],
    start : false,
    players: {
        'white':'pepe',
        'black':'paco',
    },
    piecesDead:[],
    turn: 'white',
};

document.addEventListener("DOMContentLoaded",start);
function start(){
    /*create table and put pieces*/
    
    createTablePieces();
    /*game();*/

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
        
        if(i===0){
            /* rock,knight,bishop,king,queen,bishop,knight,rock: black*/
            gameState.piecesAlive.push(new orderPiecesConstructors[j]('black',column+row));
            square.classList
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
            
            let unicodeValuePiece = gameState.piecesAlive[index].unicodePiece;
            /*
            let image = document.createElement("img");
            image.classList.add("piece");
            image.src = srcImage;
            image.id = column+row;*/
            square.id=gameState.piecesAlive[index].type+gameState.piecesAlive[index].color+"_";
            square.textContent=unicodeValuePiece;
        }
        square.id += column+row;
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
    /*si l'array capturador d'events esta buit i a més el contingut de la casella es diferent a 0, bingo, a ha marcat una peça, 
    serà correcta? */
    if(element.textContent.length!==0&&movementTarget.length===0){
        if(element.id.includes(gameState.turn)){
            /*ha elegit una peça que correspon en color al torn*/
            /*guardem el e.target al movementTarget*/
            movementTarget.push(element);
        }
        /*  quines condicions elementals s'han de complir per a que el següent moviment siga 
        candidat a validar?*/
        /*A)El escac marcat esta buit
        B) L'escac marcat esta ocupat per una peca de color opost
        */
       console.log("hola");
    }else if(element.textContent.length===0&&movementTarget.length===1){
        /*Condicio A
        si es esta buida, passarem a validar el moviment tinguent en compte
        posicio inicial, posicio final, regles propies de la peça
        de moment la mourem i iau
        fer una funcio isValid() per a cada peça
        fer una funcio move per a moure;
        */
       movementTarget.push(element);
       movePiece(movementTarget);
       movementTarget = [];
       changeTurn();
       
       


    }
    

}
function game(){
    /*enableDisableMovementPlayerColor((gameState.turn==='white'?'white':'black'),(gameState.turn==='white'?'black':'white'));*/

}
function enableDisableMovementPlayerColor(colorEnableMove,colorDisableMove){
    /*fer que soles es poden moure les blanques o negres, segons el torn*/
    /*al primer torn, per cocos, haura de fer click en una peca del seu color, el segon click no, pot ser avançe a un escac buit o ple*/
    /*aço mes avant quan introduïm el tema d'usuaris i tal*/
    


}
function changeTurn(){
    gameState.turn=(gameState.turn==='white'?'black':'white');
}
function movePiece(movementTarget){
    /*primer element posicio inicial*/
    let pieceToMove = movementTarget[0];
    let destination = movementTarget[1];
    /*atributs i estructura de dades a tindre en compte*/
    /*id i textContent*/
    let idPieceToMove = pieceToMove.id;
    let idPieceToMoveWhitoutPiece = idPieceToMove.split("_")[1];
    let idPieceName = idPieceToMove.split("_")[0];
    let unicodePieceToMove = pieceToMove.textContent;
    /*canviem el nom de la peça a l'escac i li llevem el unicode*/
    pieceToMove.id = idPieceToMoveWhitoutPiece;
    pieceToMove.textContent = "";
    /*li posem l'unicode i el nou id a destination*/
    destination.id = idPieceName+"_"+destination.id;
    destination.textContent=unicodePieceToMove;
    


}
