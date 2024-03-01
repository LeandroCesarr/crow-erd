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
import { useDoubleClickInput } from '@/hooks/useDoubleClickInput';
import { nodeColumnSelector } from '@/store/editor';
import { KeyIcon } from '@heroicons/react/24/outline';
import {
  DotsVerticalIcon,
  LetterCaseCapitalizeIcon,
} from '@radix-ui/react-icons';
import classNames from 'classnames';
import React, { FC, memo } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilCallback, useRecoilState } from 'recoil';

const ICON_PROPS = {
  className: 'w-4 h-4',
};

const ICON_MAP = {
  [ColumnTypeEnum.UUID]: <KeyIcon {...ICON_PROPS} />,
  [ColumnTypeEnum.VARCHAR]: <LetterCaseCapitalizeIcon {...ICON_PROPS} />,
};

const COLUMNS_WITH_VALUE = [ColumnTypeEnum.VARCHAR];

interface ITableColumnProps {
  nodeId: string;
  columnId: string;
}

const TableColumnComponent: FC<ITableColumnProps> = ({
  nodeId,
  columnId,
}): JSX.Element => {
  const [column, setColumn] = useRecoilState(
    nodeColumnSelector({ nodeId, columnId })
  );

  const { inputProps, isEditing } = useDoubleClickInput({
    onChange: handleUpdateName,
  });

  function handleUpdateName(value: string) {
    setColumn((old) => ({
      ...old,
      name: value,
    }));
  }

  function handleChangeKeyType(type: ColumnKeyTypeEnum) {
    setColumn((old) => ({
      ...old,
      keyType: type,
    }));
  }

  return (
    <div className="group flex items-center relative gap-2" key={column.id}>
      <div className="w-20 flex items-center">
        {ICON_MAP[column.type]}
        <span className="ml-2 text-muted-foreground">{column.type}</span>
      </div>

      <input
        {...inputProps}
        placeholder="Empty title"
        className={classNames(
          'block grow text-lg font-medium border-none outline-none bg-transparent cursor-grab',
          {
            'text-muted-foreground': !column.name,
            'cursor-text nodrag': isEditing,
          }
        )}
        value={column.name}
      />

      {COLUMNS_WITH_VALUE.includes(column.type) ? (
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
              checked={column.keyType == ColumnKeyTypeEnum.PRIMARY_KEY}
              onCheckedChange={() =>
                handleChangeKeyType(ColumnKeyTypeEnum.PRIMARY_KEY)
              }
            >
              Primary key
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={column.keyType == ColumnKeyTypeEnum.FOREIGN_KEY}
              onCheckedChange={() =>
                handleChangeKeyType(ColumnKeyTypeEnum.FOREIGN_KEY)
              }
            >
              Foreign key
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Handle
        className={classNames('handle left', {
          'opacity-0 pointer-events-none': !column.keyType,
        })}
        type="source"
        position={Position.Left}
        id={`${nodeId}-${column.id}-source`}
      />

      <Handle
        className={classNames('handle right', {
          'opacity-0 pointer-events-none': !column.keyType,
        })}
        type="target"
        position={Position.Right}
        id={`${nodeId}-${column.id}-target`}
      />
    </div>
  );
};

export const TableColumn = memo(TableColumnComponent)