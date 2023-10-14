export {
  refreshMovementWhiteBlackOnlyMove,
  refreshMovementWhiteBlackKill,
  findAndPushPieceToMoveWhiteBlack,
  findAndPushPieceToKillWhiteBlack,
  refreshPiecesDead,
  refreshPositionPiecesAlive,
};
import { gameState } from "./main.js";

function refreshMovementWhiteBlackOnlyMove(idPiece) {
  if (gameState.movementWhiteBlack.length === 0) {
    findAndPushPieceToMoveWhiteBlack(idPiece);
  } else {
    findAndPushPieceToMoveWhiteBlack(idPiece);
    gameState.movementRegister.push(gameState.movementWhiteBlack);
    gameState.movementWhiteBlack = [];
  }
}

function refreshMovementWhiteBlackKill(pieceKiller, pieceToKill) {
  if (gameState.movementWhiteBlack.length === 0) {
    findAndPushPieceToKillWhiteBlack(pieceKiller, pieceToKill);
  } else {
    findAndPushPieceToKillWhiteBlack(pieceKiller, pieceToKill);
    gameState.movementRegister.push(gameState.movementWhiteBlack);
    gameState.movementWhiteBlack = [];
  }
}
function findAndPushPieceToMoveWhiteBlack(idPiece) {
  let piece = gameState.piecesAlive.find(
    (piece) => piece.coordinates === idPiece.id.split("_")[1] || piece.coordinates === idPiece.id
  );
  let notationName = piece.notationName;
  let coordinates = piece.coordinates;
  gameState.movementWhiteBlack.push(notationName + coordinates);
}
function findAndPushPieceToKillWhiteBlack(pieceKiller, pieceToKill) {
  let coordinatesPieceKiller = pieceKiller.id.split("_")[1];
  let killer = gameState.piecesAlive.find(
    (piece) => piece.coordinates === coordinatesPieceKiller
  );
  let notationNamePieceK = killer.notationName;
  let coordinatesPieceK = killer.coordinates;
  /*el mateix per a la peça a capturar*/
  let coordinatesPieceToKill = pieceToKill.id.split("_")[1];
  let toKill = gameState.piecesAlive.find(
    (piece) => piece.coordinates === coordinatesPieceToKill
  );
  let notationNamePieceToK = toKill.notationName;
  let coordinatesPieceToK = toKill.coordinates;

  gameState.movementWhiteBlack.push(
    notationNamePieceK +
      coordinatesPieceK +
      "x" +
      notationNamePieceToK +
      coordinatesPieceToK
  );
}
function refreshPositionPiecesAlive(idDestination0, idDestinationF) {
  /*actualitzem l'element mogut a la nova coordenada*/
  let index = gameState.piecesAlive.findIndex(
    (piece) => piece.coordinates === idDestination0
  );
  if (index !== -1) gameState.piecesAlive[index].coordinates = idDestinationF;
}
function refreshPiecesDead(copyPieceToKill, copyPieceKiller) {


  let coordinates = copyPieceToKill.id.split("_")[1];
  let index = gameState.piecesAlive.findIndex(
    (piece) => piece.coordinates === coordinates
  );

  if (index !== -1) {
    let element = gameState.piecesAlive[index];
    gameState.piecesDead.push(element);
    gameState.piecesAlive.splice(index, 1);
    let coordinates0 = copyPieceKiller.id.split("_")[1];
    refreshPositionPiecesAlive(coordinates0, coordinates);
  }
}
