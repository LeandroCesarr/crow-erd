import { ColumnRelationsEnum } from '@/enums/ColumnRelationsEnum';
import React, { FC } from 'react';

export const Markers: FC = (): JSX.Element => {
  return (
    <svg width="0" height="0">
      <defs>
        <marker
          id={ColumnRelationsEnum.ZERO_ONE}
          markerWidth="12.5"
          markerHeight="12.5"
          viewBox="0 0 73 55"
          orient="auto-start-reverse"
          refX="100"
          refY="25"
        >
          <line
            x1="71.5"
            x2="71.5"
            y2="54"
            strokeWidth="5"
            className="text-gray-400 stroke-current"
          />
          <path
            d="M54.5 27C54.5 41.6269 42.4204 53.5 27.5 53.5C12.5796 53.5 0.5 41.6269 0.5 27C0.5 12.3731 12.5796 0.5 27.5 0.5C42.4204 0.5 54.5 12.3731 54.5 27Z"
            strokeWidth="5"
            className="text-gray-400 stroke-current"
            fill="none"
          />
        </marker>

        <marker
          id={ColumnRelationsEnum.ONE_ONLY_ONE}
          markerWidth="12.5"
          markerHeight="12.5"
          viewBox="0 0 17 54"
          orient="auto-start-reverse"
          refX="25"
          refY="25"
        >
          <path
            d="M16.5 0V54M0.5 0V54"
            strokeWidth="3"
            className="text-gray-400 stroke-current"
            fill="none"
          />
        </marker>

        <marker
          id={ColumnRelationsEnum.ONE}
          markerWidth="12.5"
          markerHeight="12.5"
          viewBox="-10 -10 20 20"
          orient="auto-start-reverse"
          refX="0"
          refY="0"
        >
          <polyline
            className="text-gray-400 stroke-current"
            strokeWidth="3"
            strokeLinecap="square"
            fill="none"
            points="-10,-8 -10,8"
          />
        </marker>

        <marker
          id={ColumnRelationsEnum.MANY}
          markerWidth="12.5"
          markerHeight="12.5"
          viewBox="-10 -10 20 20"
          orient="auto-start-reverse"
          refX="0"
          refY="0"
        >
          <polyline
            className="text-gray-400 stroke-current"
            strokeLinejoin="round"
            strokeLinecap="square"
            strokeWidth="1.5"
            fill="none"
            points="0,-8 -10,0 0,8"
          />
        </marker>
      </defs>
    </svg>
  );
};
