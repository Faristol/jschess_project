export {
  insertNewGame,
  supaRequest,
  SUPABASE_KEY,
  saveGameId,
  getGameId,
  updateGameInSupaBase,
  getGameData,
  updateGameAndObjectsInGame,
  urlBase,
  loginSupabase,
  signUpSupabase,
  logoutSupabase,
  recoverPasswordSupabase,
  updateData,
  createData,
  getData,
  fileRequest,
  getFileRequest,
  updateResultSupaBase,
  getResult,
  getList,
};
import { GameState } from "../gameState.js";
import { Bishop } from "../piecesobjects/bishop.js";
import { King } from "../piecesobjects/king.js";
import { Knight } from "../piecesobjects/knight.js";
import { Pawn } from "../piecesobjects/pawn.js";
import { PieceFather } from "../piecesobjects/piecefather.js";
import { Queen } from "../piecesobjects/queen.js";
import { Rook } from "../piecesobjects/rook.js";
const urlBase = "https://fgjdwpkhvmbjdncfvsbj.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnamR3cGtodm1iamRuY2Z2c2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzI4MDgsImV4cCI6MjAxNTQ0ODgwOH0.D096jzje7lSbJs3dc9ZOEA1Zvt4_lqsAHulejU-M3FY";
const headers = {
  apikey: SUPABASE_KEY,
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
async function updateResultSupaBase(data, id) {
  const url = `https://fgjdwpkhvmbjdncfvsbj.supabase.co/rest/v1/game?id=eq.${id}&select=result`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    Prefer: "return=minimal",
  };
  const result = { result: data };
  const response = await supaRequest(url, "PATCH", headersAux, result);

  return response;
}
async function getGameData(id) {
  try {
    const response = await fetch(
      `https://fgjdwpkhvmbjdncfvsbj.supabase.co/rest/v1/game?id=eq.${id}&select=game`,
      {
        headers: {
          apikey: SUPABASE_KEY,
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
async function getResult(id) {
  try {
    const response = await fetch(
      `https://fgjdwpkhvmbjdncfvsbj.supabase.co/rest/v1/game?id=eq.${id}&select=result`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data[0].result;
  } catch (error) {
    return null;
  }
}
async function updateGameAndObjectsInGame(gameState, gameId) {
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
      if (key instanceof Array) {
        gameState[key] = [...updatedGameData[key]];
      } else {
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
        if (piece instanceof PieceFather) {
          console.log("piecedata" + pieceData);
          Object.assign(piece, pieceData);
          return piece;
        }
      });
    }
  });
  console.log(gameState.piecesAlive);
  return gameState;
}
async function fileRequest(url, body, token) {
  const headersFile = {
    apiKey: SUPABASE_KEY,
    Authorization: `Bearer ${token}`,
    "x-upsert": true, // Necessari per a sobreescriure
  };
  const response = await fetch(`${urlBase}${url}`, {
    method: "POST",
    headers: headersFile,
    body,
  });
  if (response.status >= 200 && response.status <= 300) {
    if (response.headers.get("content-type")) {
      const datos = await response.json(); // Retorna un json amb la ruta relativa.
      datos.urlAvatar = `${urlBase}${url}`; // El que
      return datos;
    }
    return {};
  }

  return Promise.reject(await response.json());
}

async function getFileRequest(url, token) {
  const headersFile = {
    apiKey: SUPABASE_KEY,
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: headersFile,
  });
  if (response.status >= 200 && response.status <= 300) {
    if (response.headers.get("content-type")) {
      const datos = await response.blob();
      return datos;
    }
    return {};
  }

  return Promise.reject(await response.json());
}

async function loginSupabase(email, password) {
  const url = `${urlBase}/auth/v1/token?grant_type=password`;
  const data = await supaRequest(url, "post", headers, { email, password });
  return data;
}

async function signUpSupabase(email, password) {
  const url = `${urlBase}/auth/v1/signup`;
  const data = await supaRequest(url, "post", headers, { email, password });
  return data;
}

async function logoutSupabase(token) {
  const url = `${urlBase}/auth/v1/logout`;
  const headersAux = { ...headers, Authorization: `Bearer ${token}` };
  const data = await supaRequest(url, "post", headersAux, {});
  return data;
}

async function recoverPasswordSupabase(email) {
  const url = `${urlBase}/auth/v1/recover`;
  const headersAux = { ...headers };
  const data = await supaRequest(url, "post", headersAux, { email });
  return data;
}
async function getData(URI, token, init, fi) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Range: `${init}-${fi}`,
  };
  const data = await supaRequest(url, "get", headersAux);
  return data;
}
async function getAllData(URI, token) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = { ...headers, Authorization: `Bearer ${token}` };
  const data = await supaRequest(url, "get", headersAux);
  return data;
}
async function getList(params){
  let delta = 5;
  console.log(localStorage.getItem('init'))
  console.log(localStorage.getItem('fi'));
  let data;
  let allData = await getAllData('game?select=id,game,result&result=not.is.null', SUPABASE_KEY);
  console.log(allData);
  let allDataLength = allData.length;
  if(params===undefined){
    localStorage.setItem('init',0);
    localStorage.setItem('fi',4)
     data= await getData('game?select=id,game,result&result=not.is.null', SUPABASE_KEY,localStorage.getItem('init'),localStorage.getItem('fi'));
  }else{
    if(params==='previous'){
      let initAux = parseInt(localStorage.getItem('init')) - delta;
      let fiAux = parseInt(localStorage.getItem('fi')) - delta;
      if(initAux < 0){
        //si es negatiu no actualizem els items
        data = await getData('game?select=id,game,result&result=not.is.null', SUPABASE_KEY,localStorage.getItem('init'),localStorage.getItem('fi'));
      }else{
        //sino ho és els actualitzem i fem la consulta
        localStorage.setItem('init',initAux);
        localStorage.setItem('fi',fiAux)
        data = await getData('game?select=id,game,result&result=not.is.null', SUPABASE_KEY,localStorage.getItem('init'),localStorage.getItem('fi'));
      }
    }else{
      //si es next
      let initAux = parseInt(localStorage.getItem('init')) + delta;
      let fiAux = parseInt(localStorage.getItem('fi')) + delta;
      if(fiAux>=allDataLength){
        //si es menor actualitzem
        //localStorage.setItem('init',initAux);
       // localStorage.setItem('fi',fiAux)
        data = await getData('game?select=id,game,result&result=not.is.null', SUPABASE_KEY,localStorage.getItem('fi'),allDataLength);
      }else{
        localStorage.setItem('init',initAux);
       localStorage.setItem('fi',fiAux)
       data = await getData('game?select=id,game,result&result=not.is.null', SUPABASE_KEY,localStorage.getItem('init'),localStorage.getItem('fi'));
        
      }
    }
  }
  let dataTemplate = '';
  data.forEach((row,index)=>{
    dataTemplate+=`<tr>
    <th scope='row'>${index+parseInt(localStorage.getItem('init'))+1}</th>
    <td>${row.result}</td>
    <td>${row.game.movementRegister}</td>
    </tr>
    `
  })
  console.log(dataTemplate);
  

  return dataTemplate;

}

async function updateData(URI, token, data) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: "return=representation",
  };
  const response = await supaRequest(url, "PATCH", headersAux, data);
  return response;
}

async function createData(URI, token, data) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: "return=representation",
  };
  const response = await supaRequest(url, "post", headersAux, data);
  return response;
}
