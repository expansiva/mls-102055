/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-combobox-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectOne';
export const skill = `# Metadata
- TagName: groupselectone--ml-combobox-glass

# Objective
A combobox (typeahead select) in the Glassmorphism model. Same contract/logic as groupselectone--ml-combobox (mls-102040): it inherits that component and overrides only the appearance (translucent input + frosted popover).

# Responsibilities
- Filter Item/Group options as the user types; navigate with the keyboard; select an option; optional free-text; optional clear button; close on outside click.
- Dispatch input ({ value }), change ({ value }), focus and blur; keep a hidden input for forms.

# Constraints
- No changes while disabled, readonly or loading; disabled options are not selectable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; parsing, filtering, keyboard navigation, free-text and outside-click are inherited). Appearance lives in the .less scoped to the -glass tag; popover uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
