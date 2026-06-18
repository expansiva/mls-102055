/// <mls fileReference="_102055_/l2/molecules/groupnavigatesteps/ml-horizontal-stepper-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateSteps';
export const skill = `# Metadata
- TagName: groupnavigatesteps--ml-horizontal-stepper-glass

# Objective
A horizontal step indicator in the Glassmorphism model. Same contract/logic as groupnavigatesteps--ml-horizontal-stepper (mls-102040): it inherits that component and overrides only the appearance (glass circular indicators + connectors).

# Responsibilities
- Parse Step slots; mark steps before value (or flagged completed) as completed and value as active.
- Allow click/keyboard navigation respecting linear mode (only up to value+1) and disabled steps.
- Dispatch change with { value, title } on navigation; render connectors between steps.

# Constraints
- In linear mode the user cannot skip ahead beyond the next step; disabled steps are not navigable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; parsing, navigation, keyboard and reactive state are inherited). Appearance lives in the .less scoped to the -glass tag; glass circular indicators, active is indigo, completed is emerald. Assumes a rich/dark background (container contract).`;
