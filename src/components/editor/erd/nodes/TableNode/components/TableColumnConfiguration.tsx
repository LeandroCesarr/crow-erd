import React, { FC, memo } from 'react';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';
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
  required: boolean;
  keyType?: ColumnKeyTypeEnum;
  onKeyTypeChange?: (value: ColumnKeyTypeEnum) => void;
  onRequiredChange?: (value: boolean) => void;
}

const TableColumnConfigurationComponent: FC<ITableColumnConfigurationProps> = ({
  nodeId,
  columnId,
  keyType,
  required,
  onKeyTypeChange,
  onRequiredChange,
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
        <DropdownMenuCheckboxItem
          checked={keyType == ColumnKeyTypeEnum.PRIMARY_KEY}
          onCheckedChange={() =>
            onKeyTypeChange?.(ColumnKeyTypeEnum.PRIMARY_KEY)
          }
        >
          Primary key
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={keyType == ColumnKeyTypeEnum.FOREIGN_KEY}
          onCheckedChange={() =>
            onKeyTypeChange?.(ColumnKeyTypeEnum.FOREIGN_KEY)
          }
        >
          Foreign key
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={required}
          onCheckedChange={onRequiredChange}
        >
          Required
        </DropdownMenuCheckboxItem>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuCheckboxItem onCheckedChange={handleDeleteColumn}>
          Delete
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TableColumnConfiguration = memo(TableColumnConfigurationComponent);
