const computationControllerBtn = document.getElementById(
  "computation-controller"
);
const randomNumberBtn = document.getElementById("random-number-controller");
const output = document.getElementById("output");
const clearBtn = document.getElementById("clear-btn");
const statusBar = document.getElementById("status");

const myWorker = new Worker("worker.js");

function processHeavyData() {
  statusBar.textContent = "status : processing data...";

  const arbitraryData = 1000000;

  myWorker.postMessage([arbitraryData]);

  console.log("message posted to worker");
}

function clearOutput() {
  output.textContent = "";
  statusBar.textContent = "status: idle";
}

function renderRandomNumber() {
  output.textContent = Math.random();
}

computationControllerBtn.addEventListener("click", processHeavyData);

myWorker.onmessage = function (e) {
  statusBar.textContent = "status: done";
};

randomNumberBtn.addEventListener("click", renderRandomNumber);
clearBtn.addEventListener("click", clearOutput);
