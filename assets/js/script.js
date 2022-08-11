const choices = ["Rock", "Paper", "Scissors"];
let pWinCount = 0;
let cWinCount = 0;

const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
    btn.addEventListener("click", getPlayerChoice);
    btn.addEventListener("transitionend", removeRotation);
});
const roundResult = document.querySelector(".roundResult");
const gameResultDiv = document.querySelector("#gameResult");
const pScore = document.querySelector(".pScore span");
const cScore = document.querySelector(".cScore span");
const resultContainer = document.querySelector("#main .row.results");

function removeRotation(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("chosen");
}

function getPlayerChoice() {
    if (gameResultDiv.textContent) return;
    const playerSelection = this.dataset.choice;
    const computerSelection = getComputerChoice();

    roundResult.textContent = playRound(playerSelection, computerSelection);
    pScore.textContent = pWinCount;
    cScore.textContent = cWinCount;
    this.classList.add("chosen");
    checkForWinner();
}

function checkForWinner() {
    if (pWinCount == 5 || cWinCount == 5) {
        gameResultDiv.textContent = getWinner(pWinCount, cWinCount);

        const playAgainBtn = document.createElement("button");
        playAgainBtn.classList.add("playAgainBtn")
        playAgainBtn.textContent = "Play again?";
        playAgainBtn.addEventListener("click", resetGame);

        resultContainer.appendChild(playAgainBtn);
    }
}

function resetGame() {
    pWinCount = 0;
    cWinCount = 0;
    pScore.textContent = pWinCount;
    cScore.textContent = cWinCount;
    gameResultDiv.textContent = "";
    roundResult.textContent = "Click on a button to make a choice!";
    resultContainer.removeChild(document.querySelector(".playAgainBtn"));
    document.body.style.background = "rgb(53, 53, 53)";
}

function getComputerChoice() {
    let randomNum = Math.floor(Math.random()*choices.length);
    const choice = choices[randomNum];
    return choice;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        document.body.style.backgroundImage = "url(assets/images/tie.jpg)";
        return `It's a tie! ${playerSelection} ties with ${computerSelection}`;
    } else if (playerSelection === "Rock" && computerSelection === "Scissors") {
        pWinCount++;
        document.body.style.backgroundImage = "url(assets/images/won.jpg)";
        return "You win! Rock beats Scissors";
    } else if (playerSelection === "Paper" && computerSelection === "Rock") {
        pWinCount++;
        document.body.style.backgroundImage = "url(assets/images/won.jpg)";
        return "You win! Paper beats Rock";
    } else if (playerSelection === "Scissors" && computerSelection === "Paper") {
        pWinCount++;
        document.body.style.backgroundImage = "url(assets/images/won.jpg)";
        return "You win! Scissors beats Paper";
    } else {
        cWinCount++;
        document.body.style.backgroundImage = "url(assets/images/lost.jpg)";
        return `You lose! ${computerSelection} beats ${playerSelection}`;    
    }
}

function getWinner(pWin, cWin) {
    const winText = `You're the winner! You won the game!`;
    const loseText = `You lost the game!`;
    const tieText = `The game ended with a tie!`;

    if (pWin > cWin) return winText;
    else if (pWin == cWin) return tieText;
    else return loseText;
}