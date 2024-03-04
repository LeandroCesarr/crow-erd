import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';
import { ColumnTypeEnum } from '@/enums/ColumnTypeEnum';
import { useDoubleClickInput } from '@/hooks/useDoubleClickInput';
import { nodeColumnSelector } from '@/store/editor';
import { KeyIcon } from '@heroicons/react/24/outline';
import { LetterCaseCapitalizeIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import React, { ChangeEvent, FC, memo } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { TableColumnConfiguration } from './TableColumnConfiguration';

const ICON_PROPS = {
  className: 'w-4 h-4',
};

const ICON_MAP = {
  [ColumnTypeEnum.UUID]: <KeyIcon {...ICON_PROPS} />,
  [ColumnTypeEnum.VARCHAR]: <LetterCaseCapitalizeIcon {...ICON_PROPS} />,
  [ColumnTypeEnum.CHAR]: <LetterCaseCapitalizeIcon {...ICON_PROPS} />,
};

const COLUMNS_WITH_VALUE = [ColumnTypeEnum.VARCHAR, ColumnTypeEnum.CHAR];

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

  function handleRequiredChange(required: boolean) {
    setColumn((old) => ({
      ...old,
      required,
    }));
  }

  function handleValueChange(evt: ChangeEvent<HTMLInputElement>) {
    setColumn((old) => ({
      ...old,
      value: evt.currentTarget.value,
    }));
  }

  return (
    <div className="group flex items-center relative gap-2" key={column.id}>
      <p className="shrink-0 mr-2 text-muted-foreground">#{column.id}</p>

      <div
        className={classNames('w-20 flex items-center shrink-0', {
          'text-amber-500': !column.required,
          'text-green-500': column.required,
        })}
      >
        {ICON_MAP[column.type]}
        <span className="ml-2 text-muted-foreground">{column.type}</span>
      </div>

      <div className="grow">
        <input
          {...inputProps}
          placeholder="Empty title"
          className={classNames(
            'block w-full grow text-lg font-medium border-none outline-none bg-transparent cursor-grab',
            {
              'text-muted-foreground': !column.name,
              'cursor-text nodrag': isEditing,
            }
          )}
          value={column.name}
        />
      </div>

      {COLUMNS_WITH_VALUE.includes(column.type) ? (
        <div className="w-32">
          <input
            placeholder="Value"
            className="border-none outline-none bg-transparent block w-full"
            onChange={handleValueChange}
            value={column.value}
          />
        </div>
      ) : null}

      <div>
        <TableColumnConfiguration
          required={column.required}
          keyType={column.keyType}
          onKeyTypeChange={handleChangeKeyType}
          onRequiredChange={handleRequiredChange}
        />
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

export const TableColumn = memo(TableColumnComponent);
