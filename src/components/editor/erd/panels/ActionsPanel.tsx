import { Button } from '@/components/ui/button';
import { commandLineDialogAtom, commandsDialogAtom } from '@/store';
import React, { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { useHandleWindowCommand } from '@/hooks/useHandleWindowCommand';

interface IActionsPanelProps {}

export const ActionsPanel: FC<IActionsPanelProps> = (): JSX.Element => {
  const setCommandsOpen = useSetRecoilState(commandsDialogAtom);
  const setCommandLineOpen = useSetRecoilState(commandLineDialogAtom);

  function handleCommandsButtonClick() {
    setCommandsOpen(true);
  }

  function handleCommandLineButtonClick() {
    setCommandLineOpen(true);
  }

  useHandleWindowCommand('mod+k', () => {
    setCommandsOpen((open) => !open);
  });

  useHandleWindowCommand('mod+p', () => {
    setCommandLineOpen((open) => !open);
  });

  return (
    <div className='flex space-x-2'>
      <Button
        variant="outline"
        className="flex space-x-2"
        onClick={handleCommandsButtonClick}
      >
        <span>Commands</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Button
        variant="outline"
        className="flex space-x-2"
        onClick={handleCommandLineButtonClick}
      >
        <span>Command-line</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>P
        </kbd>
      </Button>
    </div>
  );
};
