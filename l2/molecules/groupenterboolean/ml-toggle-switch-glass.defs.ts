/// <mls fileReference="_102055_/l2/molecules/groupenterboolean/ml-toggle-switch-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterBoolean';
export const skill = `# Metadata
- TagName: groupenterboolean--ml-toggle-switch-glass

# Objective
A boolean toggle switch in the Glassmorphism model. Same contract/logic as groupenterboolean--ml-toggle-switch (mls-102040): it inherits that component and overrides only the appearance.

# Responsibilities
- Toggle a boolean value via click/Enter/Space; expose role="switch" with aria-checked.
- Dispatch change/focus/blur with { value }; render label, helper or error; provide a read-only Yes/No view.

# Constraints
- No changes while disabled or not editing.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only); appearance lives in the .less scoped to the -glass tag. Translucent track; "on" state in indigo accent. Assumes a rich/dark background (container contract).`;
