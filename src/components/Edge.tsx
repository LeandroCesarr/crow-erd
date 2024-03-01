import { Cross1Icon } from '@radix-ui/react-icons';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  Position,
  getMarkerEnd,
  getSmoothStepPath,
  useReactFlow,
} from 'reactflow';

export const Edge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  markerEnd,
  markerStart
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: Position.Left,
    targetPosition: Position.Right
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
      <EdgeLabelRenderer>
        {selected ? (
          <button
            className="absolute p-1 bg-background border border-muted rounded-full hover:bg-muted transition-colors"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
            }}
            onClick={() =>
              setEdges((edges) => edges.filter((e) => e.id !== id))
            }
          >
            <Cross1Icon />
          </button>
        ) : null}
      </EdgeLabelRenderer>
    </>
  );
};
