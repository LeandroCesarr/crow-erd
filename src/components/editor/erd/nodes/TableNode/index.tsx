import { useMemo } from 'react';
import { TTableNodeProps } from '@/@types/nodes';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useNode } from '@/hooks/useNode';
import classNames from 'classnames';
import { TableColumn } from './components/TableColumn';
import { InsertColumn } from './components/InsertColumn';
import { TableTitle } from './components/TableTitle';

export const TABLE_NODE_TYPE = 'table';

export const TableNode = ({
  data,
  id,
  selected,
  dragging,
}: TTableNodeProps) => {
  const { removeNode } = useNode();

  const shouldShowActions = useMemo(() => {
    return selected && !dragging;
  }, [selected, dragging]);

  function handleRemoveNode(): void {
    removeNode(id);
  }

  return (
    <div className="relative">
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={classNames(
              'p-4 min-w-64 space-y-3 bg-background shadow-lg border border-muted text-black rounded-md text-foreground dark:border-foreground',
              {
                'outline outline-4 outline-cyan-500': selected,
              }
            )}
          >
            <div className="space-y-2">
              <TableTitle tableId={id} />
              <p>
                {data.description ?? (
                  <span className="text-muted-foreground">
                    Describe your table here (e.g. what it represents)
                  </span>
                )}
              </p>
            </div>

            <div className="w-full flex flex-col gap-2">
              {data.columns.map((column) => (
                <TableColumn tableId={id} data={column} key={column.id} />
              ))}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onSelect={handleRemoveNode}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {shouldShowActions ? (
        <div className="absolute top-[calc(100%+1rem)] w-full left-0 nodrag bg-background rounded-md p-1 border border-muted">
          <InsertColumn tableId={id} />
        </div>
      ) : null}
    </div>
  );
};
