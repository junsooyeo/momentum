const body = document.querySelector("body");

function paintImage(imgNum) {
  const image = new Image();
  image.src = `images/${imgNum}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRanNumber() {
  return Math.floor(Math.random() * 6 + 1);
}

function init() {
  const imgNum = genRanNumber();
  paintImage(imgNum);
}

init();
