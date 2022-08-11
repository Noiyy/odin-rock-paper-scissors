const choices = ["Rock", "Paper", "Scissors"];
let pWinCount = 0;
let cWinCount = 0;

const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
    btn.addEventListener("click", getPlayerChoice);
})
const roundResult = document.querySelector(".roundResult");
const gameResultDiv = document.querySelector("#gameResult");
const pScorePara = document.querySelector(".pScore");
const cScorepara = document.querySelector(".cScore");
const container = document.querySelector(".container");

function getPlayerChoice() {
    if (gameResultDiv.textContent) return;
    const playerSelection = this.textContent.trim();
    const computerSelection = getComputerChoice();

    roundResult.textContent = playRound(playerSelection, computerSelection);
    pScorePara.textContent = "You: " + pWinCount;
    cScorepara.textContent = "Computer: " + cWinCount;
    checkForWinner();
}

function checkForWinner() {
    if (pWinCount == 5 || cWinCount == 5) {
        gameResultDiv.textContent = getWinner(pWinCount, cWinCount);

        const playAgainBtn = document.createElement("button");
        playAgainBtn.classList.add("playAgainBtn")
        playAgainBtn.textContent = "Play again?";
        playAgainBtn.addEventListener("click", resetGame);

        container.appendChild(playAgainBtn);
    }
}

function resetGame() {
    pWinCount = 0;
    cWinCount = 0;
    pScorePara.textContent = "You: " + pWinCount;
    cScorepara.textContent = "Computer: " + cWinCount;
    gameResultDiv.textContent = "";
    roundResult.textContent = "Click on a button to make a choice!";
    container.removeChild(document.querySelector(".playAgainBtn"));
}

function getComputerChoice() {
    let randomNum = Math.floor(Math.random()*choices.length);
    const choice = choices[randomNum];
    return choice;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `It's a tie! ${playerSelection} ties with ${computerSelection}`;
    } else if (playerSelection === "Rock" && computerSelection === "Scissors") {
        pWinCount++;
        return "You win! Rock beats Scissors";
    } else if (playerSelection === "Paper" && computerSelection === "Rock") {
        pWinCount++;
        return "You win! Paper beats Rock";
    } else if (playerSelection === "Scissors" && computerSelection === "Paper") {
        pWinCount++;
        return "You win! Scissors beats Paper";
    } else {
        cWinCount++;
        return `You lose! ${computerSelection} beats ${playerSelection}`;    
    }
}

function getWinner(pWin, cWin) {
    const winText = `You're the winner! You won the game ${pWin} : ${cWin}`;
    const loseText = `You lost the game ${pWin} : ${cWin}`;
    const tieText = `The game ended with a tie! ${pWin} : ${cWin}`;

    if (pWin > cWin) return winText;
    else if (pWin == cWin) return tieText;
    else return loseText;
}