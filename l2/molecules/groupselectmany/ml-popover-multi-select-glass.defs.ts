/// <mls fileReference="_102055_/l2/molecules/groupselectmany/ml-popover-multi-select-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectMany';
export const skill = `# Metadata
- TagName: groupselectmany--ml-popover-multi-select-glass

# Objective
A popover multi-select in the Glassmorphism model. Same contract/logic as groupselectmany--ml-popover-multi-select (mls-102040): it inherits that component and overrides only the appearance (trigger with chips + frosted popover with keyboard navigation).

# Responsibilities
- Open a popover; select/deselect multiple Items (optionally grouped); optional search; respect min/max selection; navigate options with arrow keys and toggle with Enter/Space; close on Escape/outside click.
- Dispatch change ({ value }) as a comma-joined list; emit focus/blur.
- Show up to two selected chips plus a +N counter on the trigger; render a view mode when not editing.

# Constraints
- No changes while disabled, readonly or loading; disabled Items and max-reached options are not selectable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; selection, parsing, search, keyboard activeIndex and outside-click are inherited via a typed internals cast). Option buttons keep data-ml-item + data-index so the inherited focusActiveItem keyboard nav works. Appearance lives in the .less scoped to the -glass tag; popover uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
