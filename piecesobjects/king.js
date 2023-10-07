export {King};
import { PieceFather } from "./piecefather.js";
class King extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'king');
        this.notationName = 'K';

    }
    move(){

    }
}