import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { currentEdgeIdAtom, edgeSelector } from '@/store/editor';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { ColumnRelationsEnum } from '@/enums/ColumnRelationsEnum';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useReactFlow } from 'reactflow';
import { Button } from '@/components/ui/button';

interface IEdgeOptionsDialogProps {}

export const EdgeOptionsDialog: FC<
  IEdgeOptionsDialogProps
> = (): JSX.Element => {
  const [currentEdgeId, setCurrentEdgeId] = useRecoilState(currentEdgeIdAtom);
  const [edge, setEdge] = useRecoilState(edgeSelector(currentEdgeId));
  const { setEdges } = useReactFlow();

  function handleOpenChange(open: boolean) {
    if (!open) setCurrentEdgeId('');
  }

  function handleDeleteNode() {
    setCurrentEdgeId("")
    setEdges((edges) => edges.filter((e) => e.id !== currentEdgeId))
  }

  function handleTitleChange(value: string) {
    setEdge((old) => ({
      ...old,
      data: {
        ...old.data,
        title: value,
      },
    }));
  }

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
    <Sheet open={!!currentEdgeId} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Connection options</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Type connection name"
              value={edge.data?.title}
              onChange={(evt) => handleTitleChange(evt.currentTarget.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Source relation</Label>
            <Select
              value={edge.data?.sourceRelation}
              onValueChange={handleSourceRelationChange}
            >
              <SelectTrigger>
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
          <div className="space-y-2">
            <Label>Target relation</Label>
            <Select
              value={edge.data?.targetRelation}
              onValueChange={handleTargetRelationChange}
            >
              <SelectTrigger>
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
        <div className="mt-8 flex justify-end">
          <Button
            variant="destructive"
            onClick={handleDeleteNode}
          >
            Delete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
