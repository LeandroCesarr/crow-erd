import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { useNode } from '@/hooks/useNode';
import classNames from 'classnames';
import { useCallback } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';

const handleStyle = { left: 10 };

export const TABLE_NODE_TYPE = 'table';

export const TableNode = ({ data, id, selected }: NodeProps) => {
  const { removeNode } = useNode();

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  function handleRemoveNode() : void {
    removeNode(id)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={classNames('bg-slate-200 text-black p-4 rounded-md', {
            'border-4 border-cyan-500': selected,
          })}
        >
          <Handle type="target" position={Position.Top} />
          <div>
            <label htmlFor="text">Text:</label>
            <input
              id="text"
              name="text"
              onChange={onChange}
              className="nodrag"
            />
          </div>
          <Handle type="source" position={Position.Bottom} id="a" />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            style={handleStyle}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onSelect={handleRemoveNode}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
