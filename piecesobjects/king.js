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
    move(){

    }
}