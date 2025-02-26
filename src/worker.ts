

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

// TODO: Implement the worker