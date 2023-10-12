export {Bishop};
import { PieceFather } from "./piecefather.js";
import {isVerticalDescendent,isVerticalAscendent,isHorizontalLeftToRight,isHoriztonalRightToLeft,isDiagonal} from "../validation.js";
class Bishop extends PieceFather{
    constructor(color,coordinates){

        super(color,coordinates,'bishop');
        this.notationName = 'B';
       
    }
    
    move(){

    }
}