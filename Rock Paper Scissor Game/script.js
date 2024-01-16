let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
    // rock, paper, scissor
    const options = ["rock", "paper", "scissor"]
    const randIdx = Math.floor(Math.random()*3); // genrate random index b/w 0 to 2 for options
    return options[randIdx];
}

const drawGame = () => {
    console.log("Game was draw");
    msg.innerText = "Game was draw";
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        console.log("You win! your", userChoice, "beats", compChoice);
        msg.innerText = "You Win";
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        compScorePara.innerText = compScore;
        console.log("Comp win!", compChoice, "beats your", userChoice);
        msg.innerText = "You Lose";
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userChoice) => {
    console.log("user choice = ", userChoice);
    const compChoice = genCompChoice();
    console.log("comp choice = ", compChoice);

    if(userChoice == compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice == "rock"){
            // scissor or paper
            userWin = compChoice == "paper" ? false : true;
        }
        else if(userChoice == "paper"){
            // scissor or rock
            userWin = compChoice == "scissor" ? false : true;
        }
        else{
            // rock or paper
            userWin = compChoice == "rock" ? false : true;
        }
        showWinner(userWin, userChoice,compChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        // console.log("Choice was clicked", userChoice);
        playGame(userChoice);
    })
}) 