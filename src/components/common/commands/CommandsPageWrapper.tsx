import { currentDialogPageAtom } from '@/store/editor';
import React, { FC, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

interface ICommandsPageWrapperProps {
  page: string;
  children: ReactNode;
}

export const CommandsPageWrapper: FC<ICommandsPageWrapperProps> = ({
  children,
  page,
}): JSX.Element => {
  const currentPage = useRecoilValue(currentDialogPageAtom);

  return <>{currentPage === page ? children : null}</>;
};
