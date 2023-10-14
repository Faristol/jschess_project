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
        if (tracePositionsKnight(piece.coordinates)) {
          isChecked = true;
          break;
        }
        break;
      case "bishop":
        if (
          traceDiagonalAscendentLeftToRight(piece.coordinates) ||
          traceDiagonalAscendentRightToLeft(piece.coordinates) ||
          traceDiagonalDescendentLeftToRight(piece.coordinates) ||
          traceDiagonalDescendentRightToLeft(piece.coordinates)
        ) {
          isChecked = true;
          break;
        }
        break;
      case "queen":
        if (
          traceDiagonalAscendentLeftToRight(piece.coordinates) ||
          traceDiagonalAscendentRightToLeft(piece.coordinates) ||
          traceDiagonalDescendentLeftToRight(piece.coordinates) ||
          traceDiagonalDescendentRightToLeft(piece.coordinates) ||
          traceVerticalAscendent(piece.coordinates) ||
          traceVerticalDescendent(piece.coordinates) ||
          traceHorizontalLeftToRight(piece.coordinates) ||
          traceHorizontalRightToLeft(piece.coordinates)
        ) {
          isChecked = true;
          break;
        }

        break;
      case "rook":
        if (
          traceHorizontalLeftToRight(piece.coordinates) ||
          traceHorizontalRightToLeft(piece.coordinates) ||
          traceVerticalAscendent(piece.coordinates) ||
          traceVerticalDescendent(piece.coordinates)
        ) {
          isChecked = true;
          break;
        }
        break;
    }
  });
  return isChecked;
}
//idea: en funcio de la funcio, valga la redundància, obtindre un array de posicions des de l'actual, fins al límit
//filtrar els elements per la posicio
//ordenarlos en funcio de l'ordre del rang
//agafar el primer objecte-> si es rey -> check
function traceVerticalAscendent(coordinates) {
  /*lletra constant numero augmenta*/
  let position = coordinates;
  const letter = position.split("")[0];
  let num = parseInt(position.split("")[1]);
  let verticalAscendentRange = [];
  while (!verticalAscendentRange.some((xy) => limits.includes(xy))) {
    //en el moment que hi haja un element de limits inclos en verticalAscendentRange pararà, i l'ultim element serà el limit. deurem llevarlo
    ++num;
    verticalAscendentRange.push(letter + num);
  }
  /*llevem l'ultim element de l'array*/
  if (verticalAscendentRange.length > 0) {
    verticalAscendentRange.pop();
  }

  return filterOrderAndGetFirstElement(verticalAscendentRange);
}
function traceVerticalDescendent(coordinates) {
  //letra constant numero disminueix
  let position = coordinates;
  const letter = position.split("")[0];
  let num = parseInt(position.split("")[1]);
  let verticalDescendentRange = [];
  while (!verticalDescendentRange.some((xy) => limits.includes(xy))) {
    //en el moment que hi haja un element de limits inclos en verticalAscendentRange pararà, i l'ultim element serà el limit. deurem llevarlo
    --num;
    verticalDescendentRange.push(letter + num);
  }
  /*llevem l'ultim element de l'array*/
  //si sols te un element serà un limit
  if (verticalDescendentRange.length > 0) {
    verticalDescendentRange.pop();
  }
  return filterOrderAndGetFirstElement(verticalDescendentRange);
}
function traceHorizontalLeftToRight(coordinates) {
  //num constant lletra augmenta
  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  const num = position.split("")[1];

  let horizontalLeftToRightRange = [];

  while (!horizontalLeftToRightRange.some((xy) => limits.includes(xy))) {
    //en el moment que hi haja un element de limits inclos en verticalAscendentRange pararà, i l'ultim element serà el limit. deurem llevarlo
    ++letter;
    horizontalLeftToRightRange.push(String.fromCharCode(letter) + num);
  }
  if (horizontalLeftToRightRange.length > 0) {
    horizontalLeftToRightRange.pop();
  }
  return filterOrderAndGetFirstElement(horizontalLeftToRightRange);
}
function traceHorizontalRightToLeft(coordinates) {
  //num constant lletra disminueix
  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  const num = position.split("")[1];

  let horizontalRightToLeftRange = [];

  while (!horizontalRightToLeftRange.some((xy) => limits.includes(xy))) {
    //en el moment que hi haja un element de limits inclos en verticalAscendentRange pararà, i l'ultim element serà el limit. deurem llevarlo
    --letter;
    horizontalRightToLeftRange.push(String.fromCharCode(letter) + num);
  }
  if (horizontalRightToLeftRange.length > 0) {
    horizontalRightToLeftRange.pop();
  }
  return filterOrderAndGetFirstElement(horizontalRightToLeftRange);
}
function traceDiagonalAscendentLeftToRight(coordinates) {
  //el tema del control del jaque amb peons el controlarem a ma i iau
  //lletra ++ num ++
  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  let num = parseInt(position.split("")[1]);

  let diagonalAscendentLeftToRight = [];

  while (!diagonalAscendentLeftToRight.some((xy) => limits.includes(xy))) {
    //en el moment que hi haja un element de limits inclos en verticalAscendentRange pararà, i l'ultim element serà el limit. deurem llevarlo
    ++letter;
    ++num;
    diagonalAscendentLeftToRight.push(String.fromCharCode(letter) + num);
  }

  if (diagonalAscendentLeftToRight.length > 0) {
    diagonalAscendentLeftToRight.pop();
  }
  return filterOrderAndGetFirstElement(diagonalAscendentLeftToRight);
}
function traceDiagonalAscendentRightToLeft(coordinates) {
  //lletra -- num ++
  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  let num = parseInt(position.split("")[1]);

  let diagonalAscendentRightToLeft = [];

  while (!diagonalAscendentRightToLeft.some((xy) => limits.includes(xy))) {
    //en el moment que hi haja un element de limits inclos en verticalAscendentRange pararà, i l'ultim element serà el limit. deurem llevarlo
    --letter;
    ++num;
    diagonalAscendentRightToLeft.push(String.fromCharCode(letter) + num);
  }

  if (diagonalAscendentRightToLeft.length > 0) {
    diagonalAscendentRightToLeft.pop();
  }
  return filterOrderAndGetFirstElement(diagonalAscendentRightToLeft);
}
function traceDiagonalDescendentLeftToRight(coordinates) {
  //lletra++ num --

  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  let num = parseInt(position.split("")[1]);

  let diagonalDescendentLeftToRight = [];

  while (!diagonalDescendentLeftToRight.some((xy) => limits.includes(xy))) {
    //en el moment que hi haja un element de limits inclos en verticalAscendentRange pararà, i l'ultim element serà el limit. deurem llevarlo
    ++letter;
    --num;
    diagonalDescendentLeftToRight.push(String.fromCharCode(letter) + num);
  }

  if (diagonalDescendentLeftToRight.length > 0) {
    diagonalDescendentLeftToRight.pop();
  }
  return filterOrderAndGetFirstElement(diagonalDescendentLeftToRight);
}
function traceDiagonalDescendentRightToLeft(coordinates) {
  //lletra -- num --

  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  let num = parseInt(position.split("")[1]);

  let diagonalDescendentRightToLeft = [];

  while (!diagonalDescendentRightToLeft.some((xy) => limits.includes(xy))) {
    //en el moment que hi haja un element de limits inclos en verticalAscendentRange pararà, i l'ultim element serà el limit. deurem llevarlo
    --letter;
    --num;
    diagonalDescendentRightToLeft.push(String.fromCharCode(letter) + num);
  }

  if (diagonalDescendentRightToLeft.length > 0) {
    diagonalDescendentRightToLeft.pop();
  }
  return filterOrderAndGetFirstElement(diagonalDescendentRightToLeft);
}
function tracePositionsKnight(coordinates) {}
function filterOrderAndGetFirstElement(range) {
  if (range > 0) {
    let piecesInRange = gameState.piecesAlive.filter((piece) =>
      range.includes(piece.coordinates)
    );
    //ara les ordenem
    let piecesInRangeSorted = [];
    for (const xy of range) {
      for (const piece of piecesInRange) {
        if (xy === piece.coordinates) {
          piecesInRangeSorted.push(piece);
          break;
        }
      }
    }
    //ara agafem la primera posicio de l'array de peces ordenat
    return (
      piecesInRangeSorted[0].type === "king" &&
      piecesInRangeSorted[0].color === gameState.turn
    );
  }
  return false;
}
