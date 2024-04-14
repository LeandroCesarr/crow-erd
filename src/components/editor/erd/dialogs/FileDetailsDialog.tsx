import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import React, { FC } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRecoilState } from 'recoil';
import { diagramDetailsDialogAtom, fileTitleAtom } from '@/store/editor';

interface IFileDetailsDialogProps {}

export const FileDetailsDialog: FC<
  IFileDetailsDialogProps
> = (): JSX.Element => {
  const [open, setOpen] = useRecoilState(diagramDetailsDialogAtom);
  const [fileTitle, setFileTitle] = useRecoilState(fileTitleAtom);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Diagram details</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Type diagram name"
              value={fileTitle}
              onChange={(evt) => setFileTitle(evt.currentTarget.value)}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
