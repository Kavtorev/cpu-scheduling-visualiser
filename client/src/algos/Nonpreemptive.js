import { f, s } from "./helpers/index";
import { findCurrent } from "./common";
export default function Nonpreemptive({ processes, comparator, criteria }) {
  let uncompleted = processes.length;
  let readyQueue = processes.map((e) => ({ ...e })).sort(comparator);
  let clock = 0;
  let frames = [];
  let frame = null;

  while (uncompleted) {
    const curIndex = findCurrent(readyQueue, clock, criteria);

    if (curIndex === null) {
      clock += 1;
      continue;
    }

    let running = readyQueue[curIndex];

    // responseTime
    running.responseTime = clock - running.arrivalTime;
    frame = s(clock, running);

    clock += running.cpuTime;
    running.cpuTimeLeft = 0;

    // turnaroundTime
    running.turnaroundTime = clock - running.arrivalTime;
    // waitingTime
    running.waitingTime = running.turnaroundTime - running.cpuTime;
    // exitTime
    running.exitTime = clock;

    frames.push(f(frame, clock, "Finished", running));

    readyQueue = readyQueue.filter((e, i) => {
      return i !== curIndex;
    });

    uncompleted -= 1;
  }

  return { frames };
}
