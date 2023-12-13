import {
  isKingCheck,
  piecesMovementHandler,
  filterOrderAndGetFirstElement,
} from "../src/Controller/checkdetection.js";
import { isCheckMate } from "../src/Controller/checkmatedetection.js";
import { Bishop } from "../src/Model/bishop.js";
import { King } from "../src/Model/king.js";
import { Knight } from "../src/Model/knight.js";
import { Pawn } from "../src/Model/pawn.js";
import { Queen } from "../src/Model/queen.js";
import { Rook } from "../src/Model/rook.js";

describe("Check", function () {
  describe("Check detection main function", function () {
    it("Deu resultar true", function () {
      const piecesAlive = [
        { type: "king", color: "white", coordinates: "e1" },
        { type: "queen", color: "black", coordinates: "e8" },
      ];
      const turn = "white";
      const result = isKingCheck(turn, piecesAlive);
      expect(result).toBeTrue();
    });
    it("Deu resultar true", function () {
      const piecesAlive = [
        { type: "king", color: "white", coordinates: "e1" },
        { type: "knight", color: "black", coordinates: "f3" },
      ];
      const turn = "white";
      const result = isKingCheck(turn, piecesAlive);
      expect(result).toBeTrue();
    });
    it("Deu resultar true", function () {
      const piecesAlive = [
        { type: "king", color: "black", coordinates: "e8" },
        { type: "knight", color: "white", coordinates: "f6" },
      ];
      const turn = "black";
      const result = isKingCheck(turn, piecesAlive);
      expect(result).toBeTrue();
    });
    it("Deu resultar true", function () {
      const piecesAlive = [
        { type: "king", color: "black", coordinates: "e8" },
        { type: "pawn", color: "white", coordinates: "f7" },
      ];
      const turn = "black";
      const result = isKingCheck(turn, piecesAlive);
      expect(result).toBeTrue();
    });
    //
    it("Deu resultar false", function () {
      const piecesAlive = [
        { type: "king", color: "white", coordinates: "e1" },
        { type: "queen", color: "black", coordinates: "b8" },
      ];
      const turn = "white";
      const result = isKingCheck(turn, piecesAlive);
      expect(result).toBeFalse();
    });
    it("Deu resultar false", function () {
      const piecesAlive = [
        { type: "king", color: "white", coordinates: "f2" },
        { type: "knight", color: "black", coordinates: "f3" },
      ];
      const turn = "white";
      const result = isKingCheck(turn, piecesAlive);
      expect(result).toBeFalse();
    });
    it("Deu resultar false", function () {
      const piecesAlive = [
        { type: "king", color: "black", coordinates: "e8" },
        { type: "knight", color: "white", coordinates: "a6" },
      ];
      const turn = "black";
      const result = isKingCheck(turn, piecesAlive);
      expect(result).toBeFalse();
    });
    it("Deu resultar false", function () {
      const piecesAlive = [
        { type: "king", color: "black", coordinates: "e8" },
        { type: "pawn", color: "white", coordinates: "a7" },
      ];
      const turn = "black";
      const result = isKingCheck(turn, piecesAlive);
      expect(result).toBeFalse();
    });
    it("El rei no està present", function () {
      const piecesAlive = [
        { type: "queen", color: "black", coordinates: "b8" },
      ];
      const turn = "white";
      const result = isKingCheck(turn, piecesAlive);
      expect(result).toBeFalse();
    });
    it("Deu resultar false", function () {
      const piecesAlive = [
        { type: "king", color: "white", coordinates: "e1" },
        { type: "queen", color: "black", coordinates: "d8" },
        { type: "rook", color: "black", coordinates: "a8" },
      ];
      const turn = "white";
      const isCheck = isKingCheck(turn, piecesAlive);
      expect(isCheck).toBeFalse();
    });
  });
  describe("Tests piecesMovementHandler function ", function () {
    it("Deu resultar false, quan cap peça pot atacar al rei", function () {
      const piecesOpponent = [];
      const king = { type: "king", color: "black", coordinates: "e8" };
      const isChecked = piecesMovementHandler(
        piecesOpponent,
        king,
        false,
        [],
        "black"
      );
      expect(isChecked).toBe(false);
    });
    it("Deu resultar true, quan un peó pot atacar al rei", function () {
      const piecesOpponent = [
        { type: "pawn", color: "white", coordinates: "e5" },
      ];
      const king = { type: "king", color: "black", coordinates: "d6" };
      const isChecked = piecesMovementHandler(
        piecesOpponent,
        king,
        false,
        [],
        "black"
      );
      expect(isChecked).toBe(true);
    });
    it("Deu resultar true, quan un cavall pot atacar al rei", function () {
      const piecesOpponent = [
        { type: "knight", color: "white", coordinates: "g6" },
      ];
      const king = { type: "king", color: "black", coordinates: "f8" };
      const isChecked = piecesMovementHandler(
        piecesOpponent,
        king,
        false,
        [],
        "black"
      );
      expect(isChecked).toBe(true);
    });
    it("Deu resultar false, quan no hi ha cap peça", function () {
      const piecesAlive = [];
      const turn = "white";
      const isCheck = isKingCheck(turn, piecesAlive);
      expect(isCheck).toBe(false);
    });
    it("Deu resultar false, doncs no hi han amenaces", function () {
      const piecesOpponent = [
        { type: "pawn", color: "white", coordinates: "e5" },
      ];
      const king = { type: "king", color: "black", coordinates: "e8" };
      const isChecked = piecesMovementHandler(
        piecesOpponent,
        king,
        false,
        [],
        "black"
      );
      expect(isChecked).toBe(false);
    });
  });
  describe("Tests filterOrderAndGetFirstElement function ", function () {
    it("Deu retornar false quan el rang està buit i no hi han peces", function () {
      let range = [];
      let piecesAlive = [];
      let turn = "white";

      let result = filterOrderAndGetFirstElement(range, piecesAlive, turn);

      expect(result).toBe(false);
    });
    it("deu retornar false quan el rang no està buit però no hi han peces", function () {
      let range = ["a1", "b2", "c3"];
      let piecesAlive = [];
      let turn = "white";

      let result = filterOrderAndGetFirstElement(range, piecesAlive, turn);

      expect(result).toBe(false);
    });
    it('deu retornar true quan el rang no està buit i l"unica peça que hi ha és una reina i el rei, que està en el seu rang d"atac', function () {
      let range = ["a1", "b2", "c3"];
      let piecesAlive = [
        { coordinates: "a1", type: "king", color: "white" },
        { coordinates: "b2", type: "queen", color: "black" },
      ];
      let turn = "white";

      let result = filterOrderAndGetFirstElement(range, piecesAlive, turn);

      expect(result).toBe(true);
    });
  });
});
describe("Checkmate", function () {
  it('Encara que siga jaque, hi han possibilitats d"escapar i no deu resultar jaquemate', function () {
    const gameState = {
      turn: "white",
      piecesAlive: [
        new King("white", "e1"),
        new Queen("black", "e8"),
        new Rook("black", "a8"),
        new Rook("black", "h8"),
        new King("black", "b3"),
        new Knight("black", "b8"),
        new Knight("black", "g8"),
        new Bishop("black", "c8"),
        new Bishop("black", "f8"),
        new Pawn("black", "a7"),
        new Pawn("black", "b7"),
        new Pawn("black", "c7"),
        new Pawn("black", "d7"),
        new Pawn("black", "f7"),
        new Pawn("black", "g7"),
        new Pawn("black", "h7"),
      ],
      piecesAliveCopy: [
        new King("white", "e1"),
        new Queen("black", "e8"),
        new Rook("black", "a8"),
        new Rook("black", "h8"),
        new King("black", "b3"),
        new Knight("black", "b8"),
        new Knight("black", "g8"),
        new Bishop("black", "c8"),
        new Bishop("black", "f8"),
        new Pawn("black", "a7"),
        new Pawn("black", "b7"),
        new Pawn("black", "c7"),
        new Pawn("black", "d7"),
        new Pawn("black", "f7"),
        new Pawn("black", "g7"),
        new Pawn("black", "h7"),
      ],
    };

    const isCheckMateResult = isCheckMate(gameState);

    expect(isCheckMateResult).toBe(false);
  });
  it("Es jaquemate", function () {
    const gameState = {
      turn: "white",
      piecesAlive: [
        new King("white", "a8"),
        new Queen("black", "b1"),
        new Rook("black", "a1"),
        new King("black", "e2"),
      ],
      piecesAliveCopy: [
        new King("white", "a8"),
        new Queen("black", "b1"),
        new Rook("black", "a1"),
        new King("black", "e2"),
      ],
    };
    const isCheckMateResult = isCheckMate(gameState);
    expect(isCheckMateResult).toBeTrue();
  });
  //!IMPORTANT
  //pa un futur-> m'acabe de donar compte que el sistema de detecció de jaque mate, no és precís
  //hi han casos que no estan contemplats, i es deu a que, xq considere q x a que hi haja jm, totes les posicions
  //colindants al rei han d'estar en jaque, i no es així
  it("Es jaquemate", function () {
    const gameState = {
      turn: "black",
      piecesAlive: [
        new King("black", "f8"),
        new Pawn("black", "g7"),
        new Pawn("black", "f7"),
        new Knight("white", "f5"),
        new Rook("white", "h8"),
        new Rook("white", "a8"),
        new King("white", "c1"),
      ],
      piecesAliveCopy: [
        new King("black", "f8"),
        new Pawn("black", "g7"),
        new Pawn("black", "f7"),
        new Knight("white", "f5"),
        new Rook("white", "h8"),
        new Rook("white", "a8"),
        new King("white", "c1"),
      ],
    };
    const isCheckMateResult = isCheckMate(gameState);
    expect(isCheckMateResult).toBeTrue();
  });
  it("Es jaquemate", function () {
    const gameState = {
      turn: "black",
      piecesAlive: [
        new King("black", "g7"),
        new Rook("black", "f8"),
        new Bishop("black", "f6"),
        new Knight("black", "e5"),
        new Knight("white", "e7"),
        new Pawn('white','g6'),
        new Rook('white','h7'),
        new King("white", "c1"),
      ],
      piecesAliveCopy: [
        new King("black", "g7"),
        new Rook("black", "f8"),
        new Bishop("black", "f6"),
        new Knight("black", "e5"),
        new Knight("white", "e7"),
        new Pawn('white','g6'),
        new Rook('white','h7'),
        new King("white", "c1"),
      ],
    };
    const isCheckMateResult = isCheckMate(gameState);
    expect(isCheckMateResult).toBeTrue();
  });
  it("Es jaquemate", function () {
    const gameState = {
      turn: "black",
      piecesAlive: [
        new King("black", "d8"),
        new Pawn('white','d7'),
        new Pawn('white','e7'),
        new Pawn('white','c7'),
        new Queen('white','d6'),
        new King("white", "c1"),
      ],
      piecesAliveCopy: [
        new King("black", "d8"),
        new Pawn('white','d7'),
        new Pawn('white','e7'),
        new Pawn('white','c7'),
        new Queen('white','d6'),
        new King("white", "c1"),
      ],
    };
    const isCheckMateResult = isCheckMate(gameState);
    expect(isCheckMateResult).toBeTrue();
  });
 
});
