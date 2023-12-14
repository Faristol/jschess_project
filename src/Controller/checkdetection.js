//Explicació a grans trets de l'algoritme:
//S'agafen les peces de l'oponent i en funció del tipus de peça s'aplica les seues funcions de moviment
//p.ex -> per a la torre s'apliquen les funcions de generació de rangs horitzontals, doncs
//és l'única direcció vàlida per a la peça
//Aquestes funcions tracen un rang de coordenades fins que es topen amb l'última peça
//Si l'última peça es el rei de l'oponent hi ha jaque.
export {
  limits
};
export { isKingCheck,piecesMovementHandler,filterOrderAndGetFirstElement };

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

function isKingCheck(turn,piecesAlive) {
  const colorPiecesOpponent = turn === "white" ? "black" : "white";
  const king = piecesAlive.find(
    (piece) => piece.type === "king" && piece.color === turn
  );
  console.log("El rey "+king);
  console.log("El color "+turn);
  const piecesOpponent = [];
  piecesAlive.forEach((piece) => {
    if (piece.color === colorPiecesOpponent) {
      piecesOpponent.push(piece);
    }
  });
  let isChecked = false;
  isChecked = piecesMovementHandler(piecesOpponent, king, isChecked,piecesAlive,turn);
  return isChecked;
}

