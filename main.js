document.addEventListener("DOMContentLoaded",start);
function start(){
    /*create table and put pieces*/
    createTablePieces();
}
function createTablePieces(){
    let chessBoard = document.querySelector("#chessboard");
    /*black top white down*/
    let charCode = 'a'.charCodeAt(0);
   for(let i=0;i<8;i++){
    let row = 8-i;
    /*if i%2==0 true (starts with green) else false (starts with white)*/
    let greenStart = i%2===0;
    for (let j=0;j<8;j++){
        /*if greenStart = true -> put green when j%2===0
        -> false: put white when j%2===0
        */
        let color = greenStart?(j%2===0?"green":"white"):(j%2===0?"white":"green");
        let column = String.fromCharCode((charCode+j));
        let square = document.createElement("span");
        square.classList.add(color);
        square.classList.add("square");
        square.id = column+row;
        chessBoard.appendChild(square);
    }
   }
}