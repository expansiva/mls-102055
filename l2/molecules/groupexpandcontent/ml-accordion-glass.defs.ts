/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/ml-accordion-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupExpandContent';
export const skill = `# Metadata
- TagName: groupexpandcontent--ml-accordion-glass

# Objective
An accordion of expand/collapse content sections in the Glassmorphism model. Same contract/logic as groupexpandcontent--ml-accordion (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Render each Section slot as a collapsible panel with a clickable header showing its title; toggle on click or keyboard.
- Support single-expand and multi-expand modes; initialize open sections from the expanded attribute.
- Dispatch a toggle event (bubbling, composed) with { index, title, expanded }; allow ArrowDown/ArrowUp navigation skipping disabled headers; activate with Enter/Space.
- Render an optional Label slot, a loading skeleton when loading, and an empty-state message when no sections exist.

# Constraints
- No toggling while the component-level disabled or loading state is active, or on a per-section disabled header (tabindex="-1").
- In single-expand mode, at most one section may be open at any time.
- The component must not contain business logic; section content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only). Appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
