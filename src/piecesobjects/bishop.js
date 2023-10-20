export { Bishop };
import { PieceFather } from "./piecefather.js";
import {
  isVerticalDescendent,
  isVerticalAscendent,
  isHorizontalLeftToRight,
  isHorizontalRightToLeft,
  isDiagonalDescendent,
  isDiagonalAscendent,
} from "../validation.js";
class Bishop extends PieceFather {
  constructor(color, coordinates) {
    super(color, coordinates, "bishop");
    this.notationName = "B";
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

  valid(start, end, hasPieces) {
    if (!hasPieces) {
      

      return (
        isDiagonalAscendent(start, end) || isDiagonalDescendent(start, end)
      );
    } else {
      /*si te peces en mig*/
      return false;
    }
  }
}
