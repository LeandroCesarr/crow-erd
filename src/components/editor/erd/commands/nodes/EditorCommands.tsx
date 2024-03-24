import React, { FC } from 'react';
import { CommandGroup } from '@/components/ui/command';
import { ExportFileCommand } from './ExportFileCommand';
import { ToggleElementsIdVisibilityCommand } from './ToggleShowElementsId';

interface IEditorCommandsProps {
  onExecute?: () => void;
}

export const EditorCommands: FC<IEditorCommandsProps> = ({
  onExecute,
}): JSX.Element => {
  return (
    <CommandGroup heading="Editor commands">
      <ExportFileCommand onExecute={onExecute} />
      <ToggleElementsIdVisibilityCommand onExecute={onExecute} />
    </CommandGroup>
  );
};
