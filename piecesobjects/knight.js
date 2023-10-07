export {Knight};
import { PieceFather } from "./piecefather.js";
class Knight extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'knight');
        this.notationName = 'N';

    }
    move(){

    }
}