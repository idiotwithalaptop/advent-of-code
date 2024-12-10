import { multiply } from './multiplier';
import { Command } from './types';

const commandRegistry = {
  mul: multiply,
};

export type CommandExecution = Command & {
  result?: any;
  failed?: boolean;
};

export function supportedCommands(): string[] {
  return Object.keys(commandRegistry);
}

export function executeCommand(command: Command): CommandExecution {
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
