import path from "path";
import { readFile } from "fs/promises"

export const APP_VERSION_COOKIE_NAME = "CROW-ERD-VERSION"

export async function readChangeLog() : Promise<string | undefined> {
  const filePath = path.resolve(process.cwd(), 'CHANGELOG.md');

  try {
    const file = await readFile(filePath, "utf-8");

    return file.toString();
  } catch (error) {
    return;
  }
}

export async function readLatestChangeLogVersion() : Promise<string | undefined> {
  const fileContents = await readChangeLog();

  if (!fileContents) return;

  const lines = fileContents.split('\n');

  let foundFirstVersion = '';
  let content = '';

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('## ') && foundFirstVersion) {
        break;
      }

      if (lines[i].startsWith('## ') && !foundFirstVersion) {
        foundFirstVersion = lines[i].substring(3).trim();
      }

      if (foundFirstVersion && lines[i]) {
        content += lines[i] + "\n";
      }
    }

    return content;
}