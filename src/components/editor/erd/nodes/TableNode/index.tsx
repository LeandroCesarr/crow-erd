import { useMemo } from 'react';
import { TTableNodeProps } from '@/@types/nodes';
import { useNode } from '@/hooks/useNode';
import classNames from 'classnames';
import { TableColumn } from './components/TableColumn';
import { InsertColumn } from './components/InsertColumn';
import { TableTitle } from './components/TableTitle';
import { TableDescription } from './components/TableDescription';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentTableIdAtom, showElementsIdAtom } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Cross1Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Constraints } from './components/Constraints';

export const TableNode = ({
  data,
  id,
  selected,
  dragging,
}: TTableNodeProps) => {
  const setCurrentTableId = useSetRecoilState(currentTableIdAtom);
  const showElementsId = useRecoilValue(showElementsIdAtom);
  const { removeNode } = useNode();

  const shouldShowActions = useMemo(() => {
    return selected && !dragging;
  }, [selected, dragging]);

  function handleRemoveNode(): void {
    removeNode(id);
  }

  function handleOpenOptions() {
    setCurrentTableId(id);
  }

  return (
    <div className="relative">
      {shouldShowActions ? (
        <div className="absolute bottom-[calc(100%+1rem)] right-0 nodrag bg-background rounded-sm overflow-hidden border border-muted flex items-end">
          <Button
            variant="outline"
            size="icon"
            className="rounded-none border-0"
            onClick={handleOpenOptions}
          >
            <MixerHorizontalIcon />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-none border-0"
            onClick={handleRemoveNode}
          >
            <Cross1Icon />
          </Button>
        </div>
      ) : null}

      <div
        className={classNames(
          'p-4 w-[28rem] space-y-3 bg-background shadow-lg border border-muted text-black rounded-md text-foreground dark:border-foreground',
          {
            'outline outline-4 outline-cyan-500': selected,
          }
        )}
      >
        <div className="space-y-2">
          <div className="flex items-center">
            {showElementsId ? (
              <p className="shrink-0 mr-2 text-muted-foreground">#{id}</p>
            ) : null}

            <div className="grow">
              <TableTitle tableId={id} />
            </div>
          </div>
          <TableDescription tableId={id} />
        </div>

        <Constraints nodeId={id} />

        <div className="w-full flex flex-col gap-2">
          {data.columns.map((column) => (
            <TableColumn nodeId={id} columnId={column.id} key={column.id} />
          ))}
        </div>
      </div>

      {shouldShowActions ? (
        <div className="absolute top-[calc(100%+1rem)] w-full left-0 nodrag bg-background rounded-md p-1 border border-muted">
          <InsertColumn tableId={id} />
        </div>
      ) : null}
    </div>
  );
};
