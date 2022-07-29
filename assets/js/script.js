const choices = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
    let randomNum = Math.floor(Math.random()*choices.length);
    const choice = choices[randomNum];
    return choice;
}