export function consoleWarning(condition: boolean, message: string) {
  if (condition) {
    console.warn(message);
  }
}
