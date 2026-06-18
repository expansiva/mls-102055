/// <mls fileReference="_102055_/l2/molecules/groupnotifyuser/ml-alert-modal-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNotifyUser';
export const skill = `# Metadata
- TagName: groupnotifyuser--ml-alert-modal-glass

# Objective
A centered modal alert dialog over a blurred scrim in the Glassmorphism model. Same contract/logic as groupnotifyuser--ml-alert-modal (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Render nothing when visible is false; render scrim + glass dialog when visible is true.
- Apply type-specific accent/icon (info, success, warning, error); normalize "danger" to "error".
- Render Icon/Title/Message/Action slots (with fallback message); dispatch action and dismiss custom events (bubbling, composed).
- Auto-dismiss timer and position handling inherited from the parent.

# Constraints
- The dialog must render no DOM output while visible is false; the dismiss button only appears when dismissible is true.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only). The scrim uses backdrop-filter to blur the page behind it; the dialog is a translucent glass panel. Appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
