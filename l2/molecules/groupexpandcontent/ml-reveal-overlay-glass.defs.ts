/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/ml-reveal-overlay-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupExpandContent';
export const skill = `# Metadata
- TagName: groupexpandcontent--ml-reveal-overlay-glass

# Objective
Hide section content behind a frosted overlay with a reveal action in the Glassmorphism model. Same contract/logic as groupexpandcontent--ml-reveal-overlay (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Render each Section slot with its content covered by an overlay until revealed; toggle open/closed on header or reveal button; dispatch a toggle event (index, title, expanded).
- In single mode, revealing a section hides the previously revealed one; initialize from the expanded attribute; support Enter/Space and ArrowUp/ArrowDown navigation.
- Render an optional Label slot as a warning note; apply disabled appearance; render a loading placeholder.

# Constraints
- A disabled component or section must not toggle.
- The component must not contain business logic; section content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only). Appearance in the .less scoped to the -glass tag. The overlay uses backdrop-filter to frost the content until revealed. Assumes a rich/dark background (container contract).`;
