/// <mls fileReference="_102055_/l2/molecules/grouprateitem/ml-emoji-mood-scale-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupRateItem';
export const skill = `# Metadata
- TagName: grouprateitem--ml-emoji-mood-scale-glass

# Objective
A mood/sentiment emoji scale in the Glassmorphism model. Same contract/logic as grouprateitem--ml-emoji-mood-scale (mls-102040): it inherits that component and overrides only the appearance.

# Responsibilities
- Build options from Item slots or min/max/step and render them as a radiogroup; handle click/hover/keyboard selection; dispatch change/focus/blur with { value }.
- Render label, helper or error, and a read-only summary of the chosen option.

# Constraints
- No selection while disabled or readonly; required with no value shows a validation message.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only); appearance lives in the .less scoped to the -glass tag. Frosted emoji buttons; selected/hover highlighted in indigo. Assumes a rich/dark background (container contract).`;
