/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-segmented-control-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSelectOne';
export const skill = `# Metadata
- TagName: groupselectone--ml-segmented-control-glass

# Objective
A single-select segmented control in the Glassmorphism model. Same contract/logic as groupselectone--ml-segmented-control (mls-102040): it inherits that component and overrides only the appearance (glass track + segments).

# Responsibilities
- Render inline segments from Item slots; roving keyboard navigation (Arrow keys, Enter/Space) over enabled segments.
- Select one segment; dispatch change ({ value }), focus and blur; render label/helper/error and a compact view mode.

# Constraints
- No selection while disabled, readonly or loading; disabled segments are not selectable.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; parsing, keyboard and events are inherited). Appearance lives in the .less scoped to the -glass tag; track uses rgba(255,255,255,0.08) + blur(10px), selected segment uses a brighter translucent fill. Assumes a rich/dark background (container contract).`;
