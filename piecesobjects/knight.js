export {Knight};
import { PieceFather } from "./piecefather.js";
import {isVerticalDescendent,isVerticalAscendent,isHorizontalLeftToRight,isHoriztonalRightToLeft,isDiagonal} from "../validation.js";
class Knight extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'knight');
        this.notationName = 'N';

    }
    move(){

    }
}