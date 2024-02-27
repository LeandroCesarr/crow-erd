import { Cross1Icon } from '@radix-ui/react-icons';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from 'reactflow';

export const Edge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected
} : EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        {selected ? (
          <button
            className='absolute p-1 bg-background border border-muted rounded-full hover:bg-muted transition-colors'
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
