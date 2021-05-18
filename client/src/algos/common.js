export let findCurrent = (readyQueue, clock, criteria) => {
  let tPrIndex = readyQueue.findIndex((e) => {
    return e.arrivalTime <= clock;
  });

  if (tPrIndex < 0) {
    return null;
  }

  for (let pId = 0; pId < readyQueue.length; pId++) {
    if (readyQueue[pId].arrivalTime <= clock) {
      if (readyQueue[pId][criteria] < readyQueue[tPrIndex][criteria]) {
        tPrIndex = pId;
      }
    } else {
      break;
    }
  }

  return tPrIndex;
};
