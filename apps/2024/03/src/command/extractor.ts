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

  const matches = input.matchAll(cmdRegex);
  for (const match of matches) {
    commands.push({
      key: match.groups.key,
      args: match.groups.args
        .split(',')
        .filter((a) => a.length > 0)
        .map((arg) => arg.replace(/^"(.*)"$/, '$1')),
    });
  }

  return commands;
}
