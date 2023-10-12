export {King};
import { PieceFather } from "./piecefather.js";
import {
    isVerticalDescendent,
    isVerticalAscendent,
    isHorizontalLeftToRight,
    isHorizontalRightToLeft,
    isDiagonalDescendent,
  isDiagonalAscendent
  } from "../validation.js";
class King extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'king');
        this.notationName = 'K';

    }
    valid(start, end, hasPieces) {
        if (!hasPieces) {
          let startLetter = start.split("")[0];
          let startNumber = parseInt(start.split("")[1]);
          let endLetter = end.split("")[0];
          let endNumber = parseInt(end.split("")[1]);
          let numDifference = Math.abs(startNumber - endNumber);
          /*en quest cas no cal aplicar cap funcio, doncs el rey es pot moure en totes les direccions
          pero sols d'1 en 1*/
          if(numDifference===1){
            return true;
          }else{
            return false;
          }
           
      }
    }
}