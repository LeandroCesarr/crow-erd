'use client';

import React, { FC, KeyboardEvent, useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  changeCommandDialogPageCallback,
  commandsDialogAtom,
  currentDialogPageAtom,
} from '@/store/editor';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { NodeCommands } from '../commands/nodes/NodeCommands';
import { ConfigurationCommands } from '@/components/common/commands/ConfigurationCommands';
import { EditorCommands } from '../commands/nodes/EditorCommands';
import { CommandsPageWrapper } from '@/components/common/commands/CommandsPageWrapper';
import { COMMAND_DIALOG_ROOT_PAGE } from '@/data/editor';
import { NavigationCommands } from '@/components/common/commands/NavigationCommands';

export const CommandsDialog: FC = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const currentPage = useRecoilValue(currentDialogPageAtom);
  const [open, setOpen] = useRecoilState(commandsDialogAtom);

  const changeCommandDialogPage = useRecoilCallback(
    changeCommandDialogPageCallback
  );

  function handleCommandKeyDown(e: KeyboardEvent) {
    if (currentPage === COMMAND_DIALOG_ROOT_PAGE) return;

    if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
      e.preventDefault();
      changeCommandDialogPage(COMMAND_DIALOG_ROOT_PAGE);
    }
  }

  function handleExecuteCommand() {
    setOpen(false);
  }

  useEffect(() => {
    if (currentPage !== COMMAND_DIALOG_ROOT_PAGE){
      setSearch("")
    }
  }, [currentPage])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div>
          <Command onKeyDown={handleCommandKeyDown}>
            <CommandInput
              placeholder="Type a command. or search..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandsPageWrapper page={COMMAND_DIALOG_ROOT_PAGE}>
                <NodeCommands onExecute={handleExecuteCommand} />
                <CommandSeparator />
              </CommandsPageWrapper>

              <CommandsPageWrapper page={COMMAND_DIALOG_ROOT_PAGE}>
                <EditorCommands onExecute={handleExecuteCommand} />
                <CommandSeparator />
              </CommandsPageWrapper>

              <ConfigurationCommands onExecute={handleExecuteCommand} />
              <NavigationCommands onExecute={handleExecuteCommand} />
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
};
