/// <mls fileReference="_102055_/l2/molecules/groupenternumber/ml-number-stepper-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterNumber';
export const skill = `# Metadata
- TagName: groupenternumber--ml-number-stepper-glass

# Objective
A numeric stepper input (with +/- buttons) in the Glassmorphism model. Same contract/logic as groupenternumber--ml-number-stepper (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Parse/format the value with locale + decimals, clamp to min/max, increment/decrement by step.
- Dispatch input/change/focus/blur with { value }; render label, prefix/suffix, helper or error, loading and read-only view.

# Constraints
- Value clamped to min/max; no changes while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only). Appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
