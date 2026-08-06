/** Strip non-JSON values so RSC streaming never hits detached ArrayBuffer bugs (Node 22+). */
export function sanitizeForRsc<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
