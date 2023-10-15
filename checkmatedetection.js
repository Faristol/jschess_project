//per a que es done el jaque mate es deuen donar simultàniament tres condicions
/*
1)Totes les casselles alvoltant del rei estan amenaçades, incloent la seua
//idea per a la comprovacio 1:
pillar les posicions annexes al rei i la seua, excloure aquelles que sobrepassen els limits del tauler
comprovar usant el codi de checkdetection si totes les casselles estan amenaçades
2)No es pot bloquejar el jaque mate amb una peça propia
3)No es pot capturar la/les peces que amenacen al rei
provar tots els moviments possibles que pot fer en les seues peces, per cada moviment revisar les casselles amenaçades del rei, 
si hi ha una sense amenaçar es pot lliurar el jaque mate.
*/
import { Bishop } from "./piecesobjects/bishop.js";
import { King } from "./piecesobjects/king.js";
import { Knight } from "./piecesobjects/knight.js";
import { Pawn } from "./piecesobjects/pawn.js";
import { Queen } from "./piecesobjects/queen.js";
import { Rook } from "./piecesobjects/rook.js";
import { PieceFather } from "./piecesobjects/piecefather.js";
import {
  getPieceObject,
  isPathBlocked,
  range,
  rangeLetter,
  rangeDiagonalLetter,
  hasPieces,
} from "./piecesbetween.js";
import { isMovementValidHandler } from "./main.js";
import { gameState } from "./main.js";
import { limits } from "./checkdetection.js";
export { isCheckMate };
function isCheckMate(turn) {
  const copyPiecesAlive = gameState.piecesAlive.map((piece) => piece.clone());
  let copyOfCopyPiecesAlive = copyPiecesAlive.map((piece) => piece.clone());
  const colorPiecesOpponent = turn === "white" ? "black" : "white";
  const piecesOpponent = [];
  gameState.piecesAlive.forEach((piece) => {
    if (piece.color === colorPiecesOpponent) {
      piecesOpponent.push(piece);
    }
  });
  const king = gameState.piecesAlive.find(
    (piece) => piece.type === "king" && piece.color === turn
  );
  //agafem el rei
  //ara calculem les posicions circumdants
  let closePositionsKing = [];
  closePositionsKing = calculateNearPositions(king.coordinates);
  console.log(closePositionsKing);
  //ara llevem les posicions que tenen una peça del seu color
  gameState.piecesAlive.forEach((piece) => {
    closePositionsKing.forEach((position, index) => {
      if (
        piece.color === turn &&
        piece.type !== 'king' &&
        piece.coordinates === position
      ) {
        
        //si hi ha alguna peça al seu voltant que siga del color del torn (del rei q estem avaluant el jm) i que no siga rei
        closePositionsKing.splice(index, 1);
      }
    });
  });
  console.log(closePositionsKing);
  //una vegada tinguem l'array de posicions evaluem si en totes les peces hi ha jaque:
  //el codi sera similar a el check detection, de fet fare copia i pega i modificare certes coses
  //tambe ho adaptare per a que detecte si hi ha un jaque, aixina aprofite i li clave un so to flama
  
    if (areAllPositionsChecked(piecesOpponent, closePositionsKing,turn)) {
      console.log("totes les circumdants estan en jaque");
      if (!canStopCheck(copyPiecesAlive, copyOfCopyPiecesAlive, turn, king)) {
        console.log("jaque mate ateos");
        return true;
      }
    }

  
  return false;
}
function calculateNearPositions(kingCoordinates) {
  let positions = [];

  let letter = kingCoordinates.split("")[0].charCodeAt(0);
  let num = parseInt(kingCoordinates.split("")[1]);

  let startLetterFor = letter - 1;
  let startNumFor = num + 1;

  let endLetterFor = letter + 1;
  let endNumFor = num - 1;
  for (let i = startLetterFor; i <= endLetterFor; i++) {
    let letter = String.fromCharCode(i);
    for (let j = startNumFor; j >= endNumFor; j--) {
      let num = j;
      let position = letter + num;
      if (!limits.includes(position)) {
        positions.push(position);
      }
    }
  }
  return positions;
}
function areAllPositionsChecked(piecesOpponent, closePositionsKing,turn) {
  let checks = 0;
  for (let i = 0; i < closePositionsKing.length; i++) {
    console.log(closePositionsKing[i]);
    if (isCheckedClosePosition(piecesOpponent, closePositionsKing[i],turn)) {
      checks++;
      console.log(checks);
    }
  }
  console.log(turn);
  console.log(checks);
 return checks>=closePositionsKing.length;
}
function isCheckedClosePosition(piecesOpponent, closePosition,turn) {
  return piecesMovementHandler(piecesOpponent, closePosition,turn);
}
function piecesMovementHandler(piecesOpponent, closePosition,turn) {
  piecesOpponent.forEach((piece) => {
    switch (piece.type) {
      case "pawn":
        if (piece.color === "white") {
          if (
            traceDiagonalAscendentLeftToRight(
              piece.coordinates,
              1,
              closePosition,turn
            ) ||
            traceDiagonalAscendentRightToLeft(
              piece.coordinates,
              1,
              closePosition,turn
            )
          ) {
            return true;
            break;
          }
        } else {
          if (
            traceDiagonalDescendentLeftToRight(
              piece.coordinates,
              1,
              closePosition,turn
            ) ||
            traceDiagonalDescendentRightToLeft(
              piece.coordinates,
              1,
              closePosition,turn
            )
          ) {
            return true;
            break;
          }
        }

        break;
      case "knight":
        if (tracePositionsKnight(piece.coordinates, closePosition,turn)) {
          return true;
          break;
        }
        break;
      case "bishop":
        if (
          traceDiagonalAscendentLeftToRight(piece.coordinates,undefined,closePosition,turn) ||
          traceDiagonalAscendentRightToLeft(piece.coordinates,undefined,closePosition,turn) ||
          traceDiagonalDescendentLeftToRight(piece.coordinates,undefined,closePosition,turn) ||
          traceDiagonalDescendentRightToLeft(piece.coordinates,undefined,closePosition,turn)
        ) {
          return true;
          break;
        }
        break;
      case "queen":
        if (
          traceDiagonalAscendentLeftToRight(piece.coordinates,undefined,closePosition,turn) ||
          traceDiagonalAscendentRightToLeft(piece.coordinates),undefined,closePosition,turn ||
          traceDiagonalDescendentLeftToRight(piece.coordinates,undefined,closePosition,turn) ||
          traceDiagonalDescendentRightToLeft(piece.coordinates,undefined,closePosition,turn) ||
          traceVerticalAscendent(piece.coordinates,closePosition,turn) ||
          traceVerticalDescendent(piece.coordinates,closePosition,turn) ||
          traceHorizontalLeftToRight(piece.coordinates,closePosition,turn) ||
          traceHorizontalRightToLeft(piece.coordinates,closePosition,turn)
        ) {
          return true;
          break;
        }

        break;
      case "rook":
        if (
          traceHorizontalLeftToRight(piece.coordinates,closePosition,turn) ||
          traceHorizontalRightToLeft(piece.coordinates,closePosition,turn) ||
          traceVerticalAscendent(piece.coordinates,closePosition,turn) ||
          traceVerticalDescendent(piece.coordinates,closePosition,turn)
        ) {
          return true;
          break;
        }
        break;
    }
  });
  return false;
}
function traceVerticalAscendent(coordinates,closePosition,turn) {
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

  return filterOrderSliceAndEvaluate(verticalAscendentRange, closePosition,turn);
}
function traceVerticalDescendent(coordinates,closePosition,turn) {
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
  return filterOrderSliceAndEvaluate(verticalDescendentRange, closePosition,turn);
}
function traceHorizontalLeftToRight(coordinates,closePosition,turn) {
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
  return filterOrderSliceAndEvaluate(horizontalLeftToRightRange, closePosition,turn);
}
function traceHorizontalRightToLeft(coordinates,closePosition,turn) {
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
  return filterOrderSliceAndEvaluate(horizontalRightToLeftRange, closePosition,turn);
}
function traceDiagonalAscendentLeftToRight(coordinates, pawn, closePosition,turn) {
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
    return filterOrderSliceAndEvaluate(
      diagonalAscendentLeftToRight,
      closePosition,turn
    );
  }
  ++letter;
  ++num;
  let endPosition = String.fromCharCode(letter) + num;
  return endPosition === closePosition;
}
function traceDiagonalAscendentRightToLeft(coordinates, pawn, closePosition,turn) {
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
    return filterOrderSliceAndEvaluate(
      diagonalAscendentRightToLeft,
      closePosition,turn
    );
  }
  --letter;
  ++num;
  let endPosition = String.fromCharCode(letter) + num;
  return endPosition === closePosition;
}
function traceDiagonalDescendentLeftToRight(coordinates, pawn, closePosition,turn) {
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
    return filterOrderSliceAndEvaluate(
      diagonalDescendentLeftToRight,
      closePosition,turn
    );
  }
  ++letter;
  --num;
  let endPosition = String.fromCharCode(letter) + num;
  return endPosition === closePosition;
}
function traceDiagonalDescendentRightToLeft(coordinates, pawn, closePosition,turn) {
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
    return filterOrderSliceAndEvaluate(
      diagonalDescendentRightToLeft,
      closePosition,turn
    );
  }
  --letter;
  --num;
  let endPosition = String.fromCharCode(letter) + num;
  return endPosition === closePosition;
}
function tracePositionsKnight(coordinates, closePosition,turn) {
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
  return possibleMovements.includes(closePosition);
}
//aci
function filterOrderSliceAndEvaluate(range, closePosition, turn) {
  console.log(range+" "+closePosition);
  if (range.length > 0) {
    let piecesInRange = gameState.piecesAlive.filter((piece) =>
      range.includes(piece.coordinates)
    );

  
    let piecesInRangeSorted = [];
    for (const xy of range) {
      for (const piece of piecesInRange) {
        if (xy === piece.coordinates) {
          piecesInRangeSorted.push(piece);
          break;
        }
      }
    }

    // Tallem el rango
    if (piecesInRange.length > 0) {
      const indexToCut = range.indexOf(piecesInRangeSorted[0].coordinates);
      if (indexToCut !== -1) {
        const slicedArray = range.slice(0, indexToCut + 1);
        range = slicedArray; 
      }

      if (piecesInRangeSorted[0].type === "king" && piecesInRangeSorted[0].color === turn) {
        return true;
      }
    }

    return range.includes(closePosition);
  }

  return false;
}
function canStopCheck(CopyPiecesAlive, copyOfCopyPiecesAlive, turn, king) {
  /*estava pensant en fer-ho a base de força bruta pero ho veig terrible*/
  /*
    2)quines son les caselles que haurem de bloquejar? si es que es pot escapar del jaque mate...
    3) si es que hi ha alguna manera de parar un jaque mate, podem obtindre les posicions a partir de les cuals es pot donar jaque mate,
    determinar les peces que estan en el radi de jaque del rey
    */
  //per a determinar les "hot positions haurem de traçar una vertical una horitzontal, les diagonals, y les posicions dels cavalls"
  const kingPosition = king.coordinates;
  let verticalAscendentRange = traceVerticalAscendentRange(kingPosition);
  let verticalDescendentRange = traceVerticalDescendentRange(kingPosition);
  let horizontalLeftToRightRange =
    traceHorizontalLeftToRightRange(kingPosition);
  let horizontalRightToLeftRange =
    traceHorizontalRightToLeftRange(kingPosition);
  let diagonalAscendentLeftToRightRange =
    traceDiagonalAscendentLeftToRightRange(kingPosition);
  let diagonalAscendentRightToLeftRange =
    traceDiagonalAscendentRightToLeftRange(kingPosition);
  let diagonalDescendentLeftToRightRange =
    traceDiagonalDescendentLeftToRightRange(kingPosition);
  let diagonalDescendentRightToLeftRange =
    traceDiagonalDescendentRightToLeftRange(kingPosition);
  let positionsKnightRange = tracePositionsKnightRange(kingPosition);
  /*ara vegem les branques on realment estan les amenaces*/
  /*la funcio relevantOrIrrelevantBranch el que fara primer de tot es anar recorreguent el array, si la primera peça es del color del torn no representa una amenaça, si la primera es del color opost i no es ni rook ni queen no representa cap amenaça
si en la branca no hi ha cap peça no representa cap amenaça. En cas de detectar-se una amenaça tornarà la branca des de l'inici fins a la peça incloent-la, ademés s'afegirà ixa peça a les peces que amenacen el rei.
*/
  //si hi ha algun rei amenaçant alguna peça colindant, el obviem, doncs no constitueix una amenaça
  //pq no pot fer jaque, i apart no es pot capturar
  let mapPieceRange = new Map();
  relevantOrIrrelevantBranch(
    verticalAscendentRange,
    ["rook", "queen"],
    turn,
    CopyPiecesAlive,
    kingPosition,
    mapPieceRange
  );
  relevantOrIrrelevantBranch(
    verticalDescendentRange,
    ["rook", "queen"],
    turn,
    CopyPiecesAlive,
    kingPosition,
    mapPieceRange
  );
  relevantOrIrrelevantBranch(
    horizontalLeftToRightRange,
    ["rook", "queen"],
    turn,
    CopyPiecesAlive,
    kingPosition,
    mapPieceRange
  );
  relevantOrIrrelevantBranch(
    horizontalRightToLeftRange,
    ["rook", "queen"],
    turn,
    CopyPiecesAlive,
    kingPosition,
    mapPieceRange
  );
  if (turn === "black") {
    /*el peo amenaçador serà el blanc i podrà amenaçar en diagonal ascendent*/
    relevantOrIrrelevantBranch(
      diagonalDescendentLeftToRightRange,
      ["queen", "bishop"],
      turn,
      CopyPiecesAlive,
      kingPosition,
      mapPieceRange
    );
    relevantOrIrrelevantBranch(
      diagonalDescendentRightToLeftRange,
      ["queen", "bishop"],
      turn,
      CopyPiecesAlive,
      kingPosition,
      mapPieceRange
    );
    relevantOrIrrelevantBranch(
      diagonalAscendentLeftToRightRange,
      ["queen", "bishop", "pawn"],
      turn,
      CopyPiecesAlive,
      kingPosition,
      mapPieceRange
    );
    relevantOrIrrelevantBranch(
      diagonalAscendentRightToLeftRange,
      ["queen", "bishop", "pawn"],
      turn,
      CopyPiecesAlive,
      kingPosition,
      mapPieceRange
    );
  } else {
    /*el peo amenaçador serà el negre i podrà amenaçar en diagonal descendent*/
    relevantOrIrrelevantBranch(
      diagonalDescendentLeftToRightRange,
      ["queen", "bishop", "pawn"],
      turn,
      CopyPiecesAlive,
      kingPosition,
      mapPieceRange
    );
    relevantOrIrrelevantBranch(
      diagonalDescendentRightToLeftRange,
      ["queen", "bishop", "pawn"],
      turn,
      CopyPiecesAlive,
      kingPosition,
      mapPieceRange
    );
    relevantOrIrrelevantBranch(
      diagonalAscendentLeftToRightRange,
      ["queen", "bishop"],
      turn,
      CopyPiecesAlive,
      kingPosition,
      mapPieceRange
    );
    relevantOrIrrelevantBranch(
      diagonalAscendentRightToLeftRange,
      ["queen", "bishop"],
      turn,
      CopyPiecesAlive,
      kingPosition,
      mapPieceRange
    );
  }
  //en el de positions knight, sino hi ha cap cavall en eixes casselles branca fora
  //el tema de les amenaces dels cavalls ho evaluarem independentment doncs aquestos no es poden bloquejar o els mates o res
  relevantOrIrrelevantBranch(
    positionsKnightRange,
    ["knight"],
    turn,
    CopyPiecesAlive,
    kingPosition,
    mapPieceRange
  );
  //modus operandi
  //1) pillar les peces del color del torn (totes)
  let piecesColorTurn = [];
  CopyPiecesAlive.forEach((piece) => {
    if (piece.color === turn) {
      piecesColorTurn.push(piece);
    }
  });

  return checkMateValidatorIterator(
    CopyPiecesAlive,
    copyOfCopyPiecesAlive,
    piecesColorTurn,
    mapPieceRange,
    king
  );
}

