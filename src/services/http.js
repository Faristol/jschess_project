export {
  insertNewGame,
  supaRequest,
  SUPABASE_KEY,
  saveGameId,
  getGameId,
  updateGameInSupaBase,
  getGameData,
  updateGameAndObjectsInGame
};
import { GameState } from "../gameState.js";
import { Bishop } from "../piecesobjects/bishop.js";
import { King } from "../piecesobjects/king.js";
import { Knight } from "../piecesobjects/knight.js";
import { Pawn } from "../piecesobjects/pawn.js";
import { PieceFather } from "../piecesobjects/piecefather.js";
import { Queen } from "../piecesobjects/queen.js";
import { Rook } from "../piecesobjects/rook.js";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnamR3cGtodm1iamRuY2Z2c2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzI4MDgsImV4cCI6MjAxNTQ0ODgwOH0.D096jzje7lSbJs3dc9ZOEA1Zvt4_lqsAHulejU-M3FY";
const headers = {
  apiKey: SUPABASE_KEY,
  "Content-Type": "application/json",
};

//operacions que farem agafar informació i modificar informació

async function supaRequest(url, method, headers, body) {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  if (response.status >= 200 && response.status <= 300) {
    if (response.headers.get("content-type")) {
      return await response.json();
    }
    return {};
  }

  return Promise.reject(await response.json());
}

async function insertNewGame(token, data) {
  const url = "https://fgjdwpkhvmbjdncfvsbj.supabase.co/rest/v1/game";
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: "return=representation",
  };
  const dataGame = { game: data };
  const response = await supaRequest(url, "post", headersAux, dataGame);
  console.log(response);
  const resolvedId = response[0]?.id;
  saveGameId(resolvedId);
  return response;
}
function saveGameId(id) {
  localStorage.setItem("gameId", id);
}
function getGameId() {
  return localStorage.getItem("gameId");
}
async function updateGameInSupaBase(data, id) {
  const url = `https://fgjdwpkhvmbjdncfvsbj.supabase.co/rest/v1/game?id=eq.${id}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    Prefer: "return=minimal",
  };
  const dataGame = { game: data };
  const response = await supaRequest(url, "PATCH", headersAux, dataGame);

  return response;
}
async function getGameData(id) {
  try {
    const response = await fetch(
      `https://fgjdwpkhvmbjdncfvsbj.supabase.co/rest/v1/game?id=eq.${id}&select=game`,
      {
        headers: {
          apiKey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data[0].game;
  } catch (error) {
    return null;
  }
}
async function updateGameAndObjectsInGame(gameState,gameId) {
  const updatedGameData = await getGameData(gameId);
  console.log(updatedGameData);
 

  Object.keys(updatedGameData).forEach((key) => {
    console.log(key);
    if (
      ![
        "piecesAlive",
        "piecesAliveCopy",
        "piecesDead",
        "piecesDeadCopy",
      ].includes(key)
    ) {
      if(key instanceof Array){
        gameState[key] = [...updatedGameData[key]];
      } else{
        gameState[key] = updatedGameData[key];
      }
      
    } else {
      console.log("entra");
      gameState[key] = updatedGameData[key].map((pieceData) => {
        console.log(pieceData);
        let piece;
        switch (pieceData.type) {
          case "bishop":
            piece = new Bishop();
            break;
          case "king":
            piece = new King();
            break;
          case "knight":
            piece = new Knight();
            break;
          case "pawn":
            piece = new Pawn();
            break;
          case "queen":
            piece = new Queen();
            break;
          case "rook":
            piece = new Rook();
            break;
        }
        if(piece instanceof PieceFather){
          console.log("piecedata"+pieceData);
          Object.assign(piece, pieceData);
        return piece;
        }
        
      });
    }
  });
  console.log(gameState.piecesAlive);
  return gameState;
}
