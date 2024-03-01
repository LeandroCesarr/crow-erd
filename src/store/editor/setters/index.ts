import { TTableColumn } from "@/@types/nodes";
import { ColumnKeyTypeEnum } from "@/enums/ColumnKeyTypeEnum";
import { Node } from "reactflow";

export function addTableColumnSetter(nodes: Node[], tableId: string, column: TTableColumn) : Node[] {
  return nodes.map((node) => {
    if (node.id == tableId) {
      return {
        ...node,
        data: {
          ...node.data,
          columns: [
            ...node.data.columns,
            column
          ]
        }
      }
    }

    return node;
  })
}

export function editTableTitleSetter(nodes: Node[], tableId: string, title: string) : Node[] {
  return nodes.map((node) => {
    if (node.id == tableId) {
      return {
        ...node,
        data: {
          ...node.data,
          title
        }
      }
    }

    return node;
  })
}

export function editColumnKeyTypeSetter(nodes: Node[], tableId: string, columnId: string, type: ColumnKeyTypeEnum | null) : Node[] {
  return nodes.map((node) => {
    if (node.id == tableId) {
      return {
        ...node,
        data: {
          ...node.data,
          columns: node.data.columns.map((column: TTableColumn) => {
            if (column.id === columnId) {
              return {
                ...column,
                keyType: type
              }
            }

            return column;
          })
        }
      }
    }

    return node;
  })
}