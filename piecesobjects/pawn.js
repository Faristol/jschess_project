export {Pawn};
import { PieceFather } from "./piecefather.js";
class Pawn extends PieceFather{
    constructor(color,coordinates){
        this.notationName = "";
        super(color,coordinates,'pawn');
    }
    move(){

    }
}