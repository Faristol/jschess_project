export function home(){
    let mainWindowRow = document.createElement("div");
    container.innerHTML = `<div class="container mt-5 p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
    <div class="jumbotron text-center">
      <h1 class="display-4">¡Bienvenido al Churumdrez!</h1>
      <p class="lead">¿Estás listo para jugar?</p>
      <hr class="my-4">
      <p>Haz clic en el botón de abajo para comenzar.</p>
      <a class="btn btn-primary btn-lg" href="#/game" role="button">Comenzar Juego</a>
    </div>
  </div>`;
  return mainWindowRow;

}