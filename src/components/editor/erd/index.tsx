'use client';

import 'reactflow/dist/style.css';
import { ComponentProps, FC, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  SelectionMode,
} from 'reactflow';
import { ActionsPanel } from './panels/ActionsPanel';
import { CommandsDialog } from './dialogs/CommandsDialog';
import { CommandLineDialog } from './dialogs/CommandLineDialog';
import { Markers } from './edges/Markers';
import { NODES_MAP } from './nodes';
import { EDGES_MAP, EDGE_DEFAULT_PROPS } from './edges';
import { useEditor } from '@/hooks/useEditor';
import { EdgeOptionsDialog } from './dialogs/EdgeOptionsDialog';
import { useParams, useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { loadedFileIdAtom } from '@/store/editor';
import { PagesEnum } from '@/enums/PagesEnum';
import classNames from 'classnames';
import { TableOptionsDialog } from './dialogs/TableOptionsDialog';
import { FileDetails } from './panels/FileDetails';
import { FileDetailsDialog } from './dialogs/FileDetailsDialog';

const DEFAULT_EDITOR_PROPS: ComponentProps<typeof ReactFlow> = {
  fitView: true,
  panOnScroll: true,
  selectionOnDrag: true,
  panOnDrag: [1, 2],
  selectionMode: SelectionMode.Partial,
  nodeTypes: NODES_MAP,
  edgeTypes: EDGES_MAP,
  defaultEdgeOptions: EDGE_DEFAULT_PROPS
}

export const ErdEditor: FC = () => {
  const editorProps = useEditor();
  const params = useParams();
  const { replace } = useRouter();
  const loadedFileId = useRecoilValue(loadedFileIdAtom);

  useEffect(() => {
    if (params.id != loadedFileId) {
      void replace(PagesEnum.HOME);
    }
  }, [params, loadedFileId]);

  return (
    <ReactFlowProvider>
      <div
        className={classNames('h-full', {
          hidden: params.id != loadedFileId,
        })}
      >
        <ReactFlow
          {...DEFAULT_EDITOR_PROPS}
          {...editorProps}
        >
          <FileDetails />
          <Background />
          <Controls />
          <MiniMap />
          <ActionsPanel />
          <Markers />
        </ReactFlow>

        <CommandsDialog />
        <CommandLineDialog />
        <EdgeOptionsDialog />
        <TableOptionsDialog />
        <FileDetailsDialog />
      </div>
    </ReactFlowProvider>
  );
};
