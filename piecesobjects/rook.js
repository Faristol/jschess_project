export {Rook};
import { PieceFather } from "./piecefather.js";
import {isVerticalDescendent,isVerticalAscendent,isHorizontalLeftToRight,isHorizontalRightToLeft,isDiagonal} from "../validation.js";
class Rook extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'rook');
        this.notationName = 'R';
    }
    move(){

    }
}