function checkMateValidatorIterator(
  CopyPiecesAlive,
  copyOfCopyPiecesAlive,
  piecesColorTurn,
  mapPieceRange,
  king
) {
  for (const pieceAttacker of mapPieceRange) {
    let goBlock = true;
    //end
    let pieceType2 = pieceAttacker.type;
    let end =
      pieceAttacker.type +
      pieceAttacker.color +
      "_" +
      pieceAttacker.coordinates;
    for (let i = 0; i < piecesColorTurn.length; i++) {
      //start
      let start = piecesColorTurn[i].coordinates;
      let pieceType = piecesColorTurn[i].type;
      //isMovementValidHandler(start, end, pieceType, pieceType2)
      if (isMovementValidHandler(start, end, pieceType, pieceType2)) {
        //refresquem el array CopyOfCopyPiecesAlive
        //açò es captura
        //si el moviment es vàlid refresquem les peces mortes
        refreshPiecesDead(
          piecesColorTurn[i],
          pieceAttacker,
          copyOfCopyPiecesAlive
        );
        //vegem si permaneix el jaque:
        if (!isKingCheck(piecesColorTurn, copyOfCopyPiecesAlive)) {
          //si no està en jaque-> no és jaque mate
          //retornem true
          return true;
        } else {
          //si al carregarme la peça de la branca permaneix en jaque, implica que
          //no cal provar el bloqueig de les peces del seu radi d'influència, doncs
          //el jaque igualment no s'evitarà
          copyOfCopyPiecesAlive = CopyPiecesAlive.map((piece) => piece.clone());
          goBlock = false;
          break;
        }
      }
      copyOfCopyPiecesAlive = CopyPiecesAlive.map((piece) => piece.clone());
    }
    //quan arribe aci-> haurem comprovat amb totes les peces nostres si es pot atacar
    //les peces amenaçants, com el jaque perdura, vegem si podem bloquejar
    if (goBlock) {
      //si entra en goBlock implica que no ha trobat cap moviment valid de les seues peces
      //que llevara a la peça amenaçant i per tant procedim a veure si es pot bloquejar
      let stop = false;

      let positionsOfInfluencePieceAttacker = mapPieceRange.get(pieceAttacker);
      for (const positionOfInfluence of positionsOfInfluencePieceAttacker) {
        let end = positionOfInfluence;
        for (let i = 0; i < piecesColorTurn.length; i++) {
          let start = piecesColorTurn[i].coordinates;
          let pieceType = piecesColorTurn[i].coordinates;

          if (isMovementValidHandler(start, end, pieceType)) {
            refreshPositionPiecesAlive(start, end, copyOfCopyPiecesAlive);
            if (!isKingCheck(piecesColorTurn, copyOfCopyPiecesAlive)) {
              return true;
            } else {
              //si encara continua en jaque mate
              //no cal revisar les altres peces
              stop = true;
              copyOfCopyPiecesAlive = CopyPiecesAlive.map((piece) =>
                piece.clone()
              );
            }
          }
          copyOfCopyPiecesAlive = CopyPiecesAlive.map((piece) => piece.clone());
          if(stop){
            break;
          }
        }
      }
    }
  }
  //si després de tot arriba ací retornem false
  return false;
}
function refreshPositionPiecesAlive(
  idDestination0,
  idDestinationF,
  copyOfCopyPiecesAlive
) {
  /*actualitzem l'element mogut a la nova coordenada*/
  let index = copyOfCopyPiecesAlive.findIndex(
    (piece) => piece.coordinates === idDestination0
  );
  if (index !== -1) copyOfCopyPiecesAlive[index].coordinates = idDestinationF;
}
function refreshPiecesDead(pieceKiller, pieceToKill, copyOfCopyPiecesAlive) {
  let coordinates = pieceToKill.coordinates;
  let index = copyOfCopyPiecesAlive.findIndex(
    (piece) => piece.coordinates === coordinates
  );

  if (index !== -1) {
    let element = copyOfCopyPiecesAlive[index];
    copyOfCopyPiecesAlive.splice(index, 1);
    /*posicio inicial posicio final*/
    refreshPositionPiecesAlive(
      pieceKiller.coordinates,
      coordinates,
      copyOfCopyPiecesAlive
    );
  }
}

