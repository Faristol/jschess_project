export {Pawn};
import { PieceFather } from "./piecefather.js";
import {isVerticalDescendent,isVerticalAscendent,isHorizontalLeftToRight,isHoriztonalRightToLeft,isDiagonal} from "../validation.js";
class Pawn extends PieceFather{
    constructor(color,coordinates){
        super(color,coordinates,'pawn');
        this.notationName = "";

    }
    valid(start,end,hasPieces){
        if(!hasPieces){
            let startLetter = start.split("")[0];
            let startNumber = parseInt(start.split("")[1]);
            let endLetter = end.split("")[0];
            let endNumber = parseInt(end.split("")[1]);
            if(this.color==='black'){
                /*black -> start-end*/
                /*white -> end-start*/
                /*si es de color negre i esta en la 7 fila pot fer un moviment de 2*/
                let numDifference=startNumber-endNumber;
                if(startNumber===7){
                    if([1,2].includes(numDifference)){
                        

                    }else{
                        return false;
                    }
                }else{
                    if(numDifference===1){

                    }else{
                        return false;
                    }
                }
                

            }else{
                if(startNumber===2){
                    

                }else{
                    /*pot merejar sols 1*/
                }

            }
        }else{
            /*si te peces en mig*/
            return false;
        }

    }
}