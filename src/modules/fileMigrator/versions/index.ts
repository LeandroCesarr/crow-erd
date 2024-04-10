import { migrate as migrate010  } from "./0.1.0";
import { migrate as migrate020  } from "./0.2.0";

export const INITIAL_VERSION = "0.0.0";

export const VERSIONS = {
  "0.1.0": migrate010,
  "0.2.0": migrate020,
}