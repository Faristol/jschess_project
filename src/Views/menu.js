export { menu };
function menu() {
  let navBar = document.createElement("span");
  navBar.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-info border border-primary rounded">
<a class="navbar-brand">Churumdrez</a>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <a class="nav-link" href="#/game">Game</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#/profile">Profile</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#/listgames">List games</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#/login">Logout</a>
    </li>
</div>
</nav><br><br>`;

  return navBar;
}
