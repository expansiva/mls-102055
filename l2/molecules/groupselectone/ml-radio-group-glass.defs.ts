/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-radio-group-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectOne';
export const skill = `# Metadata
- TagName: groupselectone--ml-radio-group-glass

# Objective
A single-select radio group in the Glassmorphism model. Same contract/logic as groupselectone--ml-radio-group (mls-102040): it inherits that component and overrides only the appearance (glass option cards).

# Responsibilities
- Render selectable option cards (standalone and grouped); roving keyboard navigation (Arrow keys, Enter/Space, Escape).
- Select one option; dispatch change ({ value }), focus and blur; render label/helper/error and a compact view mode.

# Constraints
- No selection while disabled, readonly or loading; disabled items are not selectable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; parsing, keyboard and events are inherited). Appearance lives in the .less scoped to the -glass tag; option cards use rgba(255,255,255,0.08) + blur(10px), selected uses indigo tint. Assumes a rich/dark background (container contract).`;
