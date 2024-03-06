import React, { FC } from 'react';
import { InsertTableCommand } from './InsertTable';
import { ToggleElementsIdVisibilityCommand } from './ToggleShowElementsId';
import { CommandGroup } from '@/components/ui/command';

interface INodeCommandsProps {
  onExecute?: () => void;
}

export const NodeCommands: FC<INodeCommandsProps> = ({
  onExecute,
}): JSX.Element => {
  return (
    <CommandGroup heading="Node commands">
      <InsertTableCommand onExecute={onExecute} />
      <ToggleElementsIdVisibilityCommand onExecute={onExecute} />
    </CommandGroup>
  );
};
