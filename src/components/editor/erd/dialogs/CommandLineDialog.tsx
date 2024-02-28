'use client';

import React, { FC, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  CodeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  TableIcon,
} from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { commandLineDialogAtom } from '@/store/editor';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useNode } from '@/hooks/useNode';
import { TABLE_NODE_TYPE } from '../nodes/TableNode';

export const CommandLineDialog: FC = (): JSX.Element => {
  const [open, setOpen] = useRecoilState(commandLineDialogAtom);

  const { createNode } = useNode();

  function handleCreateTable() {
    createNode(TABLE_NODE_TYPE, true);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div>
          <Command>
            <CommandInput placeholder="Type a command. or search..." icon={CodeIcon}  />
            {/* <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Insert">
                <CommandItem onSelect={handleCreateTable}>
                  <TableIcon className="mr-2 h-4 w-4" />
                  <span>Insert table</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Configuration">
                <CommandItem>
                  <MoonIcon className="mr-2 h-4 w-4" />
                  <span>Toggle dark mode</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
            </CommandList> */}
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
};
