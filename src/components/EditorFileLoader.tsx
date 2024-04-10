'use client';

import React, { FC } from 'react';
import { Button } from './ui/button';
import { useEditorFile } from '@/hooks/useEditorFile';
import { SymbolIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';

export const EditorFileLoader: FC = (): JSX.Element => {
  const { onFileChange, isLoading } = useEditorFile();

  return (
    <Button asChild className={classNames("cursor-pointer", {
      "cursor-wait": isLoading
    })} disabled={isLoading}>
      <label className="relative" htmlFor="load-editor-file">
        <input
          type="file"
          name="load-editor-file"
          id="load-editor-file"
          className="w-0 h-0"
          onChange={onFileChange}
          accept=".json"
          disabled={isLoading}
        />

        {isLoading ? (
          <SymbolIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : null}

        <span>Open file</span>
      </label>
    </Button>
  );
};
