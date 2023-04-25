export function isScoped(moduleName: string) {
  return /^@.+\/.+$/.test(moduleName);
}
