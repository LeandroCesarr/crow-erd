import { cookies } from "next/headers";
import pgkJson from "@/../package.json";
import { APP_VERSION_COOKIE_NAME, readLatestChangeLogVersion } from "@/modules/appUpdates";

export const dynamic = 'force-dynamic'

function createNotFoundResponse() : Response {
  return new Response("Not found", {
    status: 404
  })
}

export async function GET(request: Request) {
  const cookieStore = cookies()
  const lastVersionViewed = cookieStore.get(APP_VERSION_COOKIE_NAME);

  if (lastVersionViewed && lastVersionViewed.value === pgkJson.version)
    return createNotFoundResponse();

  const fileContent = await readLatestChangeLogVersion();

  if (!fileContent)
    return createNotFoundResponse();

  cookieStore.set(APP_VERSION_COOKIE_NAME, pgkJson.version);

  return Response.json({
    content: fileContent
  })
}