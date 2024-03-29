import React, { FC } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import {
  deleteConstraintCallback,
  nodeConstraintSelector,
  nodeSelector,
} from '@/store/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ConstraintEnum } from '@/enums/ConstraintEnum';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';

interface IConstraintEditorProps {
  nodeId: string;
  constraintId: string;
}

export const ConstraintEditor: FC<IConstraintEditorProps> = ({
  nodeId,
  constraintId,
}): JSX.Element => {
  const { data: table } = useRecoilValue(nodeSelector(nodeId));
  const [constraint, setConstraint] = useRecoilState(
    nodeConstraintSelector({ nodeId, constraintId })
  );

  const handleDeleteConstraint = useRecoilCallback(
    deleteConstraintCallback(nodeId, constraintId)
  );

  function handleTypeChange(type: string) {
    setConstraint((old) => ({
      ...old,
      type: type as ConstraintEnum,
    }));
  }

  function handleNameChange(name: string) {
    setConstraint((old) => ({
      ...old,
      name,
    }));
  }

  function handleColumnsChange(cols: string[]) {
    setConstraint((old) => ({
      ...old,
      columns: cols,
    }));
  }

  return (
    <div className="p-1 flex flex-col gap-4">
      <div className="space-y-1">
        <Label>Columns</Label>
        <ToggleGroup
          type="multiple"
          className="justify-start flex-wrap"
          value={constraint.columns}
          onValueChange={handleColumnsChange}
        >
          {table?.columns.map((col) => (
            <ToggleGroupItem
              key={col.id}
              value={col.id}
              aria-label="Toggle bold"
            >
              {col.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-1">
        <Label>Type</Label>
        <Select value={constraint.type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Target relation" />
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
      </div>

      <div className="space-y-1">
        <Label>Custom name</Label>
        <Input
          placeholder="Type custom constraint name"
          value={constraint.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>

      {constraint.type === ConstraintEnum.CHECK ? (
        <div className="space-y-1">
          <Label>Custom value</Label>
          <Input placeholder="Type custom constraint name" />
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button variant="destructive" onClick={handleDeleteConstraint}>
          Delete
        </Button>
      </div>
    </div>
  );
};
