/// <mls fileReference="_102055_/l2/molecules/groupnavigatemain/ml-sidebar-nav-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNavigateMain';
export const skill = `# Metadata
- TagName: groupnavigatemain--ml-sidebar-nav-glass

# Objective
A primary application sidebar navigation in the Glassmorphism model. Same contract/logic as groupnavigatemain--ml-sidebar-nav (mls-102040): it inherits that component and overrides only the appearance (translucent glass surface, items, groups and footer).

# Responsibilities
- Render top-level Item slots, grouped Items inside Group slots (with collapsible group headers), and Footer Items.
- Each item shows an icon (or initials fallback), label, and optional badge.
- Track the active item via value; dispatch a change event (value, label, badge) when an enabled item is clicked.
- Toggle a collapsed (icon-only) mode and dispatch a collapse event; show tooltips and a badge dot when collapsed.
- Collapse/expand individual groups; show a loading skeleton.

# Constraints
- Disabled items do not trigger change events; no interaction while disabled.
- The component must not contain business logic; slot content/icons are rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() and presentational helpers only; slot parsing, collapsed-group state and click/collapse handlers are inherited). Appearance lives in the .less scoped to the -glass tag; the sidebar surface and items are translucent glass and the active item uses an indigo tint. Assumes a rich/dark background (container contract).`;
