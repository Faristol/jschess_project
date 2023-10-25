export {
  refreshMovementWhiteBlackOnlyMove,
  refreshMovementWhiteBlackKill,
  findAndPushPieceToMoveWhiteBlack,
  findAndPushPieceToKillWhiteBlack,
  refreshPiecesDead,
  refreshPositionPiecesAlive,
};


function refreshMovementWhiteBlackOnlyMove(idPiece,gameState) {
  if (gameState.movementWhiteBlack.length === 0) {
    findAndPushPieceToMoveWhiteBlack(idPiece,gameState);
  } else {
    findAndPushPieceToMoveWhiteBlack(idPiece,gameState);
    gameState.movementRegister.push(gameState.movementWhiteBlack);
    gameState.movementWhiteBlack = [];
  }
}

function refreshMovementWhiteBlackKill(pieceKiller, pieceToKill,gameState) {
  if (gameState.movementWhiteBlack.length === 0) {
    findAndPushPieceToKillWhiteBlack(pieceKiller, pieceToKill,gameState);
  } else {
    findAndPushPieceToKillWhiteBlack(pieceKiller, pieceToKill,gameState);
    gameState.movementRegister.push(gameState.movementWhiteBlack);
    gameState.movementWhiteBlack = [];
  }
}
function findAndPushPieceToMoveWhiteBlack(idPiece,gameState) {
  let piece = gameState.piecesAlive.find(
    (piece) => piece.coordinates === idPiece.id.split("_")[1] || piece.coordinates === idPiece.id
  );
  let notationName = piece.notationName;
  let coordinates = piece.coordinates;
  gameState.movementWhiteBlack.push(notationName + coordinates);
}
function findAndPushPieceToKillWhiteBlack(pieceKiller, pieceToKill,gameState) {
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
function refreshPositionPiecesAlive(idDestination0, idDestinationF,gameState) {
  /*actualitzem l'element mogut a la nova coordenada*/
  let index = gameState.piecesAlive.findIndex(
    (piece) => piece.coordinates === idDestination0
  );
  if (index !== -1) gameState.piecesAlive[index].coordinates = idDestinationF;
}
function refreshPiecesDead(copyPieceToKill, copyPieceKiller,gameState) {


  let coordinates = copyPieceToKill.id.split("_")[1];
  let index = gameState.piecesAlive.findIndex(
    (piece) => piece.coordinates === coordinates
  );

  if (index !== -1) {
    let element = gameState.piecesAlive[index];
    gameState.piecesDead.push(element);
    gameState.piecesAlive.splice(index, 1);
    let coordinates0 = copyPieceKiller.id.split("_")[1];
    refreshPositionPiecesAlive(coordinates0, coordinates,gameState);
  }
}
