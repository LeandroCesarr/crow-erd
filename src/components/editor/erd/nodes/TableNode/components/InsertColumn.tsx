import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
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
import { LetterCaseCapitalizeIcon, PlusIcon } from '@radix-ui/react-icons';
import { ColumnTypeEnum } from '@/enums/ColumnTypeEnum';
import KeyIcon from '@heroicons/react/24/outline/KeyIcon';
import { useRecoilCallback } from 'recoil';
import { addTableNodeColumnCallback } from '@/store/editor';
import { TTableColumn } from '@/@types/nodes';

const ICON_PROPS = {
  className: 'w-4 h-4 mr-1',
};

const OPTIONS = [
  {
    label: 'Identifiers',
    items: [
      {
        label: 'UUID',
        value: ColumnTypeEnum.UUID,
        icon: <KeyIcon {...ICON_PROPS} />,
      },
    ],
  },
  {
    label: 'Texts',
    items: [
      {
        label: 'varchar',
        value: ColumnTypeEnum.VARCHAR,
        icon: <LetterCaseCapitalizeIcon {...ICON_PROPS} />,
      },
    ],
  },
];

interface IInsertColumnProps {
  tableId: string;
}

export const InsertColumn: FC<IInsertColumnProps> = ({
  tableId,
}): JSX.Element => {
  const [selectedType, setSelectedType] = useState('');

  const handleAddColumn = useRecoilCallback((recoil) => () => {
    if (!selectedType) return;

    addTableNodeColumnCallback(recoil, tableId, {
      id: uuid(),
      name: 'New column',
      type: selectedType as ColumnTypeEnum,
      required: false,
    } as TTableColumn);
  });

  return (
    <div className="flex">
      <Select onValueChange={setSelectedType}>
        <SelectTrigger className="grow rounded-r-none">
          <SelectValue placeholder="Select column type" />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((group) => (
            <SelectGroup key={group.label}>
              <SelectLabel>{group.label}</SelectLabel>

              {group.items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <div className="flex items-center">
                    {item.icon}
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