function relevantOrIrrelevantBranch(
  positions,
  potentialAttackers,
  turn,
  CopyPiecesAlive,
  kingPosition,
  mapPieceRange
) {
  //previ a açò haurem de fer un apartat per al cavall, doncs totes les posicions, si es que es trobe cavall
  //opost seran amenaces a validar
  if (potentialAttackers[0] === "knight") {
    //filtrem per peces de color opost que siguen cavalls i apart incloguen alguna de les posicions claus
    CopyPiecesAlive.filter((piece) => {
      if (
        piece.color !== turn &&
        piece.type === "knight" &&
        positions.includes(piece.coordinates)
      ) {
        mapPieceRange.set(piece, []);
      }
    });
    return;
  }
  let findIndex;
  positions.forEach((position) => {
    findIndex = CopyPiecesAlive.findIndex((piece) => {
      //pillem la primera ocurrencia
      return piece.coordinates === position;
    });
  });
  if (findIndex === -1) {
    //sino s'ha trobat cap peça la branca es irrellevant i no clavarem elements a clau-valor
    return;
  }
  let pieceFind = { ...CopyPiecesAlive[findIndex] };
  if (pieceFind.color !== turn) {
    //s'ha trobat una peça amenaçant
    if (potentialAttackers.includes(pieceFind.type)) {
      //haurem de veure si es peo y si aquest constitueix una amenaça
      //quan constitueix una amenaça? quan la diferencia absoluta entre el rei i el peo és de 1 o 2
      if ((pieceFind.type = "pawn")) {
        let numKing = parseInt(kingPosition.split("")[1]);
        let pawnNumber = parseInt(pieceFind.coordinates.split("")[1]);

        if (pieceFind.color === "white") {
          //ataca ascendentment
          //si el rei està 1 o 2 per damunt del peo, constituirà una amenaça
          if (numKing - pawnNumber === 1 || numKing - pawnNumber === 2) {
            mapPieceRange.set(pieceFind, positions.splice(0, findIndex));
            return;
          }
        } else {
          if (numKing - pawnNumber === -1 || numKing - pawnNumber === -2) {
            mapPieceRange.set(pieceFind, positions.splice(0, findIndex));
            return;
          }
        }
      } else {
        //si hi ha algujna peça de color opost i apart ataca, capem el rang i l'incloem
        mapPieceRange.set(pieceFind, positions.splice(0, findIndex));
        return;
      }
    }
  }
  //sino es una peça del color opost, la branca es irrellevant
  return;
}

