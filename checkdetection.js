import { gameState } from "./main.js";
export { isKingCheck };
/*
->  Idea a partir d'un torn donat-> agafar el contrari, i filtrar les pecesAlive per ixe color
-> aplicar a cada peça la seua lògica de moviment simulant una espècie de raigs X, veure
en totes les direccions possibles si l'atack es propaga fins:
->limits del tauler: en aquest cas passarem a comprovar l'altre possible moviment o l'altra peça
-> peça contrincant: si no es el rei passem a comprovar l'altra peça 
-> peça del mateix color -> passem a l'altre moviment o altra peça




*/
const limits = [
  "`9",
  "a9",
  "b9",
  "c9",
  "d9",
  "e9",
  "f9",
  "g9",
  "h9",
  "i9",
  "`8",
  "`7",
  "`6",
  "`5",
  "`4",
  "`3",
  "`2",
  "`1",
  "`0",
  "a0",
  "b0",
  "c0",
  "d0",
  "e0",
  "f0",
  "g0",
  "h0",
  "i0",
  "i1",
  "i2",
  "i3",
  "i4",
  "i5",
  "i6",
  "i7",
  "i8",
];

function isKingCheck(turn) {
  const colorPiecesOpponent = turn === "white" ? "black" : "white";
  const king = gameState.piecesAlive.find(
    (piece) => piece.type === "king" && piece.color === turn
  );
  const piecesOpponent = [];
  gameState.piecesAlive.forEach((piece) => {
    if (piece.color === colorPiecesOpponent) {
      piecesOpponent.push(piece);
    }
  });
  let isChecked = false;
  isChecked = piecesMovementHandler(piecesOpponent, king, isChecked);
}
function piecesMovementHandler(piecesOpponent, king, isChecked) {
  piecesOpponent.forEach((piece) => {
    switch (piece.type) {
      case "pawn":
        if (piece.color === "white") {
          if (
            traceDiagonalAscendentLeftToRight(piece.coordinates, 1) ||
            traceDiagonalAscendentRightToLeft(piece.coordinates, 1)
          ) {
            isChecked = true;
            break;
          }
        } else {
            if (
                traceDiagonalDescendentLeftToRight(piece.coordinates, 1) ||
                traceDiagonalDescendentRightToLeft(piece.coordinates, 1)
              ) {
                isChecked = true;
                break;
              }
        }

        break;
      case "knight":
        if()
        break;
      case "bishop":
        break;
      case "queen":
        break;
      case "rook":
        break;
    }
  });
  return isChecked;
}
