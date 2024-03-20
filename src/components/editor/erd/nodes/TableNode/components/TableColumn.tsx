import React, { ChangeEvent, FC, createElement, memo, useMemo } from 'react';
import classNames from 'classnames';
import { Handle, Position } from 'reactflow';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';
import { useDoubleClickInput } from '@/hooks/useDoubleClickInput';
import { createHandleId, nodeColumnSelector, showElementsIdAtom } from '@/store/editor';
import { COLUMNS_MAP } from '@/data/editor';
import { TableColumnConfiguration } from './TableColumnConfiguration';

interface ITableColumnProps {
  nodeId: string;
  columnId: string;
}

const TableColumnComponent: FC<ITableColumnProps> = ({
  nodeId,
  columnId,
}): JSX.Element => {
  const showElementsId = useRecoilValue(showElementsIdAtom);

  const [column, setColumn] = useRecoilState(
    nodeColumnSelector({ nodeId, columnId })
  );

  const columnTypeInfo = useMemo(() => {
    return COLUMNS_MAP.get(column.type)!;
  }, [column.type]);

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
      {showElementsId ? (
        <p className="shrink-0 mr-2 text-muted-foreground">#{column.id}</p>
      ) : null}

      <div
        className={classNames('w-28 flex items-center shrink-0', {
          'text-amber-500': !column.required,
          'text-green-500': column.required,
        })}
      >
        {createElement(columnTypeInfo.icon as any, {
          className: 'w-4 h-4 shrink-0',
        })}

        <span className="ml-2 text-muted-foreground">
          {columnTypeInfo.label}
        </span>
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

      {columnTypeInfo.hasValue ? (
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
        id={createHandleId(nodeId, column.id, "source")}
      />

      <Handle
        className={classNames('handle right', {
          'opacity-0 pointer-events-none': !column.keyType,
        })}
        type="target"
        position={Position.Right}
        id={createHandleId(nodeId, column.id, "target")}
      />
    </div>
  );
};

export const TableColumn = memo(TableColumnComponent);
