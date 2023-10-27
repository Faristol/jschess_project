export { isStaleMate };
import {
  calculateNearPositions,
  areAllPositionsChecked,
} from "./checkmatedetection.js";
import { isKingCheck } from "./checkdetection.js";
function isStaleMate(gameState) {
  if (isKingCheck(gameState.turn, gameState.piecesAlive)) return false;
  //Després de que un dels jugadors fa un moviment vàlid, comprovarem si el rei contrari està en stalemate. En aquest cas haurem de comprovar
  //1-que el rei del oponent no està en jaque
  //2-que tots els escacs circumdants al rei BUITS estan en jaque-> si hi han peces al voltant que protegeixen eixes peces
  //3-que no pot capturar a les peces que amenacen les eixides del rei
  //4-Que no es pot bloquejar a les peçes que amenacen les eixides del rei
  //-------------------------------
  //busquem i guardem el rei a avaluar
  const king = gameState.piecesAlive.find(
    (piece) => piece.type === "king" && piece.color === gameState.turn
  );
  const colorPiecesOpponent = gameState.turn === "white" ? "black" : "white";
  //agafem les peces de l'oponent
  const opponentPieces = [];
  gameState.piecesAlive.forEach((piece) => {
    if (piece.color === colorPiecesOpponent) {
      opponentPieces.push(piece);
    }
  });
  const friendPieces = [];
  gameState.piecesAlive.forEach((piece) => {
    if (piece.color === gameState.turn && piece.type !== "king") {
      friendPieces.push(piece);
    }
  });
  //calculem les closePositions del rei
  let closePositionsKing = [];
  closePositionsKing = calculateNearPositions(king.coordinates);
  return staleMate(
    king,
    friendPieces,
    opponentPieces,
    closePositionsKing,
    gameState
  );
}
function staleMate(
  king,
  friendPieces,
  opponentPieces,
  closePositionsKing,
  gameState
) {
  //Ho volia fer similar a l'algoritme de branques del jaquemate, pero en aquest cas, hi han moltes més branques
  //i m'es més difícil fer-ho
  //El que vaig a implementar:
  //imaginem-nos un anell concèntric al voltant del rei d'aquest anell anirem agafant els escacs buits i les peces de color opost
  //anirem recorreguent totes les peces "amigues" i intentarem o bé atacar o bloquejar les peces buides, després de cada atac
  //o bloqueig veurem si el rei pot fer algun moviment vàlid a les caselles circumdants, sinó crearem altre anell concèntric
  //amb una unitat més de distancia respecte del rei, i altra vegada el mateix, fins que arribem al final del tauler
  //com sabrem que em arribat? Per cada anell creat, filtrarem aquelles POSICIONS que no es corresponen amb les posicions NORMALS del tauler d'escacs
  //quan l'array de posicions concèntriques tinga long 0 serà pq totes les que hi han són posicions alienes.
  //algoritme:
  //1)agafar posicions concentriques
  //2)filtrar i quedarse amb caselles buides o amb peces del color opost
  let concentricRings = [];
  for(let i=1;i<=8;i++){
    concentricRings = generateConcentricRings(king.coordinates,i);
  }
  
  return false;
}
  function generateConcentricRings(kingPosition, maxDistance) {
    const [file, rank] = kingPosition.split(''); 
    const concentricRing = [];
  
    for (let distance = 1; distance <= maxDistance; distance++) {
      const ring = [];
  
      for (let dx = -distance; dx <= distance; dx++) {
        for (let dy = -distance; dy <= distance; dy++) {
          if (Math.abs(dx) === distance || Math.abs(dy) === distance) {
            const newFile = String.fromCharCode(file.charCodeAt(0) + dx);
            const newRank = parseInt(rank, 10) + dy;
            const newPosition = newFile + newRank;
  
            if (
              newFile >= 'a' && newFile <= 'h' &&
              newRank >= 1 && newRank <= 8
            ) {
              ring.push(newPosition);
            }
          }
        }
      }
  
      concentricRing.push(ring);
    }
    return concentricRing;
  
  }
  
