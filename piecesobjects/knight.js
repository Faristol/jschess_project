export {Knight};
import { PieceFather } from "./piecefather.js";
import {
    isVerticalDescendent,
    isVerticalAscendent,
    isHorizontalLeftToRight,
    isHorizontalRightToLeft,
    isDiagonalDescendent,
  isDiagonalAscendent
  } from "../validation.js";
class Knight extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'knight');
        this.notationName = 'N';

    }
    move(){

    }
}