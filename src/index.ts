import 'worker.js';

import { randomUUID } from 'crypto';

async function run() {
  const usersToHandle = new Array(5).fill(undefined).map(() => randomUUID())
  for (const id of usersToHandle) {
    const task = {
      id
    };
    // TODO: Send the task to the queue
  }
}

run();