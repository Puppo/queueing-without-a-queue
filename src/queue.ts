import pgBossInstance from "pgBoss.js";
import { QUEUE_NAME, UserCreatedTask } from "./common.js";

await pgBossInstance.createQueue(QUEUE_NAME, {
  name: QUEUE_NAME,
  retryLimit: 2
});

export function enqueueJob(job: UserCreatedTask) {
  return pgBossInstance.send(QUEUE_NAME, job);
}