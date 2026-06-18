/// <mls fileReference="_102055_/l2/molecules/groupentertext/ml-floating-text-input-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterText';
export const skill = `# Metadata
- TagName: groupentertext--ml-floating-text-input-glass

# Objective
A text input with floating/inline label in the Glassmorphism model. Same contract/logic as groupentertext--ml-floating-text-input (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Maintain value with optional input mask (#, A, *); float the label when focused/filled; prefix/suffix; loading; read-only view.
- Dispatch input/change/focus/blur with { value }; render helper or error.

# Constraints
- No changes while disabled, readonly, loading or not editing.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only). Appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
