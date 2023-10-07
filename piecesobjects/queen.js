export {Queen};
import { PieceFather } from "./piecefather.js";
class Queen extends PieceFather{
    constructor(color,coordinates){
        this.notationName = 'Q';
        super(color,coordinates,'queen');
    }
    move(){

    }
}