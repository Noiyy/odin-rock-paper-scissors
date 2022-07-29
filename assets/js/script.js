const choices = ["Rock", "Paper", "Scissors"];
let pWinCount = 0;
let cWinCount = 0;

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

function game() {
    for( let i = 0; i < 5; i++) {
        let playerSelection = prompt("Rock, paper, scissors! - make your choice:", "Rock");
        playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
        while (!choices.includes(playerSelection)) {
            playerSelection = prompt("You can choose only rock, paper, scissors!", "Rock");
            playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
        }

        const computerSelection = getComputerChoice();
        console.log(playRound(playerSelection, computerSelection));
    }

    console.log(getWinner(pWinCount, cWinCount));
}

function getWinner(pWin, cWin) {
    const winText = `\tYou're the winner! You won ${pWin} : ${cWin}`;
    const loseText = `\tYou lost ${pWin} : ${cWin}`;
    const tieText = `\tThe game ended with a tie! ${pWin} : ${cWin}`;

    if (pWin > cWin) return winText;
    else if (pWin == cWin) return tieText;
    else return loseText;
}

game();