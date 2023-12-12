
export function table(){
    let mainWindowRow = document.createElement("div");
    mainWindowRow.innerHTML = ` <table>
    <tbody>
        <tr>
            <td class="numletter">8</td>
            <td colspan="8" rowspan="8"><div id="chessboard"></div></td>
        </tr>
        <tr>
            <td class="numletter">7</td>
        </tr>
        <tr>
            <td class="numletter">6</td>
        </tr>
        <tr>
            <td class="numletter">5</td>
        </tr>
        <tr>
            <td class="numletter">4</td>
        </tr>
        <tr>
            <td class="numletter">3</td>
        </tr>
        <tr>
            <td class="numletter">2</td>
        </tr>
        <tr>
            <td class="numletter">1</td>
        </tr>
        <tr>
            <td class="numletter"></td>
            <td class="numletter">a</td>
            <td class="numletter">b</td>
            <td class="numletter">c</td>
            <td class="numletter">d</td>
            <td class="numletter">e</td>
            <td class="numletter">f</td>
            <td class="numletter">g</td>
            <td class="numletter">h</td>
        </tr>
    </tbody>
    </table>`;
  return mainWindowRow;

}