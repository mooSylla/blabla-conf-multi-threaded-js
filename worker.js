function dummyComputation(x) {
  if (x <= 0) return 0;
  if (x == 1) return 1;
  return dummyComputation(x - 1) + dummyComputation(x - 2);
}

function processHeavyData(iterations) {
  let keepGoing = 1;

  console.log("processing data on worker thread");
  while (keepGoing) {
    dummyComputation(15);
    keepGoing++;
    if (keepGoing > iterations) {
      keepGoing = false;
    }
  }
}

onmessage = function (e) {
  console.log("Message received from main script");
  processHeavyData(e.data[0]);
  console.log("Posting message back to main script");
  postMessage("success");
};
