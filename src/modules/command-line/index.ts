import { addEdge } from "reactflow";
import { CallbackInterface } from "recoil"
import { EdgeTypeEnum } from "@/enums/EdgeTypeEnum";
import { createEdge, edgesAtom, nodeColumnSelector, nodeSelector, toggleElementIdVisibility } from "@/store/editor";
import { ArgumentsEnum, CommandsEnum, TParsedCommand } from "./source/data";

export async function handleConnectCommand(recoil: CallbackInterface, command: TParsedCommand): Promise<void> {
  const args = command.arguments as [ArgumentsEnum.Path, ArgumentsEnum.Path]

  const [source, target] = await Promise.all(args.map(async (arg) => ({
    node: await recoil.snapshot.getPromise(nodeSelector(arg[0])),
    column: await recoil.snapshot.getPromise(nodeColumnSelector({
      nodeId: arg[0],
      columnId: arg[1],
    })),
  })))

  const edgeToCreate = createEdge({
    type: EdgeTypeEnum.TABLE,
    sourceNodeId: source.node.id,
    sourceColumnId: source.column.id,
    targetNodeId: target.node.id,
    targetColumnId: target.column.id
  });

  recoil.set(edgesAtom, (eds) => addEdge(edgeToCreate, eds))
}

export async function handleToggleElementsIdVisibility(recoil: CallbackInterface, command: TParsedCommand): Promise<void> {
  toggleElementIdVisibility(recoil.set)
}

export async function handleCommandCallback(recoil: CallbackInterface, command: TParsedCommand) : Promise<void> {
  if (command.type === CommandsEnum.CONNECT_COLUMNS) {
    handleConnectCommand(recoil, command);
  }

  if (command.type === CommandsEnum.TOGGLE_ELEMENTS_ID_VISIBILITY) {
    handleToggleElementsIdVisibility(recoil, command);
  }
}

export async function handleCommandsCallback(recoil: CallbackInterface, commands: TParsedCommand[]) : Promise<void> {
  commands.forEach(cmd => handleCommandCallback(recoil, cmd));
}