import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface IUseDoubleClickInputProps {
  onChange: (val: string) => void;
}

export function useDoubleClickInput({ onChange }: IUseDoubleClickInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return {
    isEditing,
    inputProps: {
      ref: inputRef,
      onBlur: handleBlur,
      onChange: handleChange,
      readOnly: !isEditing,
      onDoubleClick: handleDoubleClick,
    },
  };
}
