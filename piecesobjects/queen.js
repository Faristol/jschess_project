export {Queen};
import { PieceFather } from "./piecefather.js";
import {
    isVerticalDescendent,
    isVerticalAscendent,
    isHorizontalLeftToRight,
    isHorizontalRightToLeft,
    isDiagonalDescendent,
  isDiagonalAscendent
  } from "../validation.js";
class Queen extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'queen');
        this.notationName = 'Q';

    }
    valid(start, end, hasPieces) {
        if (!hasPieces) {
          return isHorizontalLeftToRight(start,end)||isHorizontalRightToLeft(start,end)||isVerticalAscendent(start,end)||isVerticalDescendent(start,end)||isDiagonalAscendent(start,end)||isDiagonalDescendent(start,end);
        } else {
          /*si te peces en mig*/
          return false;
        }
      }
}