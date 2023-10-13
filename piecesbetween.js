export {
  getPieceObject,
  range,
  rangeLetter,
  rangeDiagonalLetter,
  isPathBlocked,
  hasPieces,
};
import { gameState } from "./main.js";
function getPieceObject(start, pieceType) {
  let pieceObject = gameState.piecesAlive.find(
    (piece) => piece.coordinates === start && piece.type === pieceType
  );
  return pieceObject;
}
function isPathBlocked(range) {
  let index = gameState.piecesAlive.findIndex((piece) =>
    range.includes(piece.coordinates)
  );
  return index !== -1;
}

function range(min, max, letter) {
  let range = [];
  for (let i = min + 1; i < max; i++) {
    range.push(letter + i);
  }
  return range;
}

function rangeLetter(start, end, num) {
  let rangeLetter = [];
  const startLetter = start.charCodeAt(0);
  const endLetter = end.charCodeAt(0);
  for (let i = startLetter + 1; i < endLetter; i++) {
    rangeLetter.push(String.fromCharCode(i) + num);
  }
  return rangeLetter;
}

function rangeDiagonalLetter(start, end) {
  let rangeLetter = [];
  for (let i = start + 1; i < end; i++) {
    rangeLetter.push(String.fromCharCode(i));
  }
  return rangeLetter;
}

function hasPieces(start, end) {
  /*primer veure si es un moviment horizontal, vertical, diagonal, o, és una L (cavall)*/
  /*HORIZONTAL->  numero constant varia lletra*/
  /*VERTICAL ->  numero variable lletra constant*/
  let startLetterNumber = start.split("");
  let endLetterNumber = end.split("");

  if (startLetterNumber[0] === endLetterNumber[0]) {
    let rangeVertical;
    //vertical
    if (parseInt(startLetterNumber[1]) < endLetterNumber[1]) {
      //console.log("moviment vertical ascendent");
      /*Moviment vertical ascendent*/
      /*ara obtinguem el rang de valors que hi ha del numero menut al gran*/
      /*despres recorreguent l'array de peces vives vegem si hi ha alguna que coincideix amb la posicio*/
      rangeVertical = range(
        parseInt(startLetterNumber[1]),
        parseInt(endLetterNumber[1]),
        startLetterNumber[0]
      );
      return isPathBlocked(rangeVertical);
    } else {
      /*Moviment vertical descendent*/
      //console.log("moviment vertical descendent");
      rangeVertical = range(
        parseInt(endLetterNumber[1]),
        parseInt(startLetterNumber[1]),
        startLetterNumber[0]
      );
      return isPathBlocked(rangeVertical);
    }
  } else if (startLetterNumber[1] === endLetterNumber[1]) {
    let rangeHorizontal;
    /*ARA L'HORIZONTAL sera horizontal si el num es constant*/
    if (startLetterNumber[0] < endLetterNumber[0]) {
      /*DESPLAÇAMENT HORITZONTAL D'ESQUERRA A DRETA*/
      //console.log("moviment horitzontal esquerra-dreta");
      rangeHorizontal = rangeLetter(
        startLetterNumber[0],
        endLetterNumber[0],
        startLetterNumber[1]
      );
      return isPathBlocked(rangeHorizontal);
    } else {
      /*DESPLAÇAMENT HORITZONTAL DE DRETA A ESQUERRA*/
      //console.log("moviment horitzontal dreta-esquerra");
      rangeHorizontal = rangeLetter(
        endLetterNumber[0],
        startLetterNumber[0],
        startLetterNumber[1]
      );
      return isPathBlocked(rangeHorizontal);
    }
  } else {
    /*diagonal*/
    /*primer calculem la diferencia entre lletres i num, si son iguals es diagonal*/
    let startLetter = startLetterNumber[0].charCodeAt(0);
    let endLetter = endLetterNumber[0].charCodeAt(0);
    let startNumber = parseInt(startLetterNumber[1]);
    let endNumber = parseInt(endLetterNumber[1]);
    /*dona igual si restem 0-f o f-0,sempre i quan apliquem el mateix criteri de resta a lletres i nums*/

    let letterDifference = Math.abs(startLetter - endLetter);
    let numDifference = Math.abs(startNumber - endNumber);

    if (letterDifference === numDifference) {
      /*es diagonal*/
      /*després vegem la direccio i recorreguem els elements*/
      /*si la lletra d'inici és menor que la final, va d'esquerra a dreta*/
      /*1 esquerra-dreta, -1 dreta-esquerra*/
      const directionX = startLetter < endLetter ? 1 : -1;
      /*1 ascendent*/
      const directionY = startNumber < endNumber ? 1 : -1;
      /*4 casos
          ->Dalt-baix(num sempre baixen) -> d'esquerra a dreta -> ordre alfabètic lletres ++
                                         -> dreta a esquerra   -> lletres --
          ->Baix-dalt (num sempre pugen) -> d'esquerra a dreta -> alfabètic
                                        -> dreta a esquerra    -> lletres --
          */

      if (directionY === 1) {
        let rangeLetterAscendent;
        if (directionX === 1) {
          //console.log("moviment diagonal ascendent esquerra-dreta");
          rangeLetterAscendent = rangeDiagonalLetter(startLetter, endLetter);
          ++startNumber;
          let rangeLetterNumberDiagonal = rangeLetterAscendent.map(
            (letter, index) => letter + (startNumber + index)
          );
          console.log(rangeLetterNumberDiagonal);
          return isPathBlocked(rangeLetterNumberDiagonal);
        } else {
          //console.log("moviment diagonal ascendent dreta-esquerra-");
          rangeLetterAscendent = rangeDiagonalLetter(endLetter, startLetter);
          --endNumber;
          let rangeLetterNumberDiagonal = rangeLetterAscendent.map(
            (letter, index) => letter + (endNumber - index)
          );
          return isPathBlocked(rangeLetterNumberDiagonal);
        }
      } else {
        let rangeLetterDescendent;
        if (directionX === 1) {
          rangeLetterDescendent = rangeDiagonalLetter(startLetter, endLetter);
          //console.log("moviment diagonal descendent esquerra-dreta");
          --startNumber;
          let rangeLetterNumberDiagonal = rangeLetterDescendent.map(
            (letter, index) => letter + (startNumber - index)
          );
          return isPathBlocked(rangeLetterNumberDiagonal);
        } else {
          rangeLetterDescendent = rangeDiagonalLetter(endLetter, startLetter);
          //console.log("moviment diagonal descendent dretaesquerra-");
          ++endNumber;
          let rangeLetterNumberDiagonal = rangeLetterDescendent.map(
            (letter, index) => letter + (endNumber + index)
          );
          return isPathBlocked(rangeLetterNumberDiagonal);
        }
      }
    } else {
      //console.log("moviment estrany");
      /*no ho és, a efectes pràctics retornarem false->
          en cada peça aplicarem la seua lògica de moviment
          aleshores, no passa res, si un peo (p.ex.) arriba aci doncs, en la seua lògica interna
          sabrem que es un moviment invàlid
          */
      return false;
    }
  }
}
