/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/ml-collapsible-panel-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupExpandContent';
export const skill = `# Metadata
- TagName: groupexpandcontent--ml-collapsible-panel-glass

# Objective
A stacked collapsible panel in the Glassmorphism model. Same contract/logic as groupexpandcontent--ml-collapsible-panel (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Parse Section slots; open initially-expanded sections; toggle on header click/Enter/Space.
- Enforce single vs multiple open mode; support ArrowUp/Down to move focus between headers.
- Dispatch toggle with { index, title, expanded }; animate content height/opacity.

# Constraints
- No toggling while disabled or loading; disabled sections cannot open.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only). Appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
