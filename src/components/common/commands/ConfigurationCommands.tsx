import { CommandGroup, CommandItem } from '@/components/ui/command';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import React, { FC } from 'react';

interface IConfigurationCommandsProps {
  onExecute?: () => void;
}

export const ConfigurationCommands: FC<
  IConfigurationCommandsProps
> = ({ onExecute }): JSX.Element => {

  const { setTheme } = useTheme();

  function handleExecuteCommand() {
    onExecute?.();
  }

  function handleChangeTheme(theme: string) {
    setTheme(theme);
    handleExecuteCommand();
  }

  return (
    <CommandGroup heading="Configuration">
      <CommandItem onSelect={() => handleChangeTheme("dark")}>
        <MoonIcon className="mr-2 h-4 w-4" />
        <span>Toggle theme: dark</span>
      </CommandItem>
      <CommandItem onSelect={() => handleChangeTheme("light")}>
        <SunIcon className="mr-2 h-4 w-4" />
        <span>Toggle theme: light</span>
      </CommandItem>
    </CommandGroup>
  );
};
