const pixels = 49
const adj = Math.sqrt(pixels)

// const games = {
//   "22/03/2022": [9, 16, 11, 18, 28, 36, 37, 38, 39, 40, 34],
//   "23/03/2022": [8, 16, 23, 30, 31, 32, 2, 5, 18, 17, 12, 36, 40],
//   "24/03/2022": [0, 8, 42, 36, 6, 12, 48, 40, 30, 32, 18, 16],
// }


const date = new Date()
const today = date.toLocaleDateString('en-GB').toString();


let selection = [];
let totalSelected = 0;

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
submit.addEventListener('click', function(event) {

}

function printResults(){
//
}
