import { Bishop } from "./piecesobjects/bishop.js";
import { King } from "./piecesobjects/king.js";
import { Knight } from "./piecesobjects/knight.js";
import { Pawn } from "./piecesobjects/pawn.js";
import { Queen } from "./piecesobjects/queen.js";
import { Rook } from "./piecesobjects/rook.js";
import { PieceFather } from "./piecesobjects/piecefather.js";
import {
  refreshMovementWhiteBlackOnlyMove,
  refreshMovementWhiteBlackKill,
  findAndPushPieceToMoveWhiteBlack,
  findAndPushPieceToKillWhiteBlack,
  refreshPiecesDead,
  refreshPositionPiecesAlive,
} from "./refresharrays.js";
import {
  getPieceObject,
  isPathBlocked,
  range,
  rangeLetter,
  rangeDiagonalLetter,
  hasPieces,
} from "./piecesbetween.js";
import { isKingCheck } from "./checkdetection.js";
import { isCheckMate } from "./checkmatedetection.js";
import { playRandomAttackSound } from "./memessounds.js";
export { gameState };
export {isMovementValidHandler};

let movementTarget = [];
let gameState = {
  /*ací es guardaran tots els moviments*/
  /* cada vegada que es faça un moviment white and black, s'afegirà a movment register, en forma d'array*/
  /*periòdicament es farà una comprovació per veure si els 3 ultims elements de l'array son iguals*/
  /*si ho són -> draw by bucle*/
  movementRegisterCopy: [],
  movementRegister: [],
  movementWhiteBlack: [],
  movementWhiteBlackCopy:[],
  piecesAlive: [],
  piecesAliveCopy:[],
  piecesDead: [],
  piecesDeadCopy: [],
  start: false,
  /* aci no estaria demés fer varies variables
    relatives a:
    ->El rey esta en jaque?
    ->AQuesta variable controlarà tots els altres moviments, abans de tot,
    s'haurà de verificar si el rey està en jaque
    ->El rey s'ha mogut? si s'ha mogut ja no podra fer l'enroc
    
    
    */
  players: {
    white: "pepe",
    black: "paco",
  },
 
  turn: "white",
  stalemate: "false",
  checkmate: "false",
  check: "false",
  chessCastling: "false",
  kingMove: "false",
};

