import { Badge } from '@/components/ui/badge';
import { CONSTRAINT_CLASSES } from '@/data/editor';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';
import {
  nodeComputedConstraintsSelector,
  nodeConstraintColumnNamesSelector,
  nodeConstraintSelector,
  nodeConstraintsIdsSelector,
  nodeConstraintsSelector,
} from '@/store/editor';
import classNames from 'classnames';
import React, { CSSProperties, FC } from 'react';
import { useRecoilValue } from 'recoil';

interface IConstraintsProps {
  nodeId: string;
}

interface IConstraintItemProps {
  tableId: string;
  constraintId: string;
}

interface IComputedConstraintItemProps {
  types: ColumnKeyTypeEnum[];
  name: string;
}

const ComputedConstraintItem: FC<IComputedConstraintItemProps> = ({
  name,
  types,
}): JSX.Element => {
  return (
    <div className="flex items-center">
      <Badge className={classNames('w-16 justify-center mr-2 bg-red-500 hover:bg-red-500')}>
        {types.join(' | ')}
      </Badge>
      <span>{name}</span>
    </div>
  );
};

const ConstraintItem: FC<IConstraintItemProps> = ({
  tableId,
  constraintId,
}): JSX.Element => {
  const constraint = useRecoilValue(
    nodeConstraintSelector({ nodeId: tableId, constraintId })
  );
  const columnNames = useRecoilValue(
    nodeConstraintColumnNamesSelector({ nodeId: tableId, constraintId })
  );

  return (
    <div className='justify-center'>
      <Badge
        className={classNames('w-16 justify-center mr-2', [
          CONSTRAINT_CLASSES[constraint.type],
        ])}
      >
        {constraint.type}
      </Badge>{' '}
      {constraint.name ? (
        <span className="italic text-muted-foreground">{constraint.name}</span>
      ) : null}
      <span>{columnNames.join(', ')}</span>
    </div>
  );
};

export const Constraints: FC<IConstraintsProps> = ({ nodeId }): JSX.Element => {
  const computedConstraints = useRecoilValue(
    nodeComputedConstraintsSelector(nodeId)
  );
  const constraints = useRecoilValue(nodeConstraintsIdsSelector(nodeId));

  return (
    <>
      <ul>
        {computedConstraints.map((constraint) => (
          <li key={constraint.columnName}>
            <ComputedConstraintItem
              name={constraint.columnName}
              types={constraint.types}
            />
          </li>
        ))}
        {constraints.map((constraint) => (
          <li key={constraint}>
            <ConstraintItem tableId={nodeId} constraintId={constraint} />
          </li>
        ))}
      </ul>

      {/* <ul className="group">
        {constraints.map((constraint, idx) => (
          <li
            key={constraint.id}
            className={classNames(
              'w-6 h-6 inline-flex items-center justify-center uppercase rounded-md translate-x-0 transition-transform mr-1',
              [CONSTRAINT_CLASSES[constraint.type]],
              idx > 0 ? "group-hover:!translate-x-0" : ""
            )}
            style={{
              '--tw-translate-x': `-${idx * 18}px`,
            } as CSSProperties }
          >
            <span >{constraint.type[0]}</span>
          </li>
        ))}
      </ul> */}
    </>
  );
};
