import { ZodIssue } from "zod";

export function getErrors(issues: ZodIssue[]) {
  const errors: Record<string, string> = {};
  for (const err of issues) {
    const path = err.path.join(".");
    if (!errors[path]) {
      errors[path] = err.message;
    }
  }
  return errors;
}
