const choices = ["Rock", "Paper", "Scissors"];
let pWinCount = 0;
let cWinCount = 0;

const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
    btn.addEventListener("click", getPlayerChoice);
})
const resultDiv = document.querySelector("#roundResult");

function getPlayerChoice() {
    const playerSelection = this.textContent.trim();
    const computerSelection = getComputerChoice();

    resultDiv.textContent = playRound(playerSelection, computerSelection);
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
    const winText = `\tYou're the winner! You won ${pWin} : ${cWin}`;
    const loseText = `\tYou lost ${pWin} : ${cWin}`;
    const tieText = `\tThe game ended with a tie! ${pWin} : ${cWin}`;

    if (pWin > cWin) return winText;
    else if (pWin == cWin) return tieText;
    else return loseText;
}