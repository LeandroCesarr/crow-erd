'use client';

import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { CodeIcon } from '@radix-ui/react-icons';
import { Command, CommandInput } from '@/components/ui/command';
import { commandLineDialogAtom } from '@/store/editor';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const CommandLineDialog: FC = (): JSX.Element => {
  const [open, setOpen] = useRecoilState(commandLineDialogAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div>
          <Command>
            <CommandInput
              placeholder="Type a command. or search..."
              icon={CodeIcon}
            />
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
