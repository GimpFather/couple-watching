import camelCase from "lodash/camelCase";

export function keysToCamel<T>(obj: T): T {
   if (Array.isArray(obj)) {
      return obj.map(keysToCamel) as unknown as T;
   }

   if (obj !== null && typeof obj === "object") {
      return Object.fromEntries(Object.entries(obj).map(([k, v]) => [camelCase(k), keysToCamel(v)])) as unknown as T;
   }

   return obj;
}
