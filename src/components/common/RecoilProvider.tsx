'use client';

import React, { FC, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

export const RecoilProvider: FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
