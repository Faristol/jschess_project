export { Rook };
import { PieceFather } from "./piecefather.js";
import {
  isVerticalDescendent,
  isVerticalAscendent,
  isHorizontalLeftToRight,
  isHorizontalRightToLeft,
  isDiagonalDescendent,
  isDiagonalAscendent,
} from "../validation.js";
class Rook extends PieceFather {
  constructor(color, coordinates) {
    super(color, coordinates, "rook");
    this.notationName = "R";
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
        isHorizontalLeftToRight(start, end) ||
        isHorizontalRightToLeft(start, end) ||
        isVerticalAscendent(start, end) ||
        isVerticalDescendent(start, end)
      );
    } else {
      /*si te peces en mig*/
      return false;
    }
  }
}
