import { Badge } from '@/components/ui/badge';
import { CONSTRAINT_CLASSES } from '@/data/editor';
import {
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

const ConstraintItem: FC<IConstraintItemProps> = ({
  tableId,
  constraintId,
}): JSX.Element => {
  const constraint = useRecoilValue(nodeConstraintSelector({ nodeId: tableId, constraintId }))
  const columnNames = useRecoilValue(nodeConstraintColumnNamesSelector({ nodeId: tableId, constraintId }))

  return (
    <div>
      <Badge
        className={classNames('w-14 justify-center mr-2', [
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
  const constraints = useRecoilValue(nodeConstraintsIdsSelector(nodeId));

  return (
    <>
      <ul>
        {constraints.map((constraint) => (
          <li key={constraint} className="flex gap-2 items-center">
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
