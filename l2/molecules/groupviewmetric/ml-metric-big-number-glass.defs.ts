/// <mls fileReference="_102055_/l2/molecules/groupviewmetric/ml-metric-big-number-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupViewMetric';
export const skill = `# Metadata
- TagName: groupviewmetric--ml-metric-big-number-glass

# Objective
A single prominent metric in the Glassmorphism model. Same contract/logic as groupviewmetric--ml-metric-big-number (mls-102040): it inherits that component and overrides only the appearance.

# Responsibilities
- Render Label/Value/Icon/Trend/Helper slots, with the Value at large size; color the trend by its direction attribute.
- Show a skeleton while loading; render nothing if no Value is provided; expose an accessible figure label.

# Constraints
- Display only — no interaction or value mutation.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only); appearance lives in the .less scoped to the -glass tag. Translucent surface with light text. Assumes a rich/dark background (container contract).`;
