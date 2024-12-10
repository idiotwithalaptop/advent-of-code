import { extractCommands } from './extractor';
describe('extractor', () => {
  it('extracts single command', () => {
    const commandStr = 'cmd(1,2,"wacca")';
    expect(extractCommands(commandStr, 'cmd')).toStrictEqual([
      {
        key: 'cmd',
        args: ['1', '2', 'wacca'],
      },
    ]);
  });

  it('extracts single command inside a partial one', () => {
    const commandStr = 'cmd(asdasd asdsdf cmd(1,2,"wacca")';
    expect(extractCommands(commandStr, 'cmd')).toStrictEqual([
      {
        key: 'cmd',
        args: ['1', '2', 'wacca'],
      },
    ]);
  });

  it('extracts many commands', () => {
    const commandStr =
      'cmd(1,2,"wacca") foo(3,4,"bar") wacca(5,6,"ghosty","boo")';
    expect(extractCommands(commandStr, 'cmd', 'foo', 'wacca')).toStrictEqual([
      {
        key: 'cmd',
        args: ['1', '2', 'wacca'],
      },
      {
        key: 'foo',
        args: ['3', '4', 'bar'],
      },
      {
        key: 'wacca',
        args: ['5', '6', 'ghosty', 'boo'],
      },
    ]);
  });

  it('extracts many commands and ignores non commands', () => {
    const commandStr =
      'cmd(1,2,"wacca")IwishIhadsomefishfoo(3,4,"bar")asdfasdfsadfsdfsadfasdfwacca(5,6,"ghosty","boo")dsfsdf';
    expect(extractCommands(commandStr, 'cmd', 'foo', 'wacca')).toStrictEqual([
      {
        key: 'cmd',
        args: ['1', '2', 'wacca'],
      },
      {
        key: 'foo',
        args: ['3', '4', 'bar'],
      },
      {
        key: 'wacca',
        args: ['5', '6', 'ghosty', 'boo'],
      },
    ]);
  });
});
