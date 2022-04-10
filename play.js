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

const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
document.querySelector('meta[name="description"]').setAttribute("content", "Try this PixMix by " + name);


const adj = Number(urlParams.get('grid'));
pixels = Math.pow(adj, 2);
const root = document.querySelector(':root')
root.style.setProperty("--pixels", adj);
const gameEncoded = urlParams.get('game');
const gameVar = decodeURIComponent(gameEncoded);
const game = gameVar.split(',').map(Number);
// const game = gameStringy.map(g => Number(g));
console.log(gameVar)
console.log(game)


let selection = [];
let totalSelected = 0;
let allCorrect = [];
let allWrong = [];
let allAdjacent = [];

let heading = document.querySelector('h1');
heading.innerHTML = name + "'s PixMix"
let message = document.getElementById("draw-mode-message");
let drawModeMessage = document.getElementById("message");
let guesses = document.getElementById("guesses");

//add draw mode
let drawMode = false;
let mouseDown = false;

const drawButton = document.getElementById("draw-mode");
drawButton.addEventListener('click', ()=>{
  drawButton.classList.toggle("draw-mode-clicked")
  if(drawMode){
    drawMode = false;
    drawModeMessage.classList.add('hidden');
    document.body.classList.remove("draw-cursor")
  }
  else{
    drawMode = true;
    drawModeMessage.innerHTML = "Draw mode enabled! Click down and drag to select pixels."
    drawModeMessage.classList.remove('hidden');
    document.body.classList.add("draw-cursor")
  }
})

document.addEventListener('mousedown', ()=>{
  mouseDown = true;
  // console.log(mouseDown)
})

document.addEventListener('mouseup', ()=>{
  mouseDown = false;
  // console.log(mouseDown)
})

document.addEventListener('touchstart', ()=>{
  mouseDown = true;
  // console.log(mouseDown)
})

document.addEventListener('touchend', ()=>{
  mouseDown = false;
  // console.log(mouseDown)
})


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

  //drawMode

    pixel.addEventListener('mouseover', function(event) {
      // console.log('mouseover')
      if (drawMode && mouseDown){
          // console.log('paint')
          pixel.classList.add("draw-cursor")
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
    }
    else{
      pixel.classList.remove("draw-cursor")
    }
    })

    pixel.addEventListener('touchmove', function(event) {
      // console.log('mouseover')
      if (drawMode && mouseDown){
          // console.log('paint')
          pixel.classList.add("draw-cursor")
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
    }
    else{
      pixel.classList.remove("draw-cursor")
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
      console.log(pixel);
      console.log(selection[i]);
      console.log(game[j]);
      if (!pixel.classList.contains("correct") && !pixel.classList.contains("adjacent") ){
       pixel.classList.add("wrong");
       console.log("wrong added")
     }
     console.log(game[j] + adj)
       if ((!pixel.classList.contains("correct") &&
          (Number(selection[i]))%adj !== 0) &&
          ((Number(selection[i]) + 1)%adj !== 0) &&
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
        share.innerHTML = "Create your own!";
        submit.remove();
        buttonWrapper.appendChild(share);
        share.addEventListener('click', function() {
              window.open("https://www.pixmixs.com/create", '_blank');
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
