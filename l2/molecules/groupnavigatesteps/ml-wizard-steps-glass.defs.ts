/// <mls fileReference="_102055_/l2/molecules/groupnavigatesteps/ml-wizard-steps-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateSteps';
export const skill = `# Metadata
- TagName: groupnavigatesteps--ml-wizard-steps-glass

# Objective
A wizard step navigator in the Glassmorphism model. Same contract/logic as groupnavigatesteps--ml-wizard-steps (mls-102040): it inherits that component and overrides only the appearance (frosted step cards with index/check indicator).

# Responsibilities
- Parse Step slots (title/description/completed/disabled); highlight the active and completed steps.
- Enforce linear navigation (can only reach the next step when the current is completed) and skip disabled steps.
- Dispatch change with { value, title } on navigation; support arrow/Enter/Space keyboard control.

# Constraints
- In linear mode forward navigation requires the current step to be completed; disabled steps are not navigable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; parsing, navigation rules, keyboard and reactive state are inherited). Appearance lives in the .less scoped to the -glass tag; frosted step cards, active is indigo, completed is emerald. Assumes a rich/dark background (container contract).`;
