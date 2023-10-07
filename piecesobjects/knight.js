export {Knight};
import { PieceFather } from "./piecefather.js";
class Knight extends PieceFather{
    constructor(color,coordinates){
        this.notationName = 'N';
        super(color,coordinates,'knight');
    }
    move(){

    }
}