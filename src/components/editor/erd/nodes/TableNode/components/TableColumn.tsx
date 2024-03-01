import { TTableColumn } from '@/@types/nodes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';
import { ColumnTypeEnum } from '@/enums/ColumnTypeEnum';
import { editColumnKeyTypeCallback } from '@/store/editor';
import { KeyIcon } from '@heroicons/react/24/outline';
import {
  DotsVerticalIcon,
  LetterCaseCapitalizeIcon,
} from '@radix-ui/react-icons';
import classNames from 'classnames';
import React, { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilCallback } from 'recoil';

const ICON_PROPS = {
  className: 'w-4 h-4',
};

const ICON_MAP = {
  [ColumnTypeEnum.UUID]: <KeyIcon {...ICON_PROPS} />,
  [ColumnTypeEnum.VARCHAR]: <LetterCaseCapitalizeIcon {...ICON_PROPS} />,
};

const COLUMNS_WITH_VALUE = [ColumnTypeEnum.VARCHAR];

interface ITableColumnProps {
  tableId: string;
  data: TTableColumn;
}

export const TableColumn: FC<ITableColumnProps> = ({
  data,
  tableId,
}): JSX.Element => {
  const changeKeyType = useRecoilCallback(
    (recoil) => (type: ColumnKeyTypeEnum) => {
      const typeToUpdate = type !== data.keyType ? type : null;
      editColumnKeyTypeCallback(recoil, tableId, data.id, typeToUpdate);
    }
  );

  return (
    <div className="group flex items-center relative gap-2" key={data.id}>
      <div className='w-20 flex items-center'>
        {ICON_MAP[data.type]}
        <span className='ml-2 text-muted-foreground'>{data.type}</span>
      </div>
      <p className="grow">{data.name}</p>

      {COLUMNS_WITH_VALUE.includes(data.type) ? (
        <input
          placeholder="Value"
          className="border-none outline-none bg-transparent w-32"
        />
      ) : null}

      <div>
        {/* TODO: abstract to dedicated component to memo */}
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
              checked={data.keyType == ColumnKeyTypeEnum.PRIMARY_KEY}
              onCheckedChange={() =>
                changeKeyType(ColumnKeyTypeEnum.PRIMARY_KEY)
              }
            >
              Primary key
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={data.keyType == ColumnKeyTypeEnum.FOREIGN_KEY}
              onCheckedChange={() =>
                changeKeyType(ColumnKeyTypeEnum.FOREIGN_KEY)
              }
            >
              Foreign key
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Handle
        className={classNames('handle left', {
          'opacity-0 pointer-events-none': !data.keyType,
        })}
        type="source"
        position={Position.Left}
        id={`${tableId}-${data.id}-source`}
      />

      <Handle
        className={classNames('handle right', {
          'opacity-0 pointer-events-none': !data.keyType,
        })}
        type="target"
        position={Position.Right}
        id={`${tableId}-${data.id}-target`}
      />
    </div>
  );
};
