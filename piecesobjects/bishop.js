export {Bishop};
import { PieceFather } from "./piecefather.js";
class Bishop extends PieceFather{
    constructor(color,coordinates){
        this.notationName = 'B';
        super(color,coordinates,'bishop');
       
    }
    
    move(){

    }
}