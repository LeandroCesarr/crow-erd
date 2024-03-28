import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { currentTableIdAtom } from '@/store/editor';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';

interface ITableOptionsDialogProps {}

export const TableOptionsDialog: FC<
  ITableOptionsDialogProps
> = (): JSX.Element => {
  const [currentTableId, setCurrentTableId] = useRecoilState(currentTableIdAtom);

  function handleOpenChange(open: boolean) {
    if (!open) setCurrentTableId('');
  }

  return (
    <Sheet open={!!currentTableId} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Table options</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
