export { King };
import { PieceFather } from "./piecefather.js";


class King extends PieceFather {
  constructor(color, coordinates) {
    super(color, coordinates, "king");
    this.notationName = "K";
  }
  clone() {
    return new this.constructor(
      this.color,
      this.coordinates,
      this.type,
      this.unicodePiece,
      this.notationName
    );
  }
  isKingNear(end,gameState) {
    const colorOpponent = this.color === "white" ? "black" : "white";
    const getKingOpponent = gameState.piecesAlive.find(
      (piece) => piece.type === 'king' && piece.color === colorOpponent
    );
    let coordinatesKingOpponent = getKingOpponent.coordinates;

    let letterKingOpponent = (coordinatesKingOpponent.split("")[0]).charCodeAt(0);
    let numKingOpponent = parseInt(coordinatesKingOpponent.split("")[1]);

    let endLetter = (end.split("")[0]).charCodeAt(0);
    let endNumber = parseInt(end.split("")[1]);

    const dx = Math.abs(endLetter-letterKingOpponent);
    const dy = Math.abs(endNumber-numKingOpponent); 


    if(dx<=1&&dy<=1){
      return false;
    }
    return true;



  }
  valid(start, end, hasPieces,gameState) {
    if (!hasPieces) {
      let startLetter = start.split("")[0];
      let startNumber = parseInt(start.split("")[1]);
      let endLetter = end.split("")[0];
      let endNumber = parseInt(end.split("")[1]);
      let numDifference = Math.abs(startNumber - endNumber);
      let letterDifference = Math.abs(
        startLetter.charCodeAt(0) - endLetter.charCodeAt(0)
      );
      /*en quest cas no cal aplicar cap funcio, doncs el rey es pot moure en totes les direccions
          pero sols d'1 en 1*/
      if (numDifference === 1 || letterDifference === 1) {
        return this.isKingNear(end,gameState);
      } else {
        return false;
      }
    }
  }
 
}