function piecesMovementHandler(piecesOpponent, king, isChecked,piecesAlive,turn) {
  piecesOpponent.forEach((piece) => {
    switch (piece.type) {
      case "pawn":
        if (piece.color === "white") {
          if (
            traceDiagonalAscendentLeftToRight(piece.coordinates, 1, king,piecesAlive,turn) ||
            traceDiagonalAscendentRightToLeft(piece.coordinates, 1, king,piecesAlive,turn)
          ) {
            isChecked = true;
            break;
          }
        } else {
          if (
            traceDiagonalDescendentLeftToRight(piece.coordinates, 1, king,piecesAlive,turn) ||
            traceDiagonalDescendentRightToLeft(piece.coordinates, 1, king,piecesAlive,turn)
          ) {
            isChecked = true;
            break;
          }
        }

        break;
      case "knight":
        if (tracePositionsKnight(piece.coordinates, king)) {
          isChecked = true;
          break;
        }
        break;
      case "bishop":
        if (
          traceDiagonalAscendentLeftToRight(piece.coordinates,undefined,undefined,piecesAlive,turn) ||
          traceDiagonalAscendentRightToLeft(piece.coordinates,undefined,undefined,piecesAlive,turn) ||
          traceDiagonalDescendentLeftToRight(piece.coordinates,undefined,undefined,piecesAlive,turn) ||
          traceDiagonalDescendentRightToLeft(piece.coordinates,undefined,undefined,piecesAlive,turn)
        ) {
          isChecked = true;
          break;
        }
        break;
      case "queen":
        if (
          traceDiagonalAscendentLeftToRight(piece.coordinates,undefined,undefined,piecesAlive,turn) ||
          traceDiagonalAscendentRightToLeft(piece.coordinates,undefined,undefined,piecesAlive,turn) ||
          traceDiagonalDescendentLeftToRight(piece.coordinates,undefined,undefined,piecesAlive,turn) ||
          traceDiagonalDescendentRightToLeft(piece.coordinates,undefined,undefined,piecesAlive,turn) ||
          traceVerticalAscendent(piece.coordinates,piecesAlive,turn) ||
          traceVerticalDescendent(piece.coordinates,piecesAlive,turn) ||
          traceHorizontalLeftToRight(piece.coordinates,piecesAlive,turn) ||
          traceHorizontalRightToLeft(piece.coordinates,piecesAlive,turn)
        ) {
          isChecked = true;
          break;
        }

        break;
      case "rook":
        if (
          traceHorizontalLeftToRight(piece.coordinates,piecesAlive,turn) ||
          traceHorizontalRightToLeft(piece.coordinates,piecesAlive,turn) ||
          traceVerticalAscendent(piece.coordinates,piecesAlive,turn) ||
          traceVerticalDescendent(piece.coordinates,piecesAlive,turn)
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
function traceVerticalAscendent(coordinates,piecesAlive,turn) {
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

  return filterOrderAndGetFirstElement(verticalAscendentRange,piecesAlive,turn);
}
function traceVerticalDescendent(coordinates,piecesAlive,turn) {
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
  return filterOrderAndGetFirstElement(verticalDescendentRange,piecesAlive,turn);
}
function traceHorizontalLeftToRight(coordinates,piecesAlive,turn) {
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
  return filterOrderAndGetFirstElement(horizontalLeftToRightRange,piecesAlive,turn);
}
function traceHorizontalRightToLeft(coordinates,piecesAlive,turn) {
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
  return filterOrderAndGetFirstElement(horizontalRightToLeftRange,piecesAlive,turn);
}
function traceDiagonalAscendentLeftToRight(coordinates, pawn, king,piecesAlive,turn) {
  //el tema del control del jaque amb peons el controlarem a ma i iau
  //lletra ++ num ++
  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  let num = parseInt(position.split("")[1]);
  if (pawn === undefined) {
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
    return filterOrderAndGetFirstElement(diagonalAscendentLeftToRight,piecesAlive,turn);
  }
  ++letter;
  ++num;
  let endPosition = String.fromCharCode(letter) + num;
  return endPosition === king.coordinates;
}
function traceDiagonalAscendentRightToLeft(coordinates, pawn, king,piecesAlive,turn) {
  //lletra -- num ++
  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  let num = parseInt(position.split("")[1]);
  if (pawn === undefined) {
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
    return filterOrderAndGetFirstElement(diagonalAscendentRightToLeft,piecesAlive,turn);
  }
  --letter;
  ++num;
  let endPosition = String.fromCharCode(letter) + num;
  return endPosition === king.coordinates;
}
function traceDiagonalDescendentLeftToRight(coordinates, pawn, king,piecesAlive,turn) {
  //lletra++ num --
  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  let num = parseInt(position.split("")[1]);
  if (pawn === undefined) {
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
    return filterOrderAndGetFirstElement(diagonalDescendentLeftToRight,piecesAlive,turn);
  }
  ++letter;
  --num;
  let endPosition = String.fromCharCode(letter) + num;
  return endPosition === king.coordinates;
}
function traceDiagonalDescendentRightToLeft(coordinates, pawn, king,piecesAlive,turn) {
  //lletra -- num --
  let position = coordinates;
  let letter = position.split("")[0].charCodeAt(0);
  let num = parseInt(position.split("")[1]);
  if (pawn === undefined) {
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
    return filterOrderAndGetFirstElement(diagonalDescendentRightToLeft,piecesAlive,turn);
  }
  --letter;
  --num;
  let endPosition = String.fromCharCode(letter) + num;
  return endPosition === king.coordinates;
}
function tracePositionsKnight(coordinates, king) {
  const coordinatesKing = king.coordinates;
  let startLetter = coordinates.split("")[0].charCodeAt(0);
  let startNumber = parseInt(coordinates.split("")[1]);
  let possibleMovements = [];
  /*cavall 8 possibles moviments*/
  /*char +1 num +2*/
  possibleMovements.push(
    String.fromCharCode(startLetter + 1) + (startNumber + 2)
  );
  /*char +2 num+1*/
  possibleMovements.push(
    String.fromCharCode(startLetter + 2) + (startNumber + 1)
  );
  /*char +2 num -1*/
  possibleMovements.push(
    String.fromCharCode(startLetter + 2) + (startNumber - 1)
  );
  /*char +1 num-2*/
  possibleMovements.push(
    String.fromCharCode(startLetter + 1) + (startNumber - 2)
  );
  /*char -1 num +2*/
  possibleMovements.push(
    String.fromCharCode(startLetter - 1) + (startNumber + 2)
  );
  /*char -2 num +1*/
  possibleMovements.push(
    String.fromCharCode(startLetter - 2) + (startNumber + 1)
  );
  /*char -2 num -1*/
  possibleMovements.push(
    String.fromCharCode(startLetter - 2) + (startNumber - 1)
  );
  /*char -1 num -2*/
  possibleMovements.push(
    String.fromCharCode(startLetter - 1) + (startNumber - 2)
  );
  //si el rey està posicionat en alguna d'aquestes posicions-> jaque
  return possibleMovements.includes(coordinatesKing);
}
function filterOrderAndGetFirstElement(range,piecesAlive,turn) {
  if (range.length > 0) {
    let piecesInRange = piecesAlive.filter((piece) =>
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
    if (piecesInRangeSorted.length > 0) {
      //ara agafem la primera posicio de l'array de peces ordenat i si es un rey, doncs serà jaque
      return (
        piecesInRangeSorted[0].type === "king" &&
        piecesInRangeSorted[0].color === turn
      );
    }
  }
  return false;
}
