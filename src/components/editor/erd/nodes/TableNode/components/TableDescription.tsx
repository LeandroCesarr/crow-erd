import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { nodeDescriptionSelector } from '@/store/editor';
import classNames from 'classnames';
import { useDoubleClickInput } from '@/hooks/useDoubleClickInput';

interface ITableDescriptionProps {
  tableId: string;
}

export const TableDescription: FC<ITableDescriptionProps> = ({ tableId }): JSX.Element => {
  const [description, setDescription] = useRecoilState(nodeDescriptionSelector(tableId));

  const { isEditing, inputProps } = useDoubleClickInput({
    onChange: setDescription,
  });

  return (
    <input
      {...inputProps}
      placeholder="Describe your table here (e.g. what it represents)"
      className={classNames(
        'block w-full border-none outline-none bg-transparent cursor-grab',
        {
          'text-muted-foreground': !description,
          'cursor-text nodrag': isEditing
        }
      )}
      value={description}

    />
  );
};
