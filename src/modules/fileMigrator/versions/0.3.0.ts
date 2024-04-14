export function migrate(file: Record<string, any>): Record<string, any> {
  return {
    ...file,
    title: ""
  }
}