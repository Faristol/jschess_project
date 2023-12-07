export { PieceFather };
class PieceFather {
  static mapPiecesUnicode = new Map();
  static initializeMapPiecesUnicode() {
    this.mapPiecesUnicode.set("kingwhite", "♔");
    this.mapPiecesUnicode.set("kingblack", "♚");
    this.mapPiecesUnicode.set("queenwhite", "♕");
    this.mapPiecesUnicode.set("queenblack", "♛");
    this.mapPiecesUnicode.set("rookwhite", "♖");
    this.mapPiecesUnicode.set("rookblack", "♜");
    this.mapPiecesUnicode.set("bishopwhite", "♗");
    this.mapPiecesUnicode.set("bishopblack", "♝");
    this.mapPiecesUnicode.set("knightwhite", "♘");
    this.mapPiecesUnicode.set("knightblack", "♞");
    this.mapPiecesUnicode.set("pawnwhite", "♙");
    this.mapPiecesUnicode.set("pawnblack", "♟");
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
    
  }
}
