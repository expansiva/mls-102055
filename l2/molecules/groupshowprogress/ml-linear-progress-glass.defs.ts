/// <mls fileReference="_102055_/l2/molecules/groupshowprogress/ml-linear-progress-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupShowProgress';
export const skill = `# Metadata
- TagName: groupshowprogress--ml-linear-progress-glass

# Objective
A horizontal progress bar in the Glassmorphism model. Same contract/logic as groupshowprogress--ml-linear-progress (mls-102040): it inherits that component and overrides only the appearance.

# Responsibilities
- Render determinate (0–100) fill width or an indeterminate animation when value is null.
- Apply size and semantic variant styling; optionally show the rounded percentage; expose progressbar ARIA.

# Constraints
- Display only — no interaction or value mutation.
- The component must not contain business logic.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only); appearance lives in the .less scoped to the -glass tag. Translucent track with a luminous gradient fill. Assumes a rich/dark background (container contract).`;
