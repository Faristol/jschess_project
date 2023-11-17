export { GameState };
class GameState {
  constructor() {
    (this.movementRegisterCopy = []),
      (this.movementRegister = []),
      (this.movementWhiteBlack = []),
      (this.movementWhiteBlackCopy = []),
      (this.piecesAlive = []),
      (this.piecesAliveCopy = []),
      (this.piecesDead = []),
      (this.piecesDeadCopy = []),
      (this.start = false),
      (this.players = {
        white: "pepe",
        black: "paco",
      }),
      (this.turn = "white"),
      (this.stalemate = false),
      (this.checkmate = false),
      (this.check = false),
      (this.chessCastlingWhite = false),
      (this.chessCastlingBlack = false),
      (this.kingMoveWhite = false),
      (this.kingMoveBlack = false);
  }
}
