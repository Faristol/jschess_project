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
import { createTablePieces } from "../src/Controller/main.js";
import { GameState } from "../src/Model/gameState.js";
import { movePieceWithoutRefreshHtml } from "../src/Controller/main.js";
import {isVerticalDescendent,
  isVerticalAscendent,
  isHorizontalLeftToRight,
  isHorizontalRightToLeft,
  isDiagonalDescendent,
  isDiagonalAscendent} from "../src/Controller/validation.js";
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
describe("Creació tauler",function(){
  it('deu crear un tauler amb 64 escacs', async function () {

    let gameState = new GameState();
    let movementTarget = [];
    let div = document.createElement("div");
    div.id = "chessboard";
    div.style.display='none';
    

    document.body.appendChild(div);


    await createTablePieces(gameState, movementTarget);

 
    expect(document.querySelectorAll('.square').length).toBe(64);
  });
  it('deu assignar colors als escacs amb el patró del tauler d`escacs', async function() {

    let gameState = new GameState();
    let movementTarget = [];
    let div = document.createElement("div");
    div.id = "chessboard";
    div.style.display = 'none';
  
    
    document.body.appendChild(div);
  

    await createTablePieces(gameState, movementTarget);
  

    
    let squares = document.querySelectorAll('.square');
          for (let i = 0; i < squares.length; i++) {
            let expectedColor = (i % 8 + Math.floor(i / 8)) % 2 === 0 ? 'white' : 'green';
            expect(squares[i].classList.contains(expectedColor)).toBe(true);
          }
  });
  it('Deu assignar click listeners als escacs', async function() {
    
    let gameState = new GameState();
    let movementTarget = [];

    
    let div = document.createElement("div");
    div.id = "chessboard";
    div.style.display = 'none';
  

    document.body.appendChild(div);
  
  
    await createTablePieces(gameState, movementTarget);

    
    let squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length; i++) {
      expect(squares[i].onclick).toBeDefined();
    }
  });

});
describe('funcions varies',function (){
  describe('isVerticalDescendent tests',function(){
    it('Deu retornar true quan estan en la mateixa columna i el moviment es descendent', function() {
      expect(isVerticalDescendent('a3', 'a1')).toBe(true);
    });
    it('Deu retornar false quan estan en la mateixa columna pero el moviment es ascendent', function() {
      expect(isVerticalDescendent('a1', 'a3')).toBe(false);
    });
    it('Deu retornar false quan el moviment no és en la = columna', function() {
      expect(isVerticalDescendent('a1', 'c3')).toBe(false);
    });
    it('Deu retornar false quan el moviment  és diagonal', function() {
      expect(isVerticalDescendent('h1', 'g2')).toBe(false);
    });
    it('Deu retornar false quan el moviment  és horitzontal', function() {
      expect(isVerticalDescendent('h1', 'a1')).toBe(false);
    });
  })
  describe('isVerticalAscendent tests',function(){
    it('Deu retornar true quan estan en la mateixa columna i el moviment es ascendent', function() {
      expect(isVerticalAscendent('a1', 'a3')).toBe(true);
    });
    it('Deu retornar false quan estan en la mateixa columna pero el moviment es descendent', function() {
      expect(isVerticalAscendent('a3', 'a1')).toBe(false);
    });
    it('Deu retornar false quan el moviment no és en la = columna', function() {
      expect(isVerticalAscendent('a1', 'c3')).toBe(false);
    });
    it('Deu retornar false quan el moviment  és diagonal', function() {
      expect(isVerticalAscendent('h1', 'g2')).toBe(false);
    });
    it('Deu retornar false quan el moviment  és horitzontal', function() {
      expect(isVerticalAscendent('h1', 'a1')).toBe(false);
    });
  })
  describe('isHoritzontalLeftToRight tests',function(){
    it('Deu retornar true quan es un moviement en la mateixa fila desquerra a dreta', function() {
      expect(isHorizontalLeftToRight('a1', 'h1')).toBe(true);
    });
    it('Deu retornar false quan es un moviement en la mateixa fila de dreta a esquerra', function() {
      expect(isHorizontalLeftToRight('h1', 'a1')).toBe(false);
    });
    it('Deu retornar false davant moviments verticals', function() {
      expect(isHorizontalLeftToRight('a1', 'a3')).toBe(false);
      expect(isHorizontalLeftToRight('a3', 'a1')).toBe(false);
    });
    it('Deu retornar false davant moviments diagonals', function() {
      expect(isHorizontalLeftToRight('a1', 'b2')).toBe(false);
      expect(isHorizontalLeftToRight('b2', 'a1')).toBe(false);
    });
    
    
  })
  describe('isHoritzontalRightToLeft tests',function(){
    it('Deu retornar true quan es un moviement en la mateixa fila de dreta a esquerra', function() {
      expect(isHorizontalRightToLeft('h1', 'a1')).toBe(true);
    });
    it('Deu retornar false quan es un moviement en la mateixa fila de desquerra a dreta', function() {
      expect(isHorizontalRightToLeft('a1', 'h1')).toBe(false);
    });
    it('Deu retornar false davant moviments verticals', function() {
      expect(isHorizontalRightToLeft('a1', 'a3')).toBe(false);
      expect(isHorizontalRightToLeft('a3', 'a1')).toBe(false);
    });
    it('Deu retornar false davant moviments diagonals', function() {
      expect(isHorizontalRightToLeft('a1', 'b2')).toBe(false);
      expect(isHorizontalRightToLeft('b2', 'a1')).toBe(false);
    });
    
    
  })
  describe('isDiagonalAscendent tests',function(){
    if('Deu retornar true quan es un moviment diagonal ascendent', function() {
      expect(isDiagonalAscendent('a1', 'b2')).toBe(true);
    });
    it('Deu retornar false quan es un moviment diagonal descendent', function() {
      expect(isDiagonalAscendent('b2', 'a1')).toBe(false);
    });
    it('Deu retornar false davant moviments horitzontals', function() {
      expect(isDiagonalAscendent('a1', 'h1')).toBe(false);
      expect(isDiagonalAscendent('h1', 'a1')).toBe(false);
    });
    it('Deu retornar false davant moviments verticals', function() {
      expect(isDiagonalAscendent('a1', 'a3')).toBe(false);
      expect(isDiagonalAscendent('a3', 'a1')).toBe(false);
    });
    
    
  })
  describe('isDiagonalDescendent tests',function(){
    it('Deu retornar true quan es un moviment diagonal descendent', function() {
      expect(isDiagonalDescendent('b2', 'a1')).toBe(true);
    });
    it('Deu retornar false quan es un moviment diagonal ascendent', function() {
      expect(isDiagonalDescendent('a1', 'b2')).toBe(false);
    });
    it('Deu retornar false davant moviments horitzontals', function() {
      expect(isDiagonalDescendent('a1', 'h1')).toBe(false);
      expect(isDiagonalDescendent('h1', 'a1')).toBe(false);
    });
    it('Deu retornar false davant moviments verticals', function() {
      expect(isDiagonalDescendent('a1', 'a3')).toBe(false);
      expect(isDiagonalDescendent('a3', 'a1')).toBe(false);
    });
    
    
  })
})

