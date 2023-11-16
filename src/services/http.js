export { insertNewGame,supaRequest, SUPABASE_KEY};
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
  const url = 'https://fgjdwpkhvmbjdncfvsbj.supabase.co/rest/v1/game';
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: "return=representation",
  };
  const dataGame = {game : data};
  const response = await supaRequest(url, "post", headersAux, dataGame);
  console.log(response);
  const resolvedId = response[0]?.id;
  saveGameId(resolvedId);
  return response;
}
function saveGameId(id){
  localStorage.setItem("gameId",id);
}
function getGameId(){
  localStorage.getItem("gameId");
}
async function updateGame() {

}
async function getGameData() {

}

