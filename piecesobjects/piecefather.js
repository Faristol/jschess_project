export { PieceFather };
class PieceFather {
  static mapPiecesUnicode = new Map();
  static initializeMapPiecesUnicode() {
    this.mapPiecesUnicode.set("kingwhite", "\u2654");
    this.mapPiecesUnicode.set("kingblack", "\u265A");
    this.mapPiecesUnicode.set("queenwhite", "\u2655");
    this.mapPiecesUnicode.set("queenblack", "\u265B");
    this.mapPiecesUnicode.set("rookwhite", "\u2656");
    this.mapPiecesUnicode.set("rookblack", "\u265C");
    this.mapPiecesUnicode.set("bishopwhite", "\u2657");
    this.mapPiecesUnicode.set("bishopblack", "\u265D");
    this.mapPiecesUnicode.set("knightwhite", "\u2658");
    this.mapPiecesUnicode.set("knightblack", "\u265E");
    this.mapPiecesUnicode.set("pawnwhite", "\u2659");
    this.mapPiecesUnicode.set("pawnblack", "\u265F");
  }

  constructor(color, coordinates, type) {
    this.color = color;
    this.coordinates = coordinates;
    this.type = type;
    /*this.setImage();*/
    this.setUnicode();
  }
  /*setImage(){
        this.image = `../piecesimages/${this.type}${this.color}.png`;
    }*/
  setUnicode() {
    if (!PieceFather.mapPiecesUnicode.size) {
      PieceFather.initializeMapPiecesUnicode();
    }
    this.unicodePiece = PieceFather.mapPiecesUnicode.get(
      this.type + this.color
    );
  }
  kill(pieceToKill) {
    /*First of all, determine if the movement is valid. If it's valid and the piece can capture something, then call the function kill*/
  }
}
