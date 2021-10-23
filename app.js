const uploadInput = document.getElementById("profile-picture-input");
const filter = document.querySelector("#filter");
const output = document.querySelector("#output");

const fileReader = new FileReader();
const image = new Image();
const worker = new Worker("backgroundImageProcessor.js");

let imageData, canvasContext;

filter.oninput = sendToWorker;

fileReader.addEventListener("load", (e) => {
  const imageData = e.target.result;
  image.src = imageData;
});

uploadInput.addEventListener("change", (e) => {
  const [myImage] = e.target.files;
  fileReader.readAsDataURL(myImage);
});

image.addEventListener("load", () => {
  const canvas = document.createElement("CANVAS");
  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;
  canvasContext = canvas.getContext("2d");

  canvasContext.drawImage(image, 0, 0);

  imageData = canvasContext.getImageData(0, 0, width, height);

  sendToWorker();
  output.replaceChildren(canvas);
});

worker.onmessage = (e) => {
  canvasContext.putImageData(e.data, 0, 0);
  document.body.appendChild(canvas);
};

worker.onmessage = receiveFromWorker;

function sendToWorker() {
  worker.postMessage({ imageData, filter: filter.value });
}

function receiveFromWorker(e) {
  canvasContext.putImageData(e.data, 0, 0);
}
