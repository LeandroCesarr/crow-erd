'use client';

import React, { FC, KeyboardEvent, useState } from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { commandLineDialogAtom } from '@/store/editor';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import isHotkey from 'is-hotkey';
import { parseCommand } from '@/modules/command-line/source/parser';
import { handleCommandsCallback } from '@/modules/command-line';
import { TParsedCommand } from '@/modules/command-line/source/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const CommandLineDialog: FC = (): JSX.Element => {
  const [open, setOpen] = useRecoilState(commandLineDialogAtom);

  const [command, setCommand] = useState('');
  const [error, setError] = useState('');

  const handleCommands = useRecoilCallback(
    (recoil) => (parsedCommands: TParsedCommand[]) => {
      handleCommandsCallback(recoil, parsedCommands);
    }
  );

  function handleKeyDown(evt: KeyboardEvent) {
    if (!isHotkey('enter', evt)) return;

    handleExecuteCommand(command);
  }

  function handleExecuteCommand(value: string) {
    try {
      const commandsToHandle = parseCommand(value);
      handleCommands(commandsToHandle);

      setCommand('');
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div>
          <input
            className="block w-full text-lg font-medium border-none outline-none bg-transparent"
            value={command}
            onChange={(e) => setCommand(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />

          {error ? (
            <Alert variant="destructive" className="mt-3">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
