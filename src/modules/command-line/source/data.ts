export type TCommandPathArgument = [string, string];

export type TCommandValueArgument = unknown;

export enum ArgumentsEnum {
  Path = 'path',
  Value = 'value',
}

export type TCommandArgument = TCommandPathArgument | TCommandValueArgument;

export enum CommandsEnum {
  CONNECT_COLUMNS = 'cn',
  TOGGLE_ELEMENTS_ID_VISIBILITY = 'tiv',
}

export const COMMANDS = new Map([
  [
    CommandsEnum.CONNECT_COLUMNS,
    {
      label: 'Connect columns',
      arguments: [ArgumentsEnum.Path, ArgumentsEnum.Path],
    },
  ],
  [
    CommandsEnum.TOGGLE_ELEMENTS_ID_VISIBILITY,
    {
      label: 'Toggle id visibility',
      arguments: [],
    },
  ],
]);

export type TParsedCommand = {
  type: CommandsEnum;
  arguments: TCommandArgument;
};

export const COMMANDS_LIST = Object.values(CommandsEnum);
