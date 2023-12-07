export { menu };
function menu() {
  let navBar = document.createElement("span");
  navBar.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-info border border-primary rounded">
<a class="navbar-brand">Churumdrez</a>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <a class="nav-link" href="#">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Profile</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Your games</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">All games</a>
    </li>
</div>
</nav><br><br>`;

  return navBar;
}
