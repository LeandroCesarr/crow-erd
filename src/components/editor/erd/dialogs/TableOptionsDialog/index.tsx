import { Badge } from '@/components/ui/badge';
import { v4 as uuid } from 'uuid';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CONSTRAINT_CLASSES } from '@/data/editor';
import {
  currentTableIdAtom,
  nodeSelector,
  updateNodeDataSetter,
} from '@/store/editor';
import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ConstraintEditor } from './ConstraintEditor';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ConstraintEnum } from '@/enums/ConstraintEnum';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { TBaseNode, TTableNode, TTableProps } from '@/@types/nodes';

interface ITableOptionsDialogProps {}

export const TableOptionsDialog: FC<
  ITableOptionsDialogProps
> = (): JSX.Element => {
  const [typeToCreate, setTypeToCreate] = useState('');
  const [currentTableId, setCurrentTableId] =
    useRecoilState(currentTableIdAtom);
  const [table, setTable] = useRecoilState(nodeSelector(currentTableId));

  function handleCreateConstraint() {
    setTable(
      (old) =>
        updateNodeDataSetter<TTableProps>(old as TBaseNode, {
          constraints: [
            ...old.data.constraints,
            {
              id: uuid(),
              type: typeToCreate as ConstraintEnum,
              columns: [],
            },
          ],
        }) as TTableNode
    );
  }

  function handleOpenChange(open: boolean) {
    if (!open) setCurrentTableId('');
  }

  return (
    <Sheet open={!!currentTableId} onOpenChange={handleOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Table options</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-3 overflow-auto p-1">
          <h2 className="text-lg">Constraints</h2>

          <Accordion type="single" collapsible className="w-full">
            {table.data?.constraints.map((constraint) => (
              <AccordionItem key={constraint.id} value={constraint.id}>
                <AccordionTrigger>
                  <div>
                    <Badge
                      className={classNames('w-14 justify-center', [
                        CONSTRAINT_CLASSES[constraint.type],
                      ])}
                    >
                      {constraint.type}
                    </Badge>{' '}
                    {constraint.name ? (
                      <span className="italic text-muted-foreground ml-2">
                        {constraint.name}
                      </span>
                    ) : null}
                    <span className="ml-2">
                      {constraint.columns.join(', ')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ConstraintEditor
                    nodeId={table.id}
                    constraintId={constraint.id}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex gap-2 items-stretch">
            <Select value={typeToCreate} onValueChange={setTypeToCreate}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ConstraintEnum).map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center">
                      <span>{type}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={handleCreateConstraint}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
