export {PieceFather};
class PieceFather{
    constructor(color,coordinates,type){
        this.color = color;
        this.coordinates = coordinates;
        this.type=type;
        this.setImage();

    }
    setImage(){
        this.image = `../piecesimages/${this.type}${this.color}.png`;
    }
    kill(pieceToKill){
        /*First of all, determine if the movement is valid. If it's valid and the piece can capture something, then call the function kill*/

    }
}