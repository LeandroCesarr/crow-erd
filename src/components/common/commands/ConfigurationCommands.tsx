import React, { FC } from 'react';
import { useTheme } from 'next-themes';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

const THEMES = [
  {
    value: 'dark',
    label: 'Dark',
    icon: <SunIcon />,
  },
  {
    value: 'light',
    label: 'Light',
    icon: <MoonIcon />,
  },
];

interface IConfigurationCommandsProps {
  onExecute?: () => void;
}

export const ConfigurationCommands: FC<IConfigurationCommandsProps> = ({
  onExecute,
}): JSX.Element => {
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
      {THEMES.map((theme) => (
        <CommandItem
          key={theme.value}
          onSelect={() => handleChangeTheme(theme.value)}
        >
          <div className="mr-2 h-4 w-4">{theme.icon}</div>
          <span>Toggle theme: {theme.label}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
