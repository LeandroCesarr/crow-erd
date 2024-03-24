'use client';

import React, { FC } from 'react';
import { DownloadIcon } from '@radix-ui/react-icons';
import { CommandItem } from '@/components/ui/command';
import { useRecoilCallback } from 'recoil';
import { getEditorDataCallback } from '@/store/editor';
import { createFileString } from '@/utils/file';

interface IExportFileCommandProps {
  onExecute?: () => void;
}

export const ExportFileCommand: FC<IExportFileCommandProps> = ({
  onExecute,
}): JSX.Element => {

  const getEditorData = useRecoilCallback(getEditorDataCallback);

  async function exportData() {
    const data = await getEditorData();
    const link = document.createElement('a');
    const date = new Date().toLocaleDateString();

    link.href = createFileString(data);
    link.download = `Crow ERD Diagram - ${date}.json`;

    link.click();
  }

  async function handleExecuteCommand() {
    await exportData()

    onExecute?.();
  }

  return (
    <CommandItem onSelect={handleExecuteCommand}>
      <DownloadIcon className="mr-2 h-4 w-4" />
      <span>Export diagram</span>
    </CommandItem>
  );
};
