'use client';

import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { commandsDialogAtom } from '@/store/editor';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { NodeCommands } from '../commands/nodes/NodeCommands';
import { ConfigurationCommands } from '@/components/common/commands/ConfigurationCommands';

export const CommandsDialog: FC = (): JSX.Element => {
  const [open, setOpen] = useRecoilState(commandsDialogAtom);

  function handleExecuteCommand() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div>
          <Command>
            <CommandInput placeholder="Type a command. or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <NodeCommands onExecute={handleExecuteCommand} />
              <ConfigurationCommands onExecute={handleExecuteCommand} />
              <CommandSeparator />
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
};
