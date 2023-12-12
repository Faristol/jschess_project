export { listgames };
import { getList } from "../services/http.js";
async function listgames(params) {
    let listGames =  await getList(params);
  let list = document.createElement("span");
  list.innerHTML = `<table class="table table-hover table-primary">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Result</th>
      <th scope="col">Movements</th>
    </tr>
  </thead>
  <tbody>
    ${listGames}
  </tbody>
</table>
<a href="#/listgames?previous" class="btn btn-primary">Previous</a>
<a href="#/listgames?next" class="btn btn-primary">Next</a>
`;
  return list;
}
