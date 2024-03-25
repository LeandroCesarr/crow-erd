import { FC } from 'react';
import { TTableEdgeProps } from '@/@types/nodes';
import { Cross1Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import {
  BaseEdge,
  EdgeLabelRenderer,
  Position,
  getSmoothStepPath
} from 'reactflow';
import { Button } from '@/components/ui/button';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentEdgeIdAtom, edgeSelector, removeEdgeCallback } from '@/store/editor';

export const TableEdge: FC<TTableEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
}) => {
  const setCurrentEdgeId = useSetRecoilState(currentEdgeIdAtom);
  const edge = useRecoilValue(edgeSelector(id));
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  });

  const removeEdge = useRecoilCallback(removeEdgeCallback)

  function handleRemoveEdge() {
    removeEdge(id)
  }

  function handleOpenOptions() {
    setCurrentEdgeId(id);
  }

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerStart={`url(#${edge.data?.sourceRelation})`}
        markerEnd={`url(#${edge.data?.targetRelation})`}
      />
      <EdgeLabelRenderer>
        <div
          className="inline-flex bg-background rounded-sm overflow-hidden border border-muted"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          {edge.data?.title ? (
            <label className="whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2">
              {edge.data.title}
            </label>
          ) : null}

          {selected ? (
            <div>
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
                onClick={handleRemoveEdge}
              >
                <Cross1Icon />
              </Button>
            </div>
          ) : null}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
