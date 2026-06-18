/// <mls fileReference="_102055_/l2/molecules/groupshowprogress/ml-circular-progress-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupShowProgress';
export const skill = `# Metadata
- TagName: groupshowprogress--ml-circular-progress-glass

# Objective
A circular (ring) progress indicator in the Glassmorphism model. Same contract/logic as groupshowprogress--ml-circular-progress (mls-102040): it inherits that component and overrides only the appearance.

# Responsibilities
- Compute the SVG dash offset from the clamped value or spin the arc when indeterminate.
- Apply size classes; optionally render the centered rounded percentage; expose progressbar ARIA when determinate.

# Constraints
- Display only — no interaction or value mutation.
- The component must not contain business logic.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only); appearance lives in the .less scoped to the -glass tag. Translucent ring track with a glowing arc. Assumes a rich/dark background (container contract).`;
