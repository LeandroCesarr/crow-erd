import { addEdge } from "reactflow";
import { CallbackInterface } from "recoil"
import { ArgumentsEnum, CommandsEnum, TParsedCommand } from "./source/data";
import { edgesAtom, nodeColumnSelector, nodeSelector } from "@/store/editor";
import { ColumnRelationsEnum } from "@/enums/ColumnRelationsEnum";

export async function handleConnectCommand(recoil: CallbackInterface, command: TParsedCommand): Promise<void> {
  const args = command.arguments as [ArgumentsEnum.Path, ArgumentsEnum.Path]

  const [source, target] = await Promise.all(args.map(async (arg) => ({
    node: await recoil.snapshot.getPromise(nodeSelector(arg[0])),
    column: await recoil.snapshot.getPromise(nodeColumnSelector({
      nodeId: arg[0],
      columnId: arg[1],
    })),
  })))

  const edgeToCreate = {
    animates: true,
    type: "table-edge",
    source: source.node.id,
    sourceHandle: `${source.node.id}-${source.column.id}-source`,
    target: target.node.id,
    targetHandle: `${target.node.id}-${target.column.id}-target`,
    data: {
      sourceRelation: ColumnRelationsEnum.ONE,
      targetRelation: ColumnRelationsEnum.ONE,
    }
  }

  recoil.set(edgesAtom, (eds) => addEdge(edgeToCreate, eds))
}

export async function handleCommandCallback(recoil: CallbackInterface, command: TParsedCommand) : Promise<void> {
  if (command.type === CommandsEnum.CONNECT_COLUMNS) {
    handleConnectCommand(recoil, command);
  }
}

export async function handleCommandsCallback(recoil: CallbackInterface, commands: TParsedCommand[]) : Promise<void> {
  commands.forEach(cmd => handleCommandCallback(recoil, cmd));
}