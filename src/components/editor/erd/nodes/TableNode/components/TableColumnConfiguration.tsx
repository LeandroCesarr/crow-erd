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

interface ITableColumnConfigurationProps {
  required: boolean;
  keyType?: ColumnKeyTypeEnum;
  onKeyTypeChange?: (value: ColumnKeyTypeEnum) => void;
  onRequiredChange?: (value: boolean) => void;
}

const TableColumnConfigurationComponent: FC<ITableColumnConfigurationProps> = ({
  keyType,
  required,
  onKeyTypeChange,
  onRequiredChange,
}): JSX.Element => {
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TableColumnConfiguration = memo(TableColumnConfigurationComponent);
