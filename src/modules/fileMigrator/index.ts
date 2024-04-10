import { TFile } from "@/@types/nodes";
import { lt as semverLt } from "semver";
import { INITIAL_VERSION, VERSIONS } from "./versions";

export function migrateFile(file: Record<string, any>) : TFile {

  const fileVersion = file?.version ?? INITIAL_VERSION;

  try {
    if (!fileVersion) throw new Error();

    return Object
      .entries(VERSIONS)
      .filter(([version]) => semverLt(fileVersion, version))
      .reduce((acc, [_, migrator]) => migrator(acc), file) as TFile

  } catch (error) {
    throw new Error("Error on migrate file to latest version")
  }
}