import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { nodeTitleSelector } from '@/store/editor';
import classNames from 'classnames';

interface ITableTitleProps {
  tableId: string;
}

export const TableTitle: FC<ITableTitleProps> = ({ tableId }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useRecoilState(nodeTitleSelector(tableId));

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <input
          ref={inputRef}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={title}
          className="text-lg font-medium border-none outline-none bg-transparent nodrag"
        />
      ) : (
        <h2
          className={classNames('text-lg font-medium', {
            'text-muted-foreground': !title,
          })}
          onDoubleClick={handleDoubleClick}
        >
          {title || 'Empty title'}
        </h2>
      )}
    </>
  );
};
