export { result };
function result() {
  let resultSpan = document.createElement("span");
  resultSpan.classList.add('form-centrat','content')
  resultSpan.innerHTML = `<div class="card bg-info border border-primary rounded form-centrat content">
  <div class="card-header">
    Resultat
  </div>
  <div class="card-body">
    <p class="card-text">${localStorage.getItem("resultat")}</p>
    <a href="#/login" class="btn btn-primary">Logout</a>
    <a href="#/" class="btn btn-primary">Play</a>
  </div>
</div>`;

  return resultSpan;
}
