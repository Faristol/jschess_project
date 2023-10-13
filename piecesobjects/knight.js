export { Knight };
import { PieceFather } from "./piecefather.js";
import {
  isVerticalDescendent,
  isVerticalAscendent,
  isHorizontalLeftToRight,
  isHorizontalRightToLeft,
  isDiagonalDescendent,
  isDiagonalAscendent,
} from "../validation.js";
class Knight extends PieceFather {
  constructor(color, coordinates) {
    super(color, coordinates, "knight");
    this.notationName = "N";
  }
  valid(start, end, hasPieces) {
    let startLetter = start.split("")[0].charCodeAt(0);
    let startNumber = parseInt(start.split("")[1]);
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
    if (possibleMovements.includes(end)) {
      return true;
    }
    return false;
  }
}
