/// <mls fileReference="_102055_/l2/molecules/groupentertext/ml-password-strength-input-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterText';
export const skill = `# Metadata
- TagName: groupentertext--ml-password-strength-input-glass

# Objective
A password input with live strength meter and criteria checklist in the Glassmorphism model. Same contract/logic as groupentertext--ml-password-strength-input (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Maintain the password value (optional mask), toggle visibility, compute criteria/strength and render bar + checklist.
- Dispatch input/change/focus/blur with { value }; render label, helper or error, loading and masked view.

# Constraints
- maxLength limits the value; no changes while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only; mask and strength logic inherited). Appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
