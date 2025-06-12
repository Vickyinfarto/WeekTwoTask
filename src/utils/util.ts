export function validateAndLogPageTitle(actual: string, expected: string) {
  if (actual === expected) {
    console.log(`[SUCCESS] Page title validated: ${actual}`);
  } else {
    console.log(`[FAILED] Page title mismatch: ${actual}`);
  }
} 