import React, { FC } from 'react';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { HomeIcon } from '@radix-ui/react-icons';
import { PagesEnum } from '@/enums/PagesEnum';
import { useRouter } from 'next/navigation';

interface INavigationCommandsProps {
  onExecute?: () => void;
}

export const NavigationCommands: FC<INavigationCommandsProps> = ({
  onExecute,
}): JSX.Element => {
  const { push } = useRouter()

  function handleNavigate(page: PagesEnum) {
    push(page)
    handleExecuteCommand();
  }

  function handleExecuteCommand() {
    onExecute?.();
  }

  return (
    <>
      <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleNavigate(PagesEnum.HOME)}>
            <HomeIcon className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
        </CommandGroup>
    </>
  );
};
