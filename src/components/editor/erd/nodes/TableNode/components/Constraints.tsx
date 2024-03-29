import { Badge } from '@/components/ui/badge';
import { CONSTRAINT_CLASSES } from '@/data/editor';
import { nodeConstraintsSelector } from '@/store/editor';
import classNames from 'classnames';
import React, { CSSProperties, FC } from 'react';
import { useRecoilValue } from 'recoil';

interface IConstraintsProps {
  nodeId: string;
}

export const Constraints: FC<IConstraintsProps> = ({ nodeId }): JSX.Element => {
  const constraints = useRecoilValue(nodeConstraintsSelector(nodeId))

  return (
    <>
      <ul>
        {constraints.map((constraint) => (
          <li key={constraint.id} className="flex gap-2 items-center">
            <Badge
              className={classNames('w-14 justify-center mr-2', [
                CONSTRAINT_CLASSES[constraint.type],
              ])}
            >
              {constraint.type}
            </Badge>{' '}
            {constraint.name ? (
              <span className="italic text-muted-foreground">
                {constraint.name}
              </span>
            ) : null}
            <span>{constraint.columns.join(', ')}</span>
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
