import { Button } from '@/components/ui/button';
import { diagramDetailsDialogAtom, fileTitleAtom } from '@/store/editor';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import React, { FC } from 'react';
import { Panel } from 'reactflow';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const FileDetails: FC = (): JSX.Element => {
  const fileTitle = useRecoilValue(fileTitleAtom);
  const setOpen = useSetRecoilState(diagramDetailsDialogAtom);

  return (
    <Panel position="top-left">
      <div className=" border border-muted rounded-sm bg-background w-60 flex justify-between items-center">
        <div className="py-1 px-3">
          <h1
            className={classNames(
              'w-full text-ellipsis overflow-hidden text-nowrap',
              {
                'text-muted': !fileTitle,
              }
            )}
          >
            {fileTitle || 'Untitled'}
          </h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 border-0 rounded-none"
          onClick={() => setOpen(true)}
        >
          <MixerHorizontalIcon />
        </Button>
      </div>
    </Panel>
  );
};
