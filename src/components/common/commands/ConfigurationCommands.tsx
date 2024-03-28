import React, { FC } from 'react';
import { useTheme } from 'next-themes';
import { CommandGroup, CommandItem } from '@/components/ui/command';
import { BlendingModeIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  changeCommandDialogPageCallback,
  currentDialogPageAtom,
} from '@/store/editor';
import { COMMAND_DIALOG_ROOT_PAGE } from '@/data/editor';

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

const THEME_PAGE = 'theme-page';

export const ConfigurationCommands: FC<IConfigurationCommandsProps> = ({
  onExecute,
}): JSX.Element => {
  const currentPage = useRecoilValue(currentDialogPageAtom);

  const { setTheme } = useTheme();

  const changeCommandDialogPage = useRecoilCallback(
    changeCommandDialogPageCallback
  );

  function handleExecuteCommand() {
    onExecute?.();
  }

  function handleChangeTheme(theme: string) {
    setTheme(theme);
    changeCommandDialogPage(COMMAND_DIALOG_ROOT_PAGE);
    handleExecuteCommand();
  }

  return (
    <>
      {currentPage === COMMAND_DIALOG_ROOT_PAGE ? (
        <CommandGroup heading="Configuration">
          <CommandItem onSelect={() => changeCommandDialogPage(THEME_PAGE)}>
            <BlendingModeIcon className="mr-2 h-4 w-4" />
            <span>Change theme</span>
          </CommandItem>
        </CommandGroup>
      ) : null}

      {currentPage === THEME_PAGE
        ? THEMES.map((theme) => (
            <CommandItem
              key={theme.value}
              onSelect={() => handleChangeTheme(theme.value)}
            >
              <div className="mr-2 h-4 w-4">{theme.icon}</div>
              <span>Toggle theme: {theme.label}</span>
            </CommandItem>
          ))
        : null}
    </>
  );
};
