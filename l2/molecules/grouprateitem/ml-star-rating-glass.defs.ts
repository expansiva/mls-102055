/// <mls fileReference="_102055_/l2/molecules/grouprateitem/ml-star-rating-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupRateItem';
export const skill = `# Metadata
- TagName: grouprateitem--ml-star-rating-glass

# Objective
A star rating control in the Glassmorphism model. Same contract/logic as grouprateitem--ml-star-rating (mls-102040): it inherits that component and overrides only the appearance.

# Responsibilities
- Build rating options from Item slots or min/max/step; handle click/hover/keyboard selection as a radiogroup; dispatch change/focus/blur with { value }.
- Render label, helper or error, a hidden input, and a read-only summary.

# Constraints
- No selection while disabled or readonly; required with no value marks the group invalid.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only); appearance lives in the .less scoped to the -glass tag. Translucent container; active stars glow gold. Assumes a rich/dark background (container contract).`;
