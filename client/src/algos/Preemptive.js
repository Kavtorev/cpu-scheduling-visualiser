import { s, f } from "./helpers/index";
import { findCurrent } from "./common";
export default function Preemptive({ processes, comparator, criteria }) {
  let uncompleted = processes.length;
  let readyQueue = processes.map((e) => ({ ...e })).sort(comparator);
  let previous = null;
  let clock = 0;
  let frames = [];
  let frame = null;

  while (uncompleted) {
    let curIndex = findCurrent(readyQueue, clock, criteria);

    if (curIndex === null) {
      clock += 1;
      continue;
    }

    let running = readyQueue[curIndex];

    if (previous !== null && readyQueue[previous].id !== running.id) {
      frames.push(f(frame, clock, `Preempted`, readyQueue[previous]));
      frame = s(clock, running);
    }

    if (frame === null) {
      frame = s(clock, running);
    }

    if (running.cpuTime === running.cpuTimeLeft) {
      running.responseTime = clock - running.arrivalTime;
      frame = s(clock, running);
    }

    running.cpuTimeLeft -= 1;
    clock += 1;

    if (!running.cpuTimeLeft) {
      running.turnaroundTime = clock - running.arrivalTime;
      running.waitingTime = running.turnaroundTime - running.cpuTime;
      running.exitTime = clock;

      frames.push(f(frame, clock, "Finished", running));

      frame = null;

      readyQueue = readyQueue.filter((e, i) => {
        return i !== curIndex;
      });

      uncompleted -= 1;
      previous = null;
      continue;
    }

    previous = curIndex;
  }

  return { frames };
}
