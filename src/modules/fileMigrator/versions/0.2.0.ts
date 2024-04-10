export function migrate(file: Record<string, any>): Record<string, any> {
  return {
    ...file,
    nodes: file.nodes.map((node: any) => ({
      ...node,
      data: {
        ...node.data,
        columns: node.data.columns.map(({ keyType, ...column }: any) => ({
          ...column,
          keyTypes: [column.keyType]
        }))
      }
    }))
  }
}