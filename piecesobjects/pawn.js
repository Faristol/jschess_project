export { Pawn };
import { PieceFather } from "./piecefather.js";
import {
  isVerticalDescendent,
  isVerticalAscendent,
  isHorizontalLeftToRight,
  isHorizontalRightToLeft,
  isDiagonalDescendent,
  isDiagonalAscendent,
} from "../validation.js";
class Pawn extends PieceFather {
  constructor(color, coordinates) {
    super(color, coordinates, "pawn");
    this.notationName = "";
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
  valid(start, end, hasPieces, capture) {
    if (!hasPieces) {
      let startLetter = start.split("")[0];
      let startNumber = parseInt(start.split("")[1]);
      let endLetter = end.split("")[0];
      let endNumber = parseInt(end.split("")[1]);
      if (capture === undefined) {
        /*moviment normal*/
        if (this.color === "black") {
          /*black -> start-end*/
          /*white -> end-start*/
          /*si es de color negre i esta en la 7 fila pot fer un moviment de 2*/
          let numDifference = startNumber - endNumber;
          if (startNumber === 7) {
            if ([1, 2].includes(numDifference)) {
              /*vegem si es vertical descendent*/
              return isVerticalDescendent(start, end);
            } else {
              return false;
            }
          } else {
            if (numDifference === 1) {
              return isVerticalDescendent(start, end);
            } else {
              return false;
            }
          }
        } else {
          /*es blanca*/
          let numDifference = endNumber - startNumber;
          if (startNumber === 2) {
            if ([1, 2].includes(numDifference)) {
              /*vegem si es vertical ascendent*/
              return isVerticalAscendent(start, end);
            } else {
              return false;
            }
          } else {
            /*pot merejar sols 1*/
            if (numDifference === 1) {
              return isVerticalAscendent(start, end);
            } else {
              return false;
            }
          }
        }
      } else {
        /*es una captura*/
        /*si es negra, captura diagonal descendent,blanca captura diagonal ascendent
        desplaçament 1 posicio
        */

        let numDifference = Math.abs(startNumber - endNumber);
        if (numDifference === 1) {
          if (this.color === "black") {
            return isDiagonalDescendent(start, end);
          } else {
            return isDiagonalAscendent(start, end);
          }
        } else {
          return false;
        }
      }
    } else {
      /*si te peces en mig*/
      return false;
    }
  }
}
