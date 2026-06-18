/// <mls fileReference="_102055_/l2/molecules/groupenternumber/ml-range-slider-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterNumber';
export const skill = `# Metadata
- TagName: groupenternumber--ml-range-slider-glass

# Objective
A dual-handle range slider in the Glassmorphism model. Same contract/logic as groupenternumber--ml-range-slider (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Render two range inputs bound to value/value-high; clamp the pair so low <= high; format with locale; prefix/suffix.
- Dispatch input/change/focus/blur with { value: { min, max } }; render label, helper or error, loading and read-only view.

# Constraints
- low must not exceed high; values clamped to min/max and rounded to decimals; no changes while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only). Translucent track/thumbs in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
