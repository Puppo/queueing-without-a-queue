import logger from 'logger.js';
import { randomUUID } from 'node:crypto';
import userInsertQueue from './queue.js';

type Status = 'not-handle' | 'error' | 'success'

async function run() {
  const usersToHandle = new Array(5).fill(undefined).map(() => randomUUID())
  const userProcessStatus: Record<string, { status: Status, retryValue: number }> = {}
  for (const id of usersToHandle) {
    userProcessStatus[id] = {
      status: 'not-handle',
      retryValue: 0
    };
    const task = {
      id
    }
    const pushMessage = () => userInsertQueue.push(task)
      .then(() => {
        logger.info(`Task with id ${task.id} has been proceed`);
        userProcessStatus[id].status = 'success';
      })
      .catch(err => {
        const state = userProcessStatus[id]
        logger.error(err, `Task with id ${task.id} got error after retry ${state.retryValue}`);
        state.status = 'error';
        if (state.retryValue < 3) {
          state.retryValue++
          pushMessage()
        }
      })
    pushMessage()
    logger.info(task, `Task with id ${task.id} has been pushed`);
  }

  process.on('exit', () => {
    for (const [id, { status, retryValue }] of Object.entries(userProcessStatus)) {
      logger.info(`Id ${id} is ${status} after ${retryValue} retries`);
    }
  })
}

run()
