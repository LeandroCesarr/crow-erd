import React, { FC } from 'react';
import { CommandItem } from '@/components/ui/command';
import { IdentificationIcon } from '@heroicons/react/24/outline';
import { useRecoilCallback } from 'recoil';
import { toggleElementIdVisibility } from '@/store/editor';

interface IToggleElementsIdVisibilityCommandProps {
  onExecute?: () => void;
}

export const ToggleElementsIdVisibilityCommand: FC<IToggleElementsIdVisibilityCommandProps> = ({
  onExecute,
}): JSX.Element => {
  const toggleVisibility = useRecoilCallback(({ set }) => () => {
    toggleElementIdVisibility(set)
  })

  function handleCreateTable() {
    toggleVisibility()
    onExecute?.();
  }

  return (
    <CommandItem onSelect={handleCreateTable}>
      <IdentificationIcon className="mr-2 h-4 w-4" />
      <span>Toggle id visibility</span>
    </CommandItem>
  );
};
