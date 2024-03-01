import React, { FC } from 'react';
import { TableIcon } from '@radix-ui/react-icons';
import { CommandItem } from '@/components/ui/command';
import { TABLE_NODE_TYPE } from '@/components/editor/erd/nodes/TableNode';
import { useNode } from '@/hooks/useNode';
import { TTableProps } from '@/@types/nodes';

interface IInsertTableCommandProps {
  onExecute?: () => void;
}

export const InsertTableCommand: FC<IInsertTableCommandProps> = ({
  onExecute,
}): JSX.Element => {
  const { createNode } = useNode();

  function handleCreateTable() {
    createNode<TTableProps>(TABLE_NODE_TYPE, {
      title: "Empty table",
      columns: []
    });

    onExecute?.();
  }

  return (
    <CommandItem onSelect={handleCreateTable}>
      <TableIcon className="mr-2 h-4 w-4" />
      <span>Insert table</span>
    </CommandItem>
  );
};
