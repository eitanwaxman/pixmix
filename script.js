const date = new Date()
const year = date.getFullYear()
const copywrite = document.getElementById("copywrite")
copywrite.innerHTML = "© " + year + " PixMix"


const pixels = 49
const adj = Number(Math.sqrt(pixels));
const root = document.querySelector(':root')
root.style.setProperty("--pixels", adj);

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


const games = {
  "22/03/2022": [9, 16, 11, 18, 28, 36, 37, 38, 39, 40, 34],
  "23/03/2022": [8, 16, 23, 30, 31, 32, 2, 5, 18, 17, 12, 36, 40],
  "24/03/2022": [0, 8, 42, 36, 6, 12, 48, 40, 30, 32, 18, 16],
  "25/03/2022": [21, 15, 9, 3, 11, 19, 27, 22, 29, 26, 33],
  "26/03/2022": [42,35,28,21,7,14,0,1,2,3,4,5,6,13,20,27,34,41,47,48,46,44,43,24],
  "27/03/2022": [8,10,12,26,40,38,24,22,36],
  "28/03/2022": [8,15,16,9,12,19,18,11,36,37,38,39,40],
  "29/03/2022": [14,21,28,20,27,34,24,25,26,23,22],
  "30/03/2022": [9,15,16,23,17,24,29,11,8,32,40,22,10],
  "31/03/2022": [17,24,23,25,31,37,43,39,47,26,22],
  "01/04/2022": [15,23,31,39,33,27,19,11,17,29,7,14,28,35,21],
  "02/04/2022": [17,9,8,14,21,29,37,45,39,33,27,20,12,11],
  "03/04/2022": [2,10,18,26,33,16,23,30,35,36,37,38,39,41,40],
  "04/04/2022": [3,9,15,21,29,37,45,39,33,27,19,11]
}

// import {games} from "/dordle/games.js";

const today = date.toLocaleDateString('en-GB').toString();
console.log(games[today]);

const game = games[today];

let selection = [];
let totalSelected = 0;
let allCorrect = [];
let allWrong = [];
let allAdjacent = [];
let shareable = [];
let shareableText = "PixMix " + today +"\n";

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

shareable.push(guess.length)

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
        let createButton = submit.cloneNode(true);
        let shareButton = submit.cloneNode(true);
        createButton.innerHTML = "Create your own!";
        shareButton.innerHTML = "Share your result!";
        submit.remove();
        buttonWrapper.appendChild(createButton);
        buttonWrapper.appendChild(shareButton);
        createButton.addEventListener('click', function() {
          window.open("https://www.pixmixs.com/create", '_blank');
          // printResults()
        })
        shareButton.addEventListener('click', function() {
        navigator.clipboard.writeText(printResults());
          alert("Copied to clipboard! Share! Share! Share!")
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
  console.log(shareable)
for(let i = 0; i < shareable.length; i++){
  for(let b = 0; b < shareable[i]; b++){
    //add black emoji
    shareableText += "◼️";
  }
  for(let w = 0; w < (game.length - shareable[i]); w++){
    //add white emoji
    shareableText += "◻️";
  }
    shareableText += "\n"
  //skip line
}
return shareableText;
}
