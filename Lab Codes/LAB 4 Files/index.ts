// Math.random() = [0, 1)
// Math.floor(Math.random() * 100) = [0, 100)
// Math.floor(Math.random() * 100) + 100 = [100, 200)
// Math.floor(Math.random() * 9901) + 100 = [100, 10000]
// ... = [100, 10000]

const n = Math.floor(Math.random() * 9901) + 100;
let k = 2;

let currentPlayer = 1;
const numberOfPlayers = 2;

function updateN() {
  const nText = document.getElementById("n");
  if (nText !== null) {
    nText.textContent = `${n}`;
  }
}

function updateK() {
  const kText = document.getElementById("k");
  if (kText !== null) {
    kText.textContent = `${k}`;
  }
}

function updateTurn() {
  const turnText = document.getElementById("turn");
  if (turnText !== null) {
    turnText.textContent = `${currentPlayer}`;
  }
}

function makeButtons() {
  const nums = [2, 3, 4, 5, 6, 7, 8, 9];

  const buttons = document.getElementById("buttons");

  for (const num of nums) {
    // <button type="button" onclick=...>2</button>
    const button = document.createElement("button");
    button.textContent = `${num}`;
    button.onclick = () => {
      console.log(`Player ${currentPlayer} chose ${num}`);
      k *= num;
      updateK();

      if (k >= n) {
        console.log(`Player ${currentPlayer} won`);

        const content = document.getElementById("content");
        if (content !== null) {
          content.innerHTML = "";

          const winText = document.createElement("h1");
          winText.textContent = `Player ${currentPlayer} won`;
          content.appendChild(winText);
        }

      } else {
        currentPlayer = (currentPlayer % numberOfPlayers) + 1;
        updateTurn();
      }
    };
    buttons?.appendChild(button);
  }
}

updateN();
updateK();
updateTurn();
makeButtons();
