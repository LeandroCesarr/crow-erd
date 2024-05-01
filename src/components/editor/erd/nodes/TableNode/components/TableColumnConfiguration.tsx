import React, { FC, memo } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { useRecoilCallback } from 'recoil';
import { deleteColumnCallback } from '@/store/editor';

interface ITableColumnConfigurationProps {
  nodeId: string;
  columnId: string;
}

const TableColumnConfigurationComponent: FC<ITableColumnConfigurationProps> = ({
  nodeId,
  columnId,
}): JSX.Element => {

  const handleDeleteColumn = useRecoilCallback(
    deleteColumnCallback(nodeId, columnId)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Configuration</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem onCheckedChange={handleDeleteColumn}>
          Delete
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TableColumnConfiguration = memo(TableColumnConfigurationComponent);
