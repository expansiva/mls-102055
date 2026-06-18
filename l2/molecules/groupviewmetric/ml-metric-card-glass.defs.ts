/// <mls fileReference="_102055_/l2/molecules/groupviewmetric/ml-metric-card-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupViewMetric';
export const skill = `# Metadata
- TagName: groupviewmetric--ml-metric-card-glass

# Objective
A compact KPI card in the Glassmorphism model. Same contract/logic as groupviewmetric--ml-metric-card (mls-102040): it inherits that component and overrides only the appearance.

# Responsibilities
- Render Label/Value/Icon/Trend/Helper slots; color the trend badge by its direction attribute.
- Show a skeleton placeholder while loading; expose an accessible figure label from the Label slot.

# Constraints
- Display only — no interaction or value mutation.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only); appearance lives in the .less scoped to the -glass tag. Translucent card with light text; trend badge uses semantic colors. Assumes a rich/dark background (container contract).`;
