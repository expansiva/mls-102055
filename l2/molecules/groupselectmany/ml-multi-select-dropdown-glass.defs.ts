/// <mls fileReference="_102055_/l2/molecules/groupselectmany/ml-multi-select-dropdown-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectMany';
export const skill = `# Metadata
- TagName: groupselectmany--ml-multi-select-dropdown-glass

# Objective
A multi-select dropdown in the Glassmorphism model. Same contract/logic as groupselectmany--ml-multi-select-dropdown (mls-102040): it inherits that component and overrides only the appearance (trigger with chips + popover list).

# Responsibilities
- Open a popover; select/deselect multiple Items (optionally grouped); optional search; respect min/max selection; close on outside click.
- Dispatch change ({ value }) as a comma-joined list; emit focus/blur; keep a hidden input for forms.
- Show selected chips (or a count when many) on the trigger; render a view mode when not editing.

# Constraints
- No changes while disabled, readonly or loading; disabled Items and max-reached options are not selectable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; selection, parsing, search, keyboard and outside-click are inherited via a typed internals cast). Appearance lives in the .less scoped to the -glass tag; popover uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
