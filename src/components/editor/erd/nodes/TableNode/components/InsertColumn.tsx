import React, { FC, createElement, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusIcon } from '@radix-ui/react-icons';
import { ColumnTypeEnum } from '@/enums/ColumnTypeEnum';
import { useRecoilCallback } from 'recoil';
import { addTableNodeColumnCallback } from '@/store/editor';
import { TTableColumn } from '@/@types/nodes';
import { COLUMNS_GROUP_MAP } from '@/data/editor';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';

interface IInsertColumnProps {
  tableId: string;
}

export const InsertColumn: FC<IInsertColumnProps> = ({
  tableId,
}): JSX.Element => {
  const [selectedType, setSelectedType] = useState('');

  const handleAddColumn = useRecoilCallback((recoil) => async () => {
    if (!selectedType) return;

    await addTableNodeColumnCallback(recoil, tableId, {
      name: 'New column',
      type: selectedType as ColumnTypeEnum,
      required: true,
      keyTypes: [] as ColumnKeyTypeEnum[]
    } as TTableColumn);
  });

  return (
    <div className="flex">
      <Select onValueChange={setSelectedType}>
        <SelectTrigger className="grow rounded-r-none">
          <SelectValue placeholder="Select column type" />
        </SelectTrigger>
        <SelectContent>
          {COLUMNS_GROUP_MAP.map((group) => (
            <SelectGroup key={group.label}>
              <SelectLabel>{group.label}</SelectLabel>

              {group.items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <div className="flex items-center">
                    {createElement(item.icon, {
                      className: 'w-4 h-4 mr-1',
                    })}
                    <span>{item.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        className="rounded-l-none ml-0.5"
        onClick={handleAddColumn}
        disabled={!selectedType}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};
