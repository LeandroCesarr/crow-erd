export type TCommandPathArgument = [string, string];

export type TCommandValueArgument = unknown;

export enum ArgumentsEnum {
  Path = 'path',
  Value = 'value',
}

export type TCommandArgument = TCommandPathArgument | TCommandValueArgument;

export enum CommandsEnum {
  CONNECT_COLUMNS = 'cn',
}

export const COMMANDS = new Map([
  [
    CommandsEnum.CONNECT_COLUMNS,
    {
      label: 'Connect columns',
      arguments: [ArgumentsEnum.Path, ArgumentsEnum.Path],
    },
  ],
]);

export type TParsedCommand = {
  type: CommandsEnum;
  arguments: TCommandArgument;
};

export const COMMANDS_LIST = Object.values(CommandsEnum);
