/// <mls fileReference="_102055_/l2/molecules/groupenterdate/ml-date-picker-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterDate';
export const skill = `# Metadata
- TagName: groupenterdate--ml-date-picker-glass

# Objective
A date picker in the Glassmorphism model. Same contract/logic as groupenterdate--ml-date-picker (mls-102040): it inherits that component and overrides only the appearance (trigger + popover calendar).

# Responsibilities
- Open a popover calendar; navigate months respecting min/max; select a day; clear; close on outside click.
- Dispatch change ({ value }), monthChange ({ year, month }), focus and blur; keep a hidden input for forms.
- Format the trigger/view via Intl.DateTimeFormat; mark today and the selected day.

# Constraints
- Dates outside min/max are disabled; no changes while disabled, readonly or loading.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; date math, navigation, range and outside-click are inherited). Appearance lives in the .less scoped to the -glass tag; calendar popover uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
