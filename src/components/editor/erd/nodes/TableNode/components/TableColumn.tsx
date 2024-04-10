import React, { ChangeEvent, FC, createElement, memo, useMemo } from 'react';
import classNames from 'classnames';
import { Handle, Position } from 'reactflow';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';
import { useDoubleClickInput } from '@/hooks/useDoubleClickInput';
import {
  createHandleId,
  nodeColumnSelector,
  showElementsIdAtom,
} from '@/store/editor';
import { COLUMNS_GROUP_MAP, COLUMNS_MAP } from '@/data/editor';
import { TableColumnConfiguration } from './TableColumnConfiguration';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnTypeEnum } from '@/enums/ColumnTypeEnum';

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

  const shouldShoeHandle = column.keyTypes.length;

  const columnTypeInfo = useMemo(() => {
    return COLUMNS_MAP.get(column.type);
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

  function handleChangeType(type: ColumnTypeEnum) {
    setColumn((old) => ({
      ...old,
      type,
    }));
  }

  function handleChangeKeyTypes(keyTypes: ColumnKeyTypeEnum[]) {
    setColumn((old) => ({
      ...old,
      keyTypes,
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
        <Select onValueChange={handleChangeType} value={column.type}>
          <SelectTrigger className="grow border-0">
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

      {columnTypeInfo?.hasValue ? (
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
          nodeId={nodeId}
          columnId={columnId}
          required={column.required}
          keyTypes={column.keyTypes}
          onKeyTypeChange={handleChangeKeyTypes}
          onRequiredChange={handleRequiredChange}
        />
      </div>

      <Handle
        type="source"
        position={Position.Left}
        id={createHandleId(nodeId, column.id, 'source')}
        className={classNames('handle left', {
          'opacity-0 pointer-events-none': !shouldShoeHandle,
        })}
      />

      <Handle
        type="target"
        position={Position.Right}
        id={createHandleId(nodeId, column.id, 'target')}
        className={classNames('handle right', {
          'opacity-0 pointer-events-none': !shouldShoeHandle,
        })}
      />
    </div>
  );
};

export const TableColumn = memo(TableColumnComponent);
