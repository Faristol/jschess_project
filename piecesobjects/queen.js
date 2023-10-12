export {Queen};
import { PieceFather } from "./piecefather.js";
import {isVerticalDescendent,isVerticalAscendent,isHorizontalLeftToRight,isHoriztonalRightToLeft,isDiagonal} from "../validation.js";
class Queen extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'queen');
        this.notationName = 'Q';

    }
    move(){

    }
}