document.addEventListener("DOMContentLoaded", start);
function start() {
  /*create table and put pieces*/

  createTablePieces();
  game();
}
function createTablePieces() {
  let chessBoard = document.querySelector("#chessboard");
  /*make a array of constructors*/
  let orderPiecesConstructors = [
    Rook,
    Knight,
    Bishop,
    King,
    Queen,
    Bishop,
    Knight,
    Rook,
  ];
  /*black top white down*/
  let charCode = "a".charCodeAt(0);
  for (let i = 0; i < 8; i++) {
    let row = 8 - i;
    /*if i%2==0 true (starts with green) else false (starts with white)*/
    let greenStart = i % 2 === 0;
    for (let j = 0; j < 8; j++) {
      /*if greenStart = true -> put green when j%2===0
        -> false: put white when j%2===0
        */
      let color = greenStart
        ? j % 2 === 0
          ? "green"
          : "white"
        : j % 2 === 0
        ? "white"
        : "green";
      let column = String.fromCharCode(charCode + j);
      let square = document.createElement("span");
      square.classList.add(color);
      square.classList.add("square");
      square.addEventListener("click", captureAction);

      if (i === 0) {
        /* rock,knight,bishop,king,queen,bishop,knight,rock: black*/
        gameState.piecesAlive.push(
          new orderPiecesConstructors[j]("black", column + row)
        );
        square.classList;
      } else if (i === 1) {
        /*pawn: black*/
        gameState.piecesAlive.push(new Pawn("black", column + row));
      } else if (i === 6) {
        /*pawn: white*/
        gameState.piecesAlive.push(new Pawn("white", column + row));
      } else if (i === 7) {
        /* rock,knight,bishop,king,queen,bishop,knight,rock: white*/
        gameState.piecesAlive.push(
          new orderPiecesConstructors[j]("white", column + row)
        );
      }
      if ([0, 1, 6, 7].includes(i)) {
        let index = gameState.piecesAlive.length - 1;

        let unicodeValuePiece = gameState.piecesAlive[index].unicodePiece;
        /*
            let image = document.createElement("img");
            image.classList.add("piece");
            image.src = srcImage;
            image.id = column+row;*/
        square.id =
          gameState.piecesAlive[index].type +
          gameState.piecesAlive[index].color +
          "_";
        square.textContent = unicodeValuePiece;
      }
      square.id += column + row;
      chessBoard.appendChild(square);
    }
  }
 

  gameState.start = true;
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
function captureAction(e) {
  e.stopPropagation();
  let element = e.target;
  /*si l'array capturador d'events esta buit i a més el contingut de la casella es diferent a 0, bingo, a ha marcat una peça, 
    serà correcta? */
  if (element.textContent.length !== 0 && movementTarget.length === 0) {
    if (element.id.includes(gameState.turn)) {
      /*ha elegit una peça que correspon en color al torn*/
      /*guardem el e.target al movementTarget*/

      /*IMPORTANTISSIM, ACI PREVIAMENT A CLAVAR AL TARGET DINS O NO, HAUREM DE VEURE
      SI EL SEU REI ESTÀ EN JAKE, SI HO ESTÀ NO ES GUARDARÀ EL EVENT EN L'ARRAY, FINS QUE NO CLICKE
      SOBRE EL REI.
      */

      movementTarget.push(element);
    }
    /*  quines condicions elementals s'han de complir per a que el següent moviment siga 
        candidat a validar?*/
    /*A)El escac marcat esta buit
        B) L'escac marcat esta ocupat per una peca de color opost
        */
  } else {
    if (element.textContent.length === 0 && movementTarget.length === 1) {
      /*Condicio A
        si es esta buida, passarem a validar el moviment tinguent en compte
        posicio inicial, posicio final, regles propies de la peça
        de moment la mourem i iau



        //TO DO
        fer una funcio isMovementValid() per a cada peça
        */

      movementTarget.push(element);

      const movementStarts = movementTarget[0].cloneNode(true);
      const movementEnds = movementTarget[1].cloneNode(true);
      let start = movementStarts.id.split("_")[1];
      let end = movementEnds.id;
      let pieceType = movementStarts.id.split("_")[0].slice(0, -5);
      /*ESQUEMA VALIDACIO
      1)El seu rey està en jaque?
        1.1)Sí->la peça elegida és el rey -> okey -> el moviment resultant evita el jaque?
            Sí-> la peça elegida no és el rey-> el moviment resultant evita el jaque?
        
      
      
      
      */
     /*Quina es la seqüència de control de jaque?
     Dona igual que previament tinga el rei en jaque, no cal controlar-ho,
     s'ha de controlar després del moviment, per veure si el rei esta en jaque, si ho està invalidar moviment

     
     */


      if (isMovementValidHandler(start, end, pieceType)) {
        copyArrays();
        /*abans de mourela fem copia de
        movementRegister: [],
  movementWhiteBlack: [],
  piecesAlive: [],
  piecesDead: [],
  la moguem, si el seu rei esta amenaçat invalidem moviment
  aixina cobrim dos casos
  -> el seu rei previament al moviment estava amenaçat pel jugador contrari, despres del moviment
  encara ho està, invalidem
  -> el seu rei previament no estava amenaçat pel jugador contrari, després del moviment ho està

  IMPORTANT-> S'HAURA DE FER altres funcions movePieceWithoutRefreshHtml killPieceWithoutRefreshHtml
  on sols refresquem els arrays, per a no actualitzar el html

  RECAPITULANT-> verificar si el moviment es valid (a nivell de peça), si ho és
  fem copia d'arrays, moguem sense actualitzar el html (s'actualitzen els arrays del gameState),
  verifiquem si el seu rei està en jaque:
  ->No ho està apliquem el movePiece i el KillPiece normals (actualitzant el html i els arrays), i canviem de torn
  -> Està en jaque->
  */
 //previament em fet una copia dels arrays-> apliquem aquesta funcio, aquesta funcio modificara als que no son copies
 //després verifiquem si el seu rei esta en jaque, sino ho està
 //-> retornem els arrays als valors inicials i efectuem el moviment i canviem el torn
 //-> si està en jaque retornem als valors inicials, pero no efectuem el moviment ni canviem el torn
        movePieceWithoutRefreshHtml(movementTarget);
        
        if(!isKingCheck(gameState.turn,gameState.piecesAlive)){
          //si el rei no esta en jaque
          //carreguem els arrays originals sense modificar i efectuem el moviment
          pastContentArrays();
          movePiece(movementTarget);
          changeTurn();
          //si el moviment es valid i ademes el seu rey no esta en jaque ja vegem si el jugador opost esta en jaquemate
          if(isCheckMate(gameState.turn)){
              
          }


        }else{
          pastContentArrays();
        }
        
        
      }

      movementTarget = [];
    } else if (
      element.textContent.length !== 0 &&
      movementTarget.length === 1
    ) {
      movementTarget.push(element);

      /*aci aprofitarem i controlarem dos casos

        1)Si el segon click el fa sobre una peça del seu color-> no passa absolutament res
        movementTarget = [];
        no canviem el torn

        AVIS -> MES AVANT EN AQUEST APARTAT S'HAURA DE CONTROLAR I VERIFICAR L'ENROC;

        2)Si el segon click el fa sobre una peça de color opost(, de moment no controlarem si es valid el moviment
        , si fos invalid, passaria com el cas (1),) la mata, s'actualitza la funció pieces alive i s'afegix a les peces mortes
        */
      if (movementTarget[1].id.includes(gameState.turn)) {
        /*clavar condicio per a veure si es un enroc*/

        /**/
        movementTarget = [];
      } else if (!movementTarget[1].id.includes(gameState.turn)) {
        /*peça de color opost*/
        /*ací haurem de posar unes condicions especials, 
        cap peça pot matar al rei
        els peons maten en diagonal
        */
        const movementStarts = movementTarget[0].cloneNode(true);
        const movementEnds = movementTarget[1].cloneNode(true);
        let start = movementStarts.id.split("_")[1];
        let end = movementEnds.id;
        let pieceTypeKiller = movementStarts.id.split("_")[0].slice(0, -5);
        let pieceTypeToKill = movementEnds.id.split("_")[0].slice(0, -5);


        if (
          isMovementValidHandler(start, end, pieceTypeKiller, pieceTypeToKill)
        ) {
          copyArrays();
          killPieceWithoutRefreshHtml(movementTarget);
          if(!isKingCheck(gameState.turn,gameState.piecesAlive)){
            pastContentArrays();
            playRandomAttackSound();
            killPiece(movementTarget);
            changeTurn();
            //si el moviment es valid i ademes el seu rey no esta en jaque ja vegem si el jugador opost esta en jaquemate, o s'ha arribat a un stalemate etc etc
            if(isCheckMate(gameState.turn)){
              
            }
          }else{
            pastContentArrays();
          }
          
        }
        movementTarget = [];
      }
    }
  }
  game();
}
function game() {
  /*enableDisableMovementPlayerColor((gameState.turn==='white'?'white':'black'),(gameState.turn==='white'?'black':'white'));*/
  /*si arriba ací el joc encara esta en start, però falta 1 moviment x a fer la copia*/
  if (!gameState.start) {
  }
}
function gameEnd() {}
function enableDisableMovementPlayerColor(colorEnableMove, colorDisableMove) {
  /*fer que soles es poden moure les blanques o negres, segons el torn*/
  /*al primer torn, per cocos, haura de fer click en una peca del seu color, el segon click no, pot ser avançe a un escac buit o ple*/
  /*aço mes avant quan introduïm el tema d'usuaris i tal*/
  /*si es poguera diferenciar el clik del usuari1 i el click del u2, estaria collonut*/
}
function changeTurn() {
  gameState.turn = gameState.turn === "white" ? "black" : "white";
}
function movePieceWithoutRefreshHtml(movementTarget){
  let pieceToMove = movementTarget[0];
  let destination = movementTarget[1];

  let copyPieceToMove = pieceToMove.cloneNode(true);
  let copySquareDestination = destination.cloneNode(true);

  let idPieceToMove = copyPieceToMove.id;
  let idDestination = copySquareDestination.id;

  let idPieceToMoveWhitoutPiece = idPieceToMove.split("_")[1];

  refreshPositionPiecesAlive(idPieceToMoveWhitoutPiece,idDestination);
  refreshMovementWhiteBlackOnlyMove(copySquareDestination);



}

function movePiece(movementTarget) {
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
  destination.id = idPieceName + "_" + destination.id;
  destination.textContent = unicodePieceToMove;

  refreshPositionPiecesAlive(
    idPieceToMoveWhitoutPiece,
    destination.id.split("_")[1]
  );
  /*actualitzem l'array moviment-> si al fer push la long es = 2 -> introduim l'array en el movement register
   */
  refreshMovementWhiteBlackOnlyMove(destination);
}
function killPieceWithoutRefreshHtml(movementTarget){
  let pieceKiller = movementTarget[0];
  let pieceToKill = movementTarget[1];

  /*fem copies de de l'element DOM*/

  const copyPieceKiller = pieceKiller.cloneNode(true);
  const copyPieceToKill = pieceToKill.cloneNode(true);

  refreshMovementWhiteBlackKill(copyPieceKiller, copyPieceToKill);
  refreshPiecesDead(copyPieceToKill, copyPieceKiller);


}
function killPiece(movementTarget) {
  let pieceKiller = movementTarget[0];
  let pieceToKill = movementTarget[1];

  /*fem copies de de l'element DOM*/

  const copyPieceKiller = pieceKiller.cloneNode(true);
  const copyPieceToKill = pieceToKill.cloneNode(true);

  let idPieceKiller = copyPieceKiller.id;
  let unicodePieceKiller = copyPieceKiller.textContent;

  let idPieceToKill = copyPieceToKill.id;

  /*canviem el id de la pieceKiller pel seu sense el nom*/
  pieceKiller.id = idPieceKiller.substring(idPieceKiller.length - 2);
  pieceKiller.textContent = "";

  pieceToKill.id =
    idPieceKiller.split("_")[0] +
    "_" +
    idPieceToKill.substring(idPieceToKill.length - 2);
  pieceToKill.textContent = unicodePieceKiller;


  refreshMovementWhiteBlackKill(copyPieceKiller, copyPieceToKill);
  refreshPiecesDead(copyPieceToKill, copyPieceKiller);

  /*abans d'actualitzar les peces vives i mortes refrescarem el array que captura el moviment, sino no registraria la peça capturada,
  ja q ja estaria borrada de les pecesAlive*/
}

/*pieces between*/
function isMovementValidHandler(start, end, pieceType, pieceType2) {
  if (pieceType2 === undefined) {
    /*si esta undefined es un moviment sense captura*/
    const pieceObject = getPieceObject(start, pieceType)
    /*cridar a funcio booleana per veure si hi han peces en mig*/
    const hasPiecesBetween = hasPieces(start, end);
    
    return pieceObject.valid(start, end, hasPiecesBetween);
  } else {
    /*si pieceType2 esta definidia-> implica que hi ha un intent de captura
    CONTROLAR->que la peça a capturar no siga un rei, doncs no es pot capturar
    -> si la peça q captura es un peo, aquest mourà en diagonal
    */
    if (pieceType2 === "king") {
      return false;
    } else {
      const pieceObject = getPieceObject(start, pieceType);
      const hasPiecesBetween = hasPieces(start, end.split("_")[1]);
      
      if (pieceObject.type === "pawn") {
        return pieceObject.valid(
          start,
          end.split("_")[1],
          hasPiecesBetween,
          true
        );
      } else {
        return pieceObject.valid(start, end.split("_")[1], hasPiecesBetween);
      }
    }
  }
}
function copyArrays() {
  gameState.piecesAliveCopy = gameState.piecesAlive.map(piece => piece.clone());
  gameState.piecesDeadCopy = gameState.piecesDead.map(piece => piece.clone());
  gameState.movementRegisterCopy = gameState.movementRegister.map(subArr => [...subArr]);
  gameState.movementWhiteBlackCopy = [...gameState.movementWhiteBlack];
}

function pastContentArrays() {
  gameState.piecesAlive = gameState.piecesAliveCopy.map(piece => piece.clone());
  gameState.piecesDead = gameState.piecesDeadCopy.map(piece => piece.clone());
  gameState.movementRegister = gameState.movementRegisterCopy.map(subArr => [...subArr]);
  gameState.movementWhiteBlack = [...gameState.movementWhiteBlackCopy];
}
