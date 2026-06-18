/// <mls fileReference="_102055_/l2/molecules/groupnavigatesection/ml-tabs-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateSection';
export const skill = `# Metadata
- TagName: groupnavigatesection--ml-tabs-glass

# Objective
An underlined tab navigation in the Glassmorphism model. Same contract/logic as groupnavigatesection--ml-tabs (mls-102040): it inherits that component and overrides only the appearance (tab list, active underline and translucent panel).

# Responsibilities
- Render each Tab slot as an underlined tab with optional icon/title; show the active tab's content in a glass panel.
- Track the active tab via value (default to first enabled); dispatch change ({ value, title }).
- Keyboard navigation (ArrowLeft/ArrowRight + Enter/Space) and roving tabindex are inherited.

# Constraints
- Disabled tabs cannot be activated; no interaction while loading or disabled.
- The component must not contain business logic; content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; parse, active-value, click and keyboard logic are inherited). Appearance lives in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
