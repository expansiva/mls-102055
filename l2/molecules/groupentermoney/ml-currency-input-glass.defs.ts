/// <mls fileReference="_102055_/l2/molecules/groupentermoney/ml-currency-input-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterMoney';
export const skill = `# Metadata
- TagName: groupentermoney--ml-currency-input-glass

# Objective
A currency amount input in the Glassmorphism model. Same contract/logic as groupentermoney--ml-currency-input (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Parse digits as minor units (BigInt-safe), format with Intl (currency/decimal), clamp to min/max on blur.
- Dispatch input/change/focus/blur with { value }; render label, helper or error, loading overlay and read-only view.

# Constraints
- Value rounded to decimals and clamped on blur; no changes while disabled or readonly.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only). Appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
