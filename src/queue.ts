import type { queueAsPromised } from 'fastq';
import * as fastq from 'fastq';
import logger from 'logger.js';
import { setTimeout } from 'node:timers/promises';

interface UserCreatedTask {
  id: string;
}

async function userInsertHandler(arg: UserCreatedTask) {
  logger.info(arg, 'User created task received');
  const fakeImplementation = Math.random() > 0.5 ? 'success' : 'error'
  const timeout = fakeImplementation === 'success' ? 2000 : 1000;
  await setTimeout(timeout);
  if (fakeImplementation === 'error') {
    throw new Error(`User created task got error with id: ${arg.id}`);
  }
}

const queue: queueAsPromised<UserCreatedTask> = fastq.promise(userInsertHandler, 1);

export default queue;