function traceVerticalAscendentRange(coordinates) {
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
  return verticalAscendentRange;
}

function traceVerticalDescendentRange(coordinates) {
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
  return verticalDescendentRange;
}
function traceHorizontalLeftToRightRange(coordinates) {
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
  return horizontalLeftToRightRange;
}
function traceHorizontalRightToLeftRange(coordinates) {
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
  return horizontalRightToLeftRange;
}
function traceDiagonalAscendentLeftToRightRange(coordinates) {
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
  return diagonalAscendentLeftToRight;
}
function traceDiagonalAscendentRightToLeftRange(coordinates) {
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
  return diagonalAscendentRightToLeft;
}
function traceDiagonalDescendentLeftToRightRange(coordinates) {
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
  return diagonalDescendentLeftToRight;
}
function traceDiagonalDescendentRightToLeftRange(coordinates) {
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
  return diagonalDescendentRightToLeft;
}
function tracePositionsKnightRange(coordinates) {
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
  let positionsChessBoard = [
    "a8",
    "b8",
    "c8",
    "d8",
    "e8",
    "f8",
    "g8",
    "h8",
    "a7",
    "b7",
    "c7",
    "d7",
    "e7",
    "f7",
    "g7",
    "h7",
    "a6",
    "b6",
    "c6",
    "d6",
    "e6",
    "f6",
    "g6",
    "h6",
    "a5",
    "b5",
    "c5",
    "d5",
    "e5",
    "f5",
    "g5",
    "h5",
    "a4",
    "b4",
    "c4",
    "d4",
    "e4",
    "f4",
    "g4",
    "h4",
    "a3",
    "b3",
    "c3",
    "d3",
    "e3",
    "f3",
    "g3",
    "h3",
    "a2",
    "b2",
    "c2",
    "d2",
    "e2",
    "f2",
    "g2",
    "h2",
    "a1",
    "b1",
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "h1",
  ];
  let possibleMovementsWithoutTrash = [];
  for (let i = 0; i < possibleMovements.length; i++) {
    if (positionsChessBoard.includes(possibleMovements[i])) {
      possibleMovementsWithoutTrash.push(possibleMovements[i]);
    }
  }
  return possibleMovementsWithoutTrash;
}
