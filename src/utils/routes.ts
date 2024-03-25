export function populateRouteParams(
  url: string,
  params: Record<string, string>
): string {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`[${key}]`, value),
    url
  );
}
