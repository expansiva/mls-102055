/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-select-dropdown-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectOne';
export const skill = `# Metadata
- TagName: groupselectone--ml-select-dropdown-glass

# Objective
A single-select dropdown in the Glassmorphism model. Same contract/logic as groupselectone--ml-select-dropdown (mls-102040): it inherits that component and overrides only the appearance (trigger + translucent popover).

# Responsibilities
- Open a popover listbox; optionally search/filter items; select one option; close on outside click and Escape.
- Support standalone items and grouped items; keyboard navigation (ArrowUp/Down, Enter) over selectable items.
- Dispatch change ({ value }), focus and blur; render label/helper/error and a compact view mode.

# Constraints
- No selection or open while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; parsing, search, keyboard and outside-click are inherited). Appearance lives in the .less scoped to the -glass tag; popover uses rgba(30,27,75,0.55) + blur(18px). Assumes a rich/dark background (container contract).`;
