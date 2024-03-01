import { ArgumentsEnum, COMMANDS, CommandsEnum, TCommandArgument, TCommandPathArgument, TParsedCommand } from "./data";

const COMMAND_DELIMITER = ";";
const COMMAND_ARGUMENTS_DELIMITER = ":";
const COMMAND_ARGUMENTS_SEPARATOR = ",";

function parseRawPathArgument(arg: string) : TCommandPathArgument {
  if (!/^[A-Z][0-9][A-Z][0-9]$/g.test(arg)) {
    throw new Error(`Invalid argument: ${arg}`);
  }

  return [
    arg[0] + arg[1],
    arg[2] + arg[3],
  ];
}

function parseRawArgument(type: ArgumentsEnum, rawArgument: string): TCommandArgument {
  if (type == ArgumentsEnum.Path) {
    return parseRawPathArgument(rawArgument);
  }
}

function parseRawCommand(rawCommand: string) :TParsedCommand {
  const [command, rawArguments] = rawCommand.split(COMMAND_ARGUMENTS_DELIMITER);
  const commandDetails = COMMANDS.get(command as CommandsEnum);

  if (!commandDetails) throw new Error("Command not found");

  if (!commandDetails.arguments.length) return {
    type: command as CommandsEnum,
    arguments: []
  }

  if (!rawArguments) throw new Error("Missing arguments");

  const args = rawArguments.replace(/[\(\)]/g, "").split(COMMAND_ARGUMENTS_SEPARATOR);

  return {
    type: command as CommandsEnum,
    arguments: args.map((arg, idx) => parseRawArgument(commandDetails.arguments[idx], arg))
  }
}

export function parseCommand(command: string) : TParsedCommand[] {
  const rawCommands = command.split(COMMAND_DELIMITER);

  return rawCommands.map(parseRawCommand);
}