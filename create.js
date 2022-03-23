let adj = 0;
let pixels = 0;
let game = [];
let selection = [];
let totalSelected = 0;

const submit = document.getElementById("submit")
let inputWrapper = document.getElementById("input-wrapper");
let message = document.getElementById("message");
let gridSize = document.getElementById("grid-size")
let createGame = document.getElementById("create-grid");
let nameInput = document.getElementById("name");

createGame.addEventListener('click', function(){
adj = gridSize.value;
pixels = Math.pow(adj, 2);
console.log("pixels", pixels)
if(adj > 100 || adj == 0){
message.classList.remove("hidden");
message.innerHTML = "Grid size must be between 1-100"
}
else{
message.innerHTML = "Select pixels for your friends to find!"
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
      message.innerHTML = "Select pixels for your friends to find";
    } else {
      if ((pixels - totalSelected) > 0) {
        pixel.classList.add("selected")
        // console.log(pixel.getAttribute('id'))
        totalSelected++
        selection.push(pixel.getAttribute('id'))
      } else {
        message.innerHTML = "You have selected the max amount of pixels!"
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


submit.addEventListener('click', function(event) {
let name = nameInput.value;
let game = encodeURIComponent(selection.map(Number));   //(JSON.stringify(selection));
console.log(game)

let gameURL = "https://www.pixmixs.com/play?name=" + name + "&grid=" + adj + "&game=" + game
window.open(gameURL, '_blank');
// let decode = decodeURIComponent(game);
// console.log(decode);
})

function printResults(){
//
}
