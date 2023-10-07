export {King};
import { PieceFather } from "./piecefather.js";
class King extends PieceFather{
    constructor(color,coordinates){
        this.notationName = 'K';
        super(color,coordinates,'king');
    }
    move(){

    }
}