const pixels = 49
const adj = Math.sqrt(pixels)

const games = {
  "22/03/2022": [9, 16, 11, 18, 28, 36, 37, 38, 39, 40, 34],
  "23/03/2022": [8, 16, 23, 30, 31, 32, 2, 5, 18, 17, 12, 36, 40],
  "24/03/2022": [0, 8, 42, 36, 6, 12, 48, 40, 30, 32, 18, 16],
  "25/03/2022": [21, 15, 9, 3, 11, 19, 27, 22, 29, 26, 33]
}

// import {games} from "/dordle/games.js";

const date = new Date()
const today = date.toLocaleDateString('en-GB').toString();
console.log(games[today]);

const game = games[today];

let selection = [];
let totalSelected = 0;
let allCorrect = [];
let allWrong = [];
let allAdjacent = [];

let message = document.getElementById("message");
let guesses = document.getElementById("guesses");

let displayCorrect = document.getElementById("display-correct");
displayCorrect.addEventListener('click', function(){
  for(let i = 0; i < pixels; i++){
    for(let j = 0; j < allCorrect.length; j++){
      if (i == allCorrect[j]){
        const pixel = document.getElementById(i);
        if(pixel.classList.contains("correct-history")){
          pixel.classList.remove("correct-history")
        }
        else{
        pixel.classList.add("correct-history")
      }
      }
    }
  }
})
let displayWrong = document.getElementById("display-wrong");
displayWrong.addEventListener('click', function(){
  for(let i = 0; i < pixels; i++){
    for(let j = 0; j < allWrong.length; j++){
      if (i == allWrong[j]){
        const pixel = document.getElementById(i);
        if(pixel.classList.contains("wrong-history")){
          pixel.classList.remove("wrong-history")
        }
        else{
        pixel.classList.add("wrong-history")
      }
      }
    }
  }
})

let displayAdjacent = document.getElementById("display-adjacent");
displayAdjacent.addEventListener('click', function(){
  for(let i = 0; i < pixels; i++){
    for(let j = 0; j < allAdjacent.length; j++){
      if (i == allAdjacent[j]){
        const pixel = document.getElementById(i);
        if(pixel.classList.contains("adjacent-history")){
          pixel.classList.remove("adjacent-history")
        }
        else{
        pixel.classList.add("adjacent-history")
      }
      }
    }
  }
})

let easifyButton = document.getElementById("easify");
let displayButtons = document.getElementById("display-buttons")
easifyButton.addEventListener('click', function(){
  easifyButton.classList.add("hidden");
  displayButtons.classList.remove("hidden");
})


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
    pixel.className = "pixel";
  }
  lopp1: for (let i = 0; i < selection.length; i++) {
    loop2: for (let j = 0; j < game.length; j++) {
      const pixel = document.getElementById(selection[i]);
      if (!pixel.classList.contains("correct") && !pixel.classList.contains("adjacent") ){
       pixel.classList.add("wrong");
     }
       if (!pixel.classList.contains("correct") && (selection[i] == (game[j] + 1) || selection[i] == (game[j] - 1) || selection[i] == (game[j] + adj) || selection[i] == (game[j] - adj))) {
         pixel.classList.remove("wrong");
         pixel.classList.add("adjacent");
       }
       if (selection[i] == game[j]) {
         pixel.classList.remove("wrong");
         pixel.classList.remove("adjacent");
         pixel.classList.add("correct");
         guess.push(Number(selection[i]))
         if (!allCorrect.includes(pixel.getAttribute('id'))){
           allCorrect.push(pixel.getAttribute('id'));
         }
       }
      }
  }
  for(let i = 0; i < pixels; i++){
      const pixel = document.getElementById(i);
      if(pixel.classList.contains("wrong")){
        if (!allWrong.includes(pixel.getAttribute('id'))){
          allWrong.push(pixel.getAttribute('id'));
        }
      }
  }

  for(let i = 0; i < pixels; i++){
      const pixel = document.getElementById(i);
      if(pixel.classList.contains("adjacent")){
        if (!allAdjacent.includes(pixel.getAttribute('id'))){
          allAdjacent.push(pixel.getAttribute('id'));
        }
      }
  }

setTimeout(()=>{
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
  if(displayButtons.classList.contains("hidden")){
      easifyButton.classList.remove("hidden");
  }
  },1000)
})

function reset(guessNum, gameOver) {
  // console.log(guessNum)
  let boardWrapper = document.getElementById("board-wrapper")
  // let board = document.getElementById("board");
  // let guessBoard = board.cloneNode(true);
  let guessBoardWrapper = boardWrapper.cloneNode(true);
  let guessBoard = guessBoardWrapper.children[0];
  guessBoardWrapper.setAttribute('id', 'guess-board-wrapper-' + guessNum);
  guessBoard.setAttribute('id', 'guess-board-' + guessNum);
  for(let i = 0; i < guessBoard.children.length; i++){
     let guessPixel = guessBoard.children[i];
     guessPixel.setAttribute('id',"guess-" + guessNum + "pixel-" + i)
     guessPixel.classList.remove("pixel")
     guessPixel.classList.add("guess-pixel")
  }
  guessBoard.classList.remove("board")
  guessBoard.classList.add("guess-board")
  guessBoardWrapper.classList.add("guess-board-wrapper");
  guesses.appendChild(guessBoardWrapper);
  guessBoardWrapper.classList.add("flip");
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
