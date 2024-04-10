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
  keyTypes: ColumnKeyTypeEnum[];
  onKeyTypeChange?: (values: ColumnKeyTypeEnum[]) => void;
  onRequiredChange?: (value: boolean) => void;
}

const TableColumnConfigurationComponent: FC<ITableColumnConfigurationProps> = ({
  nodeId,
  columnId,
  keyTypes,
  required,
  onKeyTypeChange,
  onRequiredChange,
}): JSX.Element => {
  const handleDeleteColumn = useRecoilCallback(
    deleteColumnCallback(nodeId, columnId)
  );

  function handleKeyTypesChange(value: ColumnKeyTypeEnum, include: boolean) : void {
    if (include) {
      onKeyTypeChange?.([
        ...keyTypes,
        value
      ])

      return;
    }

    onKeyTypeChange?.(keyTypes.filter((keyType) => keyType != value));
  }

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
          checked={keyTypes.includes(ColumnKeyTypeEnum.PRIMARY_KEY)}
          onCheckedChange={(checked) =>
            handleKeyTypesChange(ColumnKeyTypeEnum.PRIMARY_KEY, checked)
          }
        >
          Primary key
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={keyTypes.includes(ColumnKeyTypeEnum.FOREIGN_KEY)}
          onCheckedChange={(checked) =>
            handleKeyTypesChange(ColumnKeyTypeEnum.FOREIGN_KEY, checked)
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
