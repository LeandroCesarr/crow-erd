import useSWR from 'swr'

export function useLatestUpdates() {
  const { data, error, isLoading } = useSWR("latest-version", async () => {
    const response = await fetch("/app/updates/latest");

    if (response.ok) {
      return await response.json();
    }

    throw new Error();
  })

  return {
    data,
    error,
    isLoading
  }
}