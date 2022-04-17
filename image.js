const date = new Date();
const year = date.getFullYear();
const copywrite = document.getElementById("copywrite");
copywrite.innerHTML = "© " + year + " PixMix";

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
let imageSelection = [];
let selection = [];
let totalSelected = 0;

const submit = document.getElementById("submit")
let inputWrapper = document.getElementById("input-wrapper");
let message = document.getElementById("message");
let gridSize = document.getElementById("grid-size")
let createGame = document.getElementById("create-grid");
let nameInput = document.getElementById("name");
let levelPic = document.getElementById("level-pic");

let imageInput = document.getElementById("image-input");
let imageInputLabel = document.getElementById("image-input-label");
// let displayImage = document.getElementById("display-image");
let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');

let CANVAS_SIZE_X = null;
let CANVAS_SIZE_Y = null;

createGame.addEventListener('click', function(){
adj = gridSize.value;
CANVAS_SIZE_X = adj;
CANVAS_SIZE_Y = adj;
canvas.width = CANVAS_SIZE_X,
canvas.height = CANVAS_SIZE_Y,
pixels = Math.pow(adj, 2);
console.log("pixels", pixels)
if(adj > 100 || adj == 0){
message.classList.remove("hidden");
message.innerHTML = "Grid size must be between 1-100"
}
else{
message.innerHTML = "Select pixels for your friends to find! Or..."
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
      message.innerHTML = "Select pixels for your friends to find, or...";
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
    setLevel()
  })

}
levelPic.classList.remove("hidden");
submit.classList.remove("hidden");
message.classList.remove("hidden");
inputWrapper.classList.add("hidden");
imageInputLabel.classList.remove("hidden");
}
})

submit.addEventListener('click', function(event) {
  let name = nameInput.value;
  let game = encodeURIComponent(selection.map(Number));   //(JSON.stringify(selection));
  console.log(game)
  let gameURL = "https://www.pixmixs.com/play?name=" + name + "&grid=" + adj + "&game=" + game


  let buttonWrapper = document.getElementById("button-wrapper")
  let playButton = submit.cloneNode(true);
  let shareButton = submit.cloneNode(true);
  playButton.innerHTML = "Play now!";
  shareButton.innerHTML = "Share your creation!";
  submit.remove();
  buttonWrapper.appendChild(playButton);
  buttonWrapper.appendChild(shareButton);
  playButton.addEventListener('click', function() {
      window.open(gameURL, '_blank');
  })
  shareButton.addEventListener('click', function() {
  navigator.clipboard.writeText("Try out this PixMix I created for you: \n" + gameURL);
    alert("Copied to clipboard! Share! Share! Share!")
  })



// let decode = decodeURIComponent(game);
// console.log(decode);
})

function setLevel(){
  console.log(totalSelected, pixels)
  let level = (100 - (totalSelected/pixels)*100)
  if (level > 0 && level <= 65){
  levelPic.innerHTML = "😁"
  }
  if (level > 65 && level <= 75){
  levelPic.innerHTML = "😀"
  }
  if (level > 75 && level <= 80){
  levelPic.innerHTML = "🙂"
  }
  if (level > 80 && level <= 87){
  levelPic.innerHTML = "😐"
  }
  if (level > 87 && level <= 92){
  levelPic.innerHTML = "😮"
  }
  if (level > 92 && level <= 97){
  levelPic.innerHTML = "😵"
  }
  if (level > 97){
  levelPic.innerHTML = "🤯"
  }
}

let reader = new FileReader()
reader.addEventListener('load',(event)=>{
  console.log(event.target.result)
  setImage(event.target.result)
})

imageInput.addEventListener('change',(event)=>{
  // console.log(event.target.files[0])
  reader.readAsDataURL(event.target.files[0]);
  console.log("change")

})

function setImage(upload){
  let img = new Image()
  img.src = upload;
  console.log(img)
  img.onload = function(){
  context.drawImage(img, 0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
  let imgData = context.getImageData(0,0, CANVAS_SIZE_X, CANVAS_SIZE_Y)
  console.log(imgData)

  for(let i = 0; i < imgData.data.length; i+=4){
  let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
  console.log(count)
  if (count < 400){
    let index = i/4
  imageSelection.push(index)
  selection.push(index)
  // console.log(index)
  }
  }

  for(let i = 0; i < pixels; i++){
    let pixelToDraw = document.getElementById(i);
    if(imageSelection.includes(i)){
    pixelToDraw.classList.add("selected")
  }
  }
    totalSelected += imageSelection.length;


  }

}
