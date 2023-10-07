export {Rook};
import { PieceFather } from "./piecefather.js";
class Rook extends PieceFather{
    constructor(color,coordinates){
        this.notationName = 'R';
        super(color,coordinates,'rook');
    }
    move(){

    }
}