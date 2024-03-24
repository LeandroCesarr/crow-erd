'use client';

import React, { FC } from 'react';
import { Button } from './ui/button';
import { useEditorFile } from '@/hooks/useEditorFile';
import { SymbolIcon } from '@radix-ui/react-icons';

export const NewDiagramCreator: FC = (): JSX.Element => {
  const { createNew, isLoading } = useEditorFile();

  return (
    <Button disabled={isLoading} onClick={createNew}>
      {isLoading ? <SymbolIcon className="mr-2 h-4 w-4 animate-spin" /> : null}

      <span>Create new</span>
    </Button>
  );
};
