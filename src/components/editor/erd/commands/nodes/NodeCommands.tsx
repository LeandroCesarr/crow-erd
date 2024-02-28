import { CommandGroup } from 'cmdk';
import React, { FC } from 'react';
import { InsertTableCommand } from './InsertTable';

interface INodeCommandsProps {
  onExecute?: () => void;
}

export const NodeCommands: FC<INodeCommandsProps> = ({
  onExecute,
}): JSX.Element => {
  return (
    <CommandGroup heading="Insert">
      <InsertTableCommand onExecute={onExecute} />
    </CommandGroup>
  );
};
