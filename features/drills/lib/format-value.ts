export function formatValue(value: unknown) {
  if (typeof value === "undefined") {
    return "undefined";
  }

  return JSON.stringify(value);
}
