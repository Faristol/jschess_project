import { Bishop } from "./piecesobjects/bishop.js";
import { King } from "./piecesobjects/king.js";
import { Knight } from "./piecesobjects/knight.js";
import { Pawn } from "./piecesobjects/pawn.js";
import { Queen } from "./piecesobjects/queen.js";
import { Rook } from "./piecesobjects/rook.js";
import { PieceFather } from "./piecesobjects/piecefather.js";
import {refreshMovementWhiteBlackOnlyMove,refreshMovementWhiteBlackKill,findAndPushPieceToMoveWhiteBlack,findAndPushPieceToKillWhiteBlack,refreshPiecesDead,refreshPositionPiecesAlive} from "./refresharrays.js";
import {getPieceObject,isPathBlocked,range,rangeLetter,rangeDiagonalLetter,hasPieces} from "./piecesbetween.js";
export {gameState};

let movementTarget = [];
let gameState = {
  /*ací es guardaran tots els moviments*/
  /* cada vegada que es faça un moviment white and black, s'afegirà a movment register, en forma d'array*/
  /*periòdicament es farà una comprovació per veure si els 3 ultims elements de l'array son iguals*/
  /*si ho són -> draw by bucle*/
  movementRegister: [],
  movementWhiteBlack: [],
  piecesAlive: [],
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
  piecesDead: [],
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

      isMovementValidHandler(start, end, pieceType);
      movePiece(movementTarget);
      movementTarget = [];
      changeTurn();
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

        killPiece(movementTarget);
        movementTarget = [];
        changeTurn();
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
function killPiece(movementTarget) {
  let pieceKiller = movementTarget[0];
  let pieceToKill = movementTarget[1];

  /*fem copies de de l'element DOM*/

  const copyPieceKiller = pieceKiller.cloneNode(true);
  const copyPieceToKill = pieceToKill.cloneNode(true);

  let idPieceKiller = pieceKiller.id;
  let unicodePieceKiller = pieceKiller.textContent;

  let idPieceToKill = pieceToKill.id;

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
function isMovementValidHandler(start, end, pieceType) {
  const pieceObject = getPieceObject(start, pieceType);
  /*cridar a funcio booleana per veure si hi han peces en mig*/
  const pieces = hasPieces(start, end);


  //const valid = pieceObject.valid(start, end, hasPieces);
}



