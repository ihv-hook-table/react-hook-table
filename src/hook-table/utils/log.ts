export function log(label: string, value: unknown) {
  console.group(label);
  console.dir(value);
  console.groupEnd();
}
