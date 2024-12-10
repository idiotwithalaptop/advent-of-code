import { multiply } from './multiplier';
import { Command } from './types';

let active = true;
const commandRegistry = {
  mul: multiply,
  do: () => {
    active = true;
  },
  "don't": () => {
    active = false;
  },
};

export type CommandExecution = Command & {
  result?: any;
  failed?: boolean;
};

export function supportedCommands(): string[] {
  return Object.keys(commandRegistry);
}

export function executeCommand(command: Command): CommandExecution {
  if (!active && command.key !== 'do') {
    return { ...command, failed: true };
  }
  const commandsToParse = supportedCommands();
  if (!commandsToParse.includes(command.key)) {
    throw new Error(`Unsupported command: ${command.key}`);
  }
  let result;
  try {
    result = commandRegistry[command.key](...command.args);
    return { ...command, failed: false, result };
  } catch (e) {
    return { ...command, failed: true };
  }
}
