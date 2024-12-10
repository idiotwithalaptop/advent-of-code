import { Command } from './types';
export function extractCommands(
  input: string,
  ...validCommands: string[]
): Command[] {
  const commands: Command[] = [];
  const cmdRegex = new RegExp(
    `(?<key>(${validCommands.join(
      '|'
    )}))\\((?<args>((-?[0-9]+.?[0-9]*|".*?"),?)*)\\)`,
    'g'
  );
  // regex to match a numeric value or a string surrounded by quotes
  // (?<key>(cmd))\\((?<args>(-?[0-9]+.?[0-9]*|\".*?\"))\\)
  const matches = input.matchAll(cmdRegex);
  for (const match of matches) {
    commands.push({
      key: match.groups.key,
      args: match.groups.args
        .split(',')
        .map((arg) => arg.replace(/^"(.+)"$/, '$1')),
    });
  }

  return commands;
}
