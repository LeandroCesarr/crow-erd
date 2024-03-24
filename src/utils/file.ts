export function createFileString(data: unknown) {
  return `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
}
