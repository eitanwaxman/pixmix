let imageInput = document.getElementById("image-input");
let displayImage = document.getElementById("display-image");
let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');

let CANVAS_SIZE_X = 7;
let CANVAS_SIZE_Y = 7;
let game = [];


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
  displayImage.src = upload;
  img.src = upload;
  context.drawImage(img, 0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
  let imgData = context.getImageData(0,0, CANVAS_SIZE_X, CANVAS_SIZE_Y)
  console.log(imgData)
  for(let i = 0; i < imgData.data.length; i+=4){
  let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
  console.log(count)
  if (count < 400){
    let index = i/4
  game.push(index)
  console.log(index)
  }
  }
  console.log(game)
}
