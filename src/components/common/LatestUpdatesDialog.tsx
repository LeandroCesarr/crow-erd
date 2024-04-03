'use client';

import Markdown, { Components } from 'react-markdown';
import React, { FC, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useLatestUpdates } from '@/hooks/useLatestUpdates';

const COMPONENTS: Components = {
  a: ({ children, ...rest }) => (
    <a {...rest} target="_blank">
      {children}
    </a>
  ),
};

export const LatestUpdates: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useLatestUpdates();

  useEffect(() => {
    if (data && !isOpen) {
      setIsOpen(true);
    }
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <article>
          <h1 className="text-3xl font-bold mb-6">
            A New version has released
          </h1>

          <Markdown className="markdown-viewer" components={COMPONENTS}>
            {data?.content}
          </Markdown>
        </article>
      </DialogContent>
    </Dialog>
  );
};
