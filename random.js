const date = new Date()
const year = date.getFullYear()
const copywrite = document.getElementById("copywrite")
copywrite.innerHTML = "© " + year + " PixMix"

const rules = document.getElementById("rules");
const help = document.getElementById("help");
help.addEventListener('click',function(){
  if(rules.classList.contains("hidden")){
    rules.classList.remove("hidden");
  }
  else{
    rules.classList.add("hidden");
  }
})

let adj = 0;
let pixels = 0;
let game = [];
let selection = [];
let totalSelected = 0;
let allCorrect = [];
let allWrong = [];
let allAdjacent = [];

const submit = document.getElementById("submit");
let inputWrapper = document.getElementById("input-wrapper");
let message = document.getElementById("message");
let gridSize = document.getElementById("grid-size");
let gameSize = document.getElementById("game-size");
let createGame = document.getElementById("create-grid");
let levelSelector = document.getElementById("level-input");
let levelPic = document.getElementById("level-pic");

levelSelector.addEventListener('input', function(){
let level = levelSelector.value;
if (level > 0 && level <= 5){
levelPic.innerHTML = "😁"
}
if (level > 5 && level <= 20){
levelPic.innerHTML = "😀"
}
if (level > 20 && level <= 40){
levelPic.innerHTML = "🙂"
}
if (level > 40 && level <= 60){
levelPic.innerHTML = "😐"
}
if (level > 60 && level <= 80){
levelPic.innerHTML = "😮"
}
if (level > 80 && level <= 95){
levelPic.innerHTML = "😵"
}
if (level > 95){
levelPic.innerHTML = "🤯"
}
})

createGame.addEventListener('click', function(){
adj = Number(gridSize.value);
gameLength = gameSize.value;
pixels = Math.pow(adj, 2);
console.log("pixels", pixels)
if((adj > 100) || (adj == 0) ||(gameLength >= pixels) || (gameLength == 0)) {
message.classList.remove("hidden");
message.innerHTML = "Grid size must be between 1-100, game must be smaller than grid and bigger than 0"
}
else{
message.innerHTML = "Have fun!"
//create the game
let randomPixel;
for(let i= 0; i < gameLength; i++){
  randomPixel = Math.floor(Math.random()*(pixels +1));
  if(!game.includes(randomPixel)){
    game.push(randomPixel)
  }
  else{
    i--
  }
}
console.log(game)
const root = document.querySelector(':root')
root.style.setProperty("--pixels", adj);

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

submit.classList.remove("hidden");
message.classList.remove("hidden");
inputWrapper.classList.add("hidden");
}
})


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
     if ((!pixel.classList.contains("correct") &&
        (Number(selection[i]))%adj !== 0) &&
        ((Number(selection[i]) + 1) %adj !== 0) &&
        (selection[i] == (game[j] + 1) ||
         selection[i] == (game[j] - 1) ||
         selection[i] == (game[j] + adj) ||
         selection[i] == (game[j] - adj))) {
      console.log("a")
       pixel.classList.remove("wrong");
       pixel.classList.add("adjacent");
     }
     if ((!pixel.classList.contains("correct")) &&
        (Number(selection[i])%adj == 0) &&
        (selection[i] == (game[j] - 1) ||
         selection[i] == (game[j] + adj) ||
         selection[i] == (game[j] - adj))) {
      console.log("b")
       pixel.classList.remove("wrong");
       pixel.classList.add("adjacent");
     }
     if ((!pixel.classList.contains("correct")) &&
        ((Number(selection[i]) + 1)%adj == 0) &&
         (selection[i] == (game[j] + 1) ||
         selection[i] == (game[j] + adj) ||
         selection[i] == (game[j] - adj))) {
      console.log("c")
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
  // guessBoardWrapper.classList.add("flip");
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
