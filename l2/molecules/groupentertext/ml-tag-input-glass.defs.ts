/// <mls fileReference="_102055_/l2/molecules/groupentertext/ml-tag-input-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterText';
export const skill = `# Metadata
- TagName: groupentertext--ml-tag-input-glass

# Objective
A tag/chip input in the Glassmorphism model. Same contract/logic as groupentertext--ml-tag-input (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Parse value into tags; add on Enter/comma/blur (dedup, min/max length); remove by index; optional multi-line textarea mode with counter.
- Dispatch input/change/focus/blur with { value }; render label, helper or error, loading and read-only view.

# Constraints
- Duplicate tags and out-of-range lengths rejected; no edits while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only). Frosted chips; appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
