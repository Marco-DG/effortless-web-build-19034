export type BuilderData = unknown;

export function getBuilderData(): BuilderData | null {
  try {
    const raw = localStorage.getItem("builderData");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setBuilderData(data: BuilderData) {
  try {
    localStorage.setItem("builderData", JSON.stringify(data));
  } catch {
    // ignore
  }
}
