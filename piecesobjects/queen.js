export {Queen};
import { PieceFather } from "./piecefather.js";
class Queen extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'queen');
        this.notationName = 'Q';

    }
    move(){

    }
}