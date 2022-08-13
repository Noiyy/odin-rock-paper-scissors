const choices = ["Rock", "Paper", "Scissors"];
let pWinCount = 0;
let cWinCount = 0;

const buttons = document.querySelectorAll("button");
const roundResult = document.querySelector(".roundResult");
const gameResultDiv = document.querySelector("#gameResult");
const pScore = document.querySelector(".pScore span");
const cScore = document.querySelector(".cScore span");
const resultContainer = document.querySelector("#main .row.results");

buttons.forEach((btn) => {
    btn.addEventListener("click", getPlayerChoice);
    btn.addEventListener("transitionend", removeRotation);
});
roundResult.addEventListener("transitionend", removeScale);

function removeRotation(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("chosen");
}

function removeScale(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("announced");
}

function getPlayerChoice() {
    if (gameResultDiv.textContent) return;
    const playerSelection = this.dataset.choice;
    const computerSelection = getComputerChoice();

    roundResult.textContent = playRound(playerSelection, computerSelection);
    pScore.textContent = pWinCount;
    cScore.textContent = cWinCount;
    this.classList.add("chosen");
    roundResult.classList.add("announced");
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
    buttons.forEach((btn) => {
        if (btn.classList.contains("chosen")) btn.classList.remove("chosen");
    })
    if (roundResult.classList.contains("announced")) roundResult.classList.remove("announced");
}

function getComputerChoice() {
    let randomNum = Math.floor(Math.random()*choices.length);
    const choice = choices[randomNum];
    return choice;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        changeBg("tie");
        return `It's a tie! ${playerSelection} ties with ${computerSelection}`;
    } else if (playerSelection === "Rock" && computerSelection === "Scissors") {
        pWinCount++;
        changeBg("won");
        return "You win! Rock beats Scissors";
    } else if (playerSelection === "Paper" && computerSelection === "Rock") {
        pWinCount++;
        changeBg("won");
        return "You win! Paper beats Rock";
    } else if (playerSelection === "Scissors" && computerSelection === "Paper") {
        pWinCount++;
        changeBg("won");
        return "You win! Scissors beats Paper";
    } else {
        cWinCount++;
        changeBg("lost");
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

// Konosuba background konami code easter egg
let konosuba = false;
const keyPattern = ["k", "o", "n", "o", "s", "u", "b", "a"];
let current = 0;
document.addEventListener('keydown', keyHandler, false);

function keyHandler(e) {
    if (keyPattern.indexOf(e.key) < 0 || e.key !== keyPattern[current]) {
        current = 0;
        return;
    }

    current++;
    if (keyPattern.length === current) konosuba = true;
};

function changeBg(bgType="") {
    if (konosuba)
        document.body.style.backgroundImage = `url(assets/images/${bgType}.jpg)`;
    else return;
}