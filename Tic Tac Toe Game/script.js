let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newGame");
let winnerName = document.querySelector(".winnerName");
let msg = document.querySelector("#msg");

let turnO = true;  //playerX and playerO
let winningPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    for(box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
    winnerName.classList.add("hide");
}

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", ()  => {
        if(turnO){  // player-O
            // console.log("Box was clicked by player-O");
            box.innerText = "O";
            box.style.color = "red";
            turnO =false;
        }
        else{
            // console.log("Box was clicked by player-X");
            box.innerText = "X";
            box.style.color = "blue";
            turnO = true;
        }
        count++;
        box.disabled = true;
        checkWinner();
    })
})

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is player ${winner}`;
    winnerName.classList.remove("hide");
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const drawGame = () => {
    msg.innerText = `Match is draw`;
    winnerName.classList.remove("hide");
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const checkWinner = () => {
    let flag = 0;
    for(let pattern of winningPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText; 
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val == pos2val && pos2val == pos3val){
                // console.log("Winner is player -", pos1val);
                flag = 1;
                showWinner(pos1val);
            }
            if(flag == 0 && count == 9){
                drawGame();
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);