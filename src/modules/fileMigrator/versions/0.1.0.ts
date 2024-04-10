export function migrate(file: Record<string, any>): Record<string, any> {
  return {
    ...file,
    version: "0.1.0"
  }
}