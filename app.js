const bgControllerBtn = document.getElementById("bg-color-controller");
const computationControllerBtn = document.getElementById(
  "computation-controller"
);
const randomNumberBtn = document.getElementById("random-number-controller");
const output = document.getElementById("output");
const clearBtn = document.getElementById("clear-btn");
const statusBar = document.getElementById("status");

function dummyComputation(x) {
  if (x <= 0) return 0;
  if (x == 1) return 1;
  return dummyComputation(x - 1) + dummyComputation(x - 2);
}

function processHeavyData() {
  statusBar.textContent = "status: processing...";

  let keepGoing = 1;

  setTimeout(() => {
    console.log("processing data" + keepGoing);
    while (keepGoing) {
      dummyComputation(15);
      keepGoing++;
      if (keepGoing > 1000000) {
        keepGoing = false;
      }
    }
    statusBar.textContent = "status: done";
  }, 0);
}

function renderRandomNumber() {
  output.textContent = Math.random();
}

function clearOutput() {
  output.textContent = "";
  statusBar.textContent = "Status: idle";
}

computationControllerBtn.addEventListener("click", processHeavyData);
randomNumberBtn.addEventListener("click", renderRandomNumber);
clearBtn.addEventListener("click", clearOutput);
