import 'worker.js';

import { randomUUID } from 'crypto';
import logger from 'logger.js';
import { enqueueJob } from 'queue.js';

async function run() {
  const usersToHandle = new Array(5).fill(undefined).map(() => randomUUID())
  for (const id of usersToHandle) {
    const task = {
      id
    }
    const idTask = await enqueueJob(task);
    logger.info(task, `Task with id ${idTask} has been pushed`);
  }
}

run();