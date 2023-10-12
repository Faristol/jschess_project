export {King};
import { PieceFather } from "./piecefather.js";
import {isVerticalDescendent,isVerticalAscendent,isHorizontalLeftToRight,isHoriztonalRightToLeft,isDiagonal} from "../validation.js";
class King extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'king');
        this.notationName = 'K';

    }
    move(){

    }
}