/// <mls fileReference="_102055_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateSection';
export const skill = `# Metadata
- TagName: groupnavigatesection--ml-breadcrumb-trail-glass

# Objective
A breadcrumb trail in the Glassmorphism model. Same contract/logic as groupnavigatesection--ml-breadcrumb-trail (mls-102040): it inherits that component and overrides only the appearance (translucent links + glass overflow popover).

# Responsibilities
- Render each Tab slot as a breadcrumb level with optional icon/title, separated by a delimiter; the last level is the current page (non-clickable).
- Dispatch change ({ value, title }) when an earlier, enabled level is activated; collapse middle levels into an overflow menu on small screens.
- Keyboard navigation (ArrowLeft/ArrowRight + Enter/Space) is inherited.

# Constraints
- The last level and disabled levels are not clickable; no interaction while loading or disabled.
- The component must not contain business logic; content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; parse, active-value, click, overflow toggle and keyboard logic are inherited). Appearance lives in the .less scoped to the -glass tag; overflow popover uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
