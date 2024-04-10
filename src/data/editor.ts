import { TTableEdgeData } from '@/@types/nodes';
import { ColumnGroupEnum } from '@/enums/ColumnGroupEnum';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';
import { ColumnRelationsEnum } from '@/enums/ColumnRelationsEnum';
import { ColumnTypeEnum } from '@/enums/ColumnTypeEnum';
import { ConstraintEnum } from '@/enums/ConstraintEnum';
import { NodeTypeEnum } from '@/enums/NodeTypeEnum';
import {
  BanknotesIcon,
  BugAntIcon,
  CalendarDaysIcon,
  CodeBracketIcon,
  KeyIcon,
  VariableIcon,
} from '@heroicons/react/24/outline';
import {
  CircleIcon,
  ClockIcon,
  ComponentBooleanIcon,
  LetterCaseCapitalizeIcon,
} from '@radix-ui/react-icons';

export const DEFAULT_EDGE_DATA: TTableEdgeData = {
  sourceRelation: ColumnRelationsEnum.ONE,
  targetRelation: ColumnRelationsEnum.ONE,
};

export const CONSTRAINT_CLASSES = {
  [ConstraintEnum.CHECK]: 'bg-amber-500 hover:bg-amber-500',
  [ConstraintEnum.INDEX]: 'bg-lime-500 hover:bg-lime-500',
  [ConstraintEnum.UNIQUE]: 'bg-red-500 hover:bg-red-500',
};

type TColumnInfo = {
  group: ColumnGroupEnum,
  label: string;
  icon: any,
  hasValue: boolean
}

export const COMMAND_DIALOG_ROOT_PAGE = "ROOT";

export const COLUMNS_MAP = new Map<ColumnTypeEnum, TColumnInfo>([
  [
    ColumnTypeEnum.UUID,
    {
      group: ColumnGroupEnum.IDENTIFIER,
      label: 'UUID',
      icon: KeyIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.VARCHAR,
    {
      group: ColumnGroupEnum.STRING,
      label: 'Varchar',
      icon: LetterCaseCapitalizeIcon,
      hasValue: true,
    },
  ],
  [
    ColumnTypeEnum.CHAR,
    {
      group: ColumnGroupEnum.STRING,
      label: 'Char',
      icon: LetterCaseCapitalizeIcon,
      hasValue: true,
    },
  ],
  [
    ColumnTypeEnum.JSON,
    {
      group: ColumnGroupEnum.STRING,
      label: 'JSON',
      icon: CodeBracketIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.BOOL,
    {
      group: ColumnGroupEnum.NUMERIC,
      label: 'Boolean',
      icon: ComponentBooleanIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.BIT,
    {
      group: ColumnGroupEnum.NUMERIC,
      label: 'Bit',
      icon: CircleIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.MONEY,
    {
      group: ColumnGroupEnum.NUMERIC,
      label: 'Money',
      icon: BanknotesIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.TINY_INT,
    {
      group: ColumnGroupEnum.NUMERIC,
      label: 'Tiny int',
      icon: VariableIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.INT,
    {
      group: ColumnGroupEnum.NUMERIC,
      label: 'Int',
      icon: VariableIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.BIGINT,
    {
      group: ColumnGroupEnum.NUMERIC,
      label: 'Big int',
      icon: VariableIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.DECIMAL,
    {
      group: ColumnGroupEnum.NUMERIC,
      label: 'Decimal',
      icon: BugAntIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.DATE,
    {
      group: ColumnGroupEnum.TIME_DATE,
      label: 'Date',
      icon: CalendarDaysIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.DATE_TIME,
    {
      group: ColumnGroupEnum.TIME_DATE,
      label: 'Datetime',
      icon: CalendarDaysIcon,
      hasValue: false,
    },
  ],
  [
    ColumnTypeEnum.TIMESTAMP,
    {
      group: ColumnGroupEnum.TIME_DATE,
      label: 'Timestamp',
      icon: ClockIcon,
      hasValue: false,
    },
  ],
]);

type TGroupedColumnInfo = TColumnInfo & {
  value: ColumnTypeEnum
}

type TColumnInfoGroup = {
  label: string;
  items: TGroupedColumnInfo[]
}

export const COLUMNS_GROUP_MAP: TColumnInfoGroup[] = Object.values(
  Array.from(COLUMNS_MAP.entries()).reduce((acc, [key, info]) => {
    if (!acc[info.group]) {
      acc[info.group] = {
        label: info.group,
        items: [],
      };
    }

    acc[info.group].items.push({
      value: key,
      ...info,
    });

    return acc;
  }, {} as Record<ColumnGroupEnum,TColumnInfoGroup>)
);

export const DEFAULT_DATA = {
  version: "0.2.0",
  nodes: [
    {
      type: NodeTypeEnum.TABLE,
      id: "T1",
      position: { x: 0, y: 0 },
      data: {
        title: "Source table",
        constraints: [
          {
            id: "123",
            type: ConstraintEnum.INDEX,
            columns: ["C1"]
          },
          {
            id: "125",
            type: ConstraintEnum.UNIQUE,
            columns: ["C1", "C2"]
          }
        ],
        columns: [
          {
            id: "C1",
            name: "id",
            type: ColumnTypeEnum.UUID,
            required: true,
            keyTypes: [ColumnKeyTypeEnum.PRIMARY_KEY]
          },
          {
            id: "C2",
            name: "target_id",
            type: ColumnTypeEnum.UUID,
            required: true,
            keyTypes: [ColumnKeyTypeEnum.FOREIGN_KEY]
          }
        ]
      }
    },
    {
      type: NodeTypeEnum.TABLE,
      id: "T2",
      position: { x: 300, y: 300 },
      data: {
        title: "Target table",
        constraints: [],
        columns: [
          {
            id: "C1",
            name: "id",
            type: ColumnTypeEnum.UUID,
            required: true,
            keyTypes: [ColumnKeyTypeEnum.PRIMARY_KEY]
          },
        ]
      }
    }
  ],
  edges: []
}