/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-card-selector-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectOne';
export const skill = `# Metadata
- TagName: groupselectone--ml-card-selector-glass

# Objective
A card selector (popover with a grid of selectable cards) in the Glassmorphism model. Same contract/logic as groupselectone--ml-card-selector (mls-102040): it inherits that component and overrides only the appearance (translucent trigger + frosted popover with glass cards).

# Responsibilities
- Open a popover; optionally search; render Item/Group cards; navigate with the keyboard; select a card; close on outside click.
- Dispatch change ({ value }), focus and blur; show selected/focused/disabled states.

# Constraints
- No changes while disabled or readonly; disabled cards are not selectable; the panel does not open while loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; parsing, filtering, keyboard navigation, open/close and outside-click are inherited). Appearance lives in the .less scoped to the -glass tag; popover uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
