let X=document.querySelector("#X");
let O=document.querySelector("#O");

let boxes=document.querySelectorAll(".grid-item");
let bigbox=document.querySelector(".grid-container");
// console.log(boxes);
// console.log(boxes[2]);
// console.log(bigbox.children[2]);
let restButton=document.querySelector("#reset");

let startWithO=true; //default choice
//if user click on X button, then default shifts to X from O

X.addEventListener("click",function(){
    startWithO=false;
    X.disabled=true;
})

let winningPatterns=
[
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8],      
    [0,4,8], 
    [2,4,6]
];

let moves=0;
let gameOver = false;

boxes.forEach((box) => {
    box.addEventListener("click", function () {
        if (gameOver || box.innerHTML !== "") return;

        if (startWithO) {
            box.innerHTML = `<h1>O</h1>`;
            startWithO = false;
        } else {
            box.innerHTML = `<h1>X</h1>`;
            startWithO = true;
        }

        box.style.pointerEvents = "none";
        moves++;

        if (moves >= 5) {
            const winnerFound = checkWinner();

            if (!winnerFound && moves === 9) {
                alert("It's a draw!");
                gameOver = true;
            }
        }
    });
});


restButton.addEventListener("click", function() {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.pointerEvents = "auto";
    });
    startWithO = true;
    bigbox.style.pointerEvents = "auto";
    X.style.pointerEvents = "auto";
    X.disabled=false;
    moves=0;
    gameOver = false;
});

function checkWinner() {
    for (let pattern of winningPatterns) {
        let pos1 = bigbox.children[pattern[0]].innerText;
        let pos2 = bigbox.children[pattern[1]].innerText;
        let pos3 = bigbox.children[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                alert(`${pos1} wins!`);
                gameOver = true;
                return true; 
            }
        }
    }
    return false; 
}
