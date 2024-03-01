import { FC } from 'react';
import { TTableEdgeProps } from '@/@types/nodes';
import { Cross1Icon } from '@radix-ui/react-icons';
import {
  BaseEdge,
  EdgeLabelRenderer,
  Position,
  getSmoothStepPath,
  useReactFlow,
} from 'reactflow';
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
import { ColumnRelationsEnum } from '@/enums/ColumnRelationsEnum';
import { useRecoilState } from 'recoil';
import { edgeSelector } from '@/store/editor';
import classNames from 'classnames';

export const TableEdge: FC<TTableEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
}) => {
  const [edge, setEdge] = useRecoilState(edgeSelector(id));
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  });

  function handleSourceRelationChange(value: ColumnRelationsEnum) {
    setEdge((old) => ({
      ...old,
      data: {
        ...old.data,
        sourceRelation: value,
      },
    }));
  }

  function handleTargetRelationChange(value: ColumnRelationsEnum) {
    setEdge((old) => ({
      ...old,
      data: {
        ...old.data,
        targetRelation: value,
      },
    }));
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
        {selected ? (
          <div
            className="inline-flex bg-background rounded-sm overflow-hidden border border-muted"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
            }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-none border-0"
              onClick={() =>
                setEdges((edges) => edges.filter((e) => e.id !== id))
              }
            >
              <Cross1Icon />
            </Button>

            <div
              className={classNames('flex', {
                'flex-row-reverse': sourceX > targetX,
              })}
            >
              <div className="w-30">
                <Select
                  value={edge.data?.sourceRelation}
                  onValueChange={handleSourceRelationChange}
                >
                  <SelectTrigger className="grow rounded-none border-0 focus:shadow-transparent focus:outline-none">
                    <SelectValue placeholder="Source relation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Relations types</SelectLabel>

                      {Object.values(ColumnRelationsEnum).map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center">
                            <span>{type}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-30">
                <Select
                  value={edge.data?.targetRelation}
                  onValueChange={handleTargetRelationChange}
                >
                  <SelectTrigger className="grow rounded-none border-0 focus:shadow-transparent focus:outline-none">
                    <SelectValue placeholder="Target relation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Relations types</SelectLabel>

                      {Object.values(ColumnRelationsEnum).map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center">
                            <span>{type}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : null}
      </EdgeLabelRenderer>
    </>
  );
};
