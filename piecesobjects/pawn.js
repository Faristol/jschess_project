export {Pawn};
import { PieceFather } from "./piecefather.js";
class Pawn extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'pawn');
        this.notationName = "";

    }
    move(){

    }
}