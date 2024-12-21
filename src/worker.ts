import { setTimeout } from "timers/promises";

import { QUEUE_NAME, UserCreatedTask } from "./common.js";
import pgBossInstance from "./pgBoss.js";

const messagesHandled: Record<string, {
  result: 'success' | 'error' | 'created';
  retries: number;
}> = {};

function printMessagesHandled() {
  const messagesHandledEntries = Object.entries(messagesHandled);
  const title = `Unique messages handled: ${messagesHandledEntries.length}`;
  const message = messagesHandledEntries.map(([id, { result, retries }]) => `${id}: ${result} (${retries} retries)`).join('\n')
  console.log(`\n${title}\n${message}\n`);
}

pgBossInstance.work<UserCreatedTask>(QUEUE_NAME, async jobs => {
  for (const job of jobs) {
    if (!messagesHandled[job.id]) {
      messagesHandled[job.id] = { retries: 0, result: 'created' }; 
    } else {
      messagesHandled[job.id].retries++;
    }
    const resultType = Math.random() > 0.6;
    const fakeImplementation = resultType ? 'success' : 'error'
    const timeout = fakeImplementation === 'success' ? 2000 : 1000;
    await setTimeout(timeout);
    if (fakeImplementation === 'error') {
      messagesHandled[job.id].result = 'error';
      printMessagesHandled();
      const message = `User created task got error with id: ${job.id}`
      throw new Error(message);
    } else {
      messagesHandled[job.id].result = 'success';
      printMessagesHandled();
    }
  }
});