"use strict";
// Marc
// Tonio
var Choice;
(function (Choice) {
    Choice[Choice["Rock"] = 0] = "Rock";
    Choice[Choice["Paper"] = 1] = "Paper";
    Choice[Choice["Scissors"] = 2] = "Scissors";
})(Choice || (Choice = {}));
var ResultState;
(function (ResultState) {
    ResultState[ResultState["PlayerWon"] = 0] = "PlayerWon";
    ResultState[ResultState["ComputerWon"] = 1] = "ComputerWon";
    ResultState[ResultState["Draw"] = 2] = "Draw";
})(ResultState || (ResultState = {}));
let playerActionMsg = document.getElementById("player-action-msg");
let computerActionMsg = document.getElementById("computer-action-msg");
let playerScoreMsg = document.getElementById("player-score-msg");
let computerScoreMsg = document.getElementById("computer-score-msg");
let resultMsg = document.getElementById("result-msg");
let roundMsg = document.getElementById("round-msg");
let body = document.getElementById("body");
let resultScreen = document.createElement("h1");
const maxScore = 5;
let playerChoice;
let computerChoice;
let resultState;
let playerScore = 0;
let computerScore = 0;
let round = 1;
function generalActionEffect(playerChoice) {
    // 1.2. Update action-msg state of player.
    if (playerActionMsg !== null) {
        playerActionMsg.textContent = `You chose ${choiceEnumToString(playerChoice)}`;
    }
    // 2.1. Get computer's choice (randomly).
    computerChoice = intToChoiceEnum(getRandomInt(3));
    // 2.2. Update action-msg state of computer.
    if (computerActionMsg !== null) {
        computerActionMsg.textContent = `Computer chose ${choiceEnumToString(computerChoice)}`;
    }
    // 3. Determine who won.
    resultState = whoWon(playerChoice, computerChoice);
    // 4. Update score.
    if (resultState === ResultState.PlayerWon) {
        playerScore++;
        if (playerScoreMsg !== null) {
            playerScoreMsg.textContent = `Player: ${playerScore}`;
        }
    }
    else if (resultState === ResultState.ComputerWon) {
        computerScore++;
        if (computerScoreMsg !== null) {
            computerScoreMsg.textContent = `Computer: ${computerScore}`;
        }
    }
    // Determine if game is over (max. score is five).
    if (playerScore === maxScore || computerScore === maxScore) {
        if (playerScore === maxScore) {
            resultScreen.textContent = "Player wins";
        }
        else if (computerScore === maxScore) {
            resultScreen.textContent = "Computer wins";
        }
        // Clear body.
        if (body !== null) {
            body.innerHTML = "";
        }
        // Create result screen.
        body === null || body === void 0 ? void 0 : body.appendChild(resultScreen);
    }
    // 5. Update result message.
    if (resultMsg !== null) {
        resultMsg.textContent = resultStateEnumToStringMsg(resultState);
    }
    // 6. Update round.
    round++;
    if (roundMsg !== null) {
        roundMsg.textContent = `${round}`;
    }
}
function pickRock() {
    // 1.1. Get player's choice.
    generalActionEffect(Choice.Rock);
}
function pickPaper() {
    // 1.1. Get player's choice.
    generalActionEffect(Choice.Paper);
}
function pickScissors() {
    // 1.1. Get player's choice.
    generalActionEffect(Choice.Scissors);
}
// [ UTILITY FUNCTIONS ].
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function choiceEnumToString(choice) {
    switch (choice) {
        case Choice.Rock:
            return "Rock";
        case Choice.Paper:
            return "Paper";
        case Choice.Scissors:
            return "Scissors";
        default:
            return "";
    }
}
function intToChoiceEnum(choice) {
    switch (choice) {
        case 0:
            return Choice.Rock;
        case 1:
            return Choice.Paper;
        case 2:
            return Choice.Scissors;
        default:
            return Choice.Rock;
    }
}
function resultStateEnumToStringMsg(resultState) {
    switch (resultState) {
        case ResultState.PlayerWon:
            return "Player won";
        case ResultState.ComputerWon:
            return "Computer won";
        case ResultState.Draw:
            return "Draw";
        default:
            return "";
    }
}
function whoWon(playerChoice, computerChoice) {
    // Draw condition.
    if (playerChoice === computerChoice) {
        return ResultState.Draw;
    }
    // Determine who won by comparing player's choice and computer's choice.
    if (playerChoice === Choice.Rock && computerChoice === Choice.Scissors) {
        return ResultState.PlayerWon;
    }
    else if (playerChoice === Choice.Paper && computerChoice === Choice.Rock) {
        return ResultState.PlayerWon;
    }
    else if (playerChoice === Choice.Scissors && computerChoice === Choice.Paper) {
        return ResultState.PlayerWon;
    }
    else if (playerChoice === Choice.Rock && computerChoice === Choice.Paper) {
        return ResultState.ComputerWon;
    }
    else if (playerChoice === Choice.Paper && computerChoice === Choice.Scissors) {
        return ResultState.ComputerWon;
    }
    else if (playerChoice === Choice.Scissors && computerChoice === Choice.Rock) {
        return ResultState.ComputerWon;
    }
    else {
        return ResultState.Draw;
    }
}
