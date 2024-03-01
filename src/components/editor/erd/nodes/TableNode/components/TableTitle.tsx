import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { nodeTitleSelector } from '@/store/editor';
import classNames from 'classnames';
import { useDoubleClickInput } from '@/hooks/useDoubleClickInput';

interface ITableTitleProps {
  tableId: string;
}

export const TableTitle: FC<ITableTitleProps> = ({ tableId }): JSX.Element => {
  const [title, setTitle] = useRecoilState(nodeTitleSelector(tableId));

  const { inputProps, isEditing } = useDoubleClickInput({
    onChange: setTitle,
  });

  return (
    <input
      {...inputProps}
      placeholder="Empty title"
      className={classNames(
        'block w-full text-lg font-medium border-none outline-none bg-transparent cursor-grab',
        {
          'text-muted-foreground': !title,
          'cursor-text nodrag': isEditing
        }
      )}
      value={title}

    />
  );
};
