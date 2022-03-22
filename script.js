const pixels = 49
const adj = Math.sqrt(pixels)

const games = {
  "22/03/2022": [9, 16, 11, 18, 28, 36, 37, 38, 39, 40, 34],
  "23/03/2022": [8, 16, 23, 30, 31, 32, 2, 5, 18, 17, 12, 36, 40],
  "24/03/2022": [0, 8, 42, 36, 6, 12, 48, 40, 30, 32, 18, 16],
}

const date = new Date()
const today = date.toLocaleDateString('en-GB').toString();
console.log(games[today]);

const game = games[today];
let selection = [];
let totalSelected = 0;

let message = document.getElementById("message");
let guesses = document.getElementById("guesses");

message.innerHTML = "Select " + game.length;

for (let i = 0; i < pixels; i++) {
  const pixel = document.createElement("div")
  pixel.classList.add("pixel")
  pixel.setAttribute('id', i)
  board.appendChild(pixel)
  pixel.addEventListener('click', function(event) {
    if (pixel.classList.contains("selected")) {
      let index = selection.indexOf(pixel.getAttribute('id'));
      if (index !== -1) {
        selection.splice(index, 1)
      }
      pixel.classList.remove("selected");
      totalSelected--
      message.innerHTML = "Select " + (game.length - totalSelected);
    } else {
      if ((game.length - totalSelected) > 0) {
        pixel.classList.add("selected")
        // console.log(pixel.getAttribute('id'))
        totalSelected++
        selection.push(pixel.getAttribute('id'))
        message.innerHTML = "Select " + (game.length - totalSelected);
      } else {
        message.innerHTML = "You have selected the max amount of pixels for this puzzle!"
      }
    }
  })
  // console.log("pixel added")
}

const submit = document.getElementById("submit")

let guessNum = 0;
let guess = [];
submit.addEventListener('click', function(event) {
  console.log(selection)
  totalSelected = 0;
  guessNum++
  guess = [];
  for (let i = 0; i < pixels; i++) {
    const pixel = document.getElementById(i);
    pixel.className = "";
  }
  lopp1: for (let i = 0; i < selection.length; i++) {
    loop2: for (let j = 0; j < game.length; j++) {
      if (selection[i] == game[j]) {
        const pixel = document.getElementById(selection[i]);
        pixel.classList.remove("adjacent");
        pixel.classList.add("correct");
        guess.push(Number(selection[i]))
        break loop2;
      } else if (selection[i] == (game[j] + 1) || selection[i] == (game[j] - 1) || selection[i] == (game[j] + adj) || selection[i] == (game[j] - adj)) {
        const pixel = document.getElementById(selection[i]);
        pixel.classList.add("adjacent");
      }

    }
  }
  let gameOver = false;
  if (selection.length === game.length) {
    let index = 0;
    guess.sort();
    game.sort();
    while (guess[index] === game[index] && index <= game.length) {
      console.log(game.length)
      console.log(index)
      if (index === game.length) {
        gameOver = true;
        console.log("you win!")
        reset(guessNum, gameOver)
        message.innerHTML = "You Win!"
        let buttonWrapper = document.getElementById("button-wrapper")
        let share = submit.cloneNode(true);
        share.innerHTML = "Share result!";
        submit.remove();
        buttonWrapper.appendChild(share);
        share.addEventListener('click', function() {
          console.log("Shared!")
          // printResults()
        })
      }
      console.log(index)
      index++
    }
  }
  if (!gameOver) {
    reset(guessNum, gameOver);
    message.innerHTML = "Try again..."
  }
  selection = [];
})

function reset(guessNum, gameOver) {
  // console.log(guessNum)
  let board = document.getElementById("board");
  let guessBoard = board.cloneNode(true);
  guessBoard.setAttribute('id', 'guess-board-' + guessNum);
  guessBoard.classList.remove("board")
  guessBoard.classList.add("guess-board")
  guesses.appendChild(guessBoard);
  if (!gameOver) {
    for (let i = 0; i < pixels; i++) {
      const pixel = document.getElementById(i);
      pixel.className = "pixel";
    }
  }
}

function printResults(){
//
}
