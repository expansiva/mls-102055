/// <mls fileReference="_102055_/l2/molecules/groupnotifyuser/ml-toast-notification-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNotifyUser';
export const skill = `# Metadata
- TagName: groupnotifyuser--ml-toast-notification-glass

# Objective
A transient toast notification in the Glassmorphism model. Same contract/logic as groupnotifyuser--ml-toast-notification (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Render the toast only when visible (or while animating out); apply type-specific tint (info, success, warning, error) and a default icon.
- Render optional Title, Message, Action and Icon slots; dispatch action on Action click and dismiss on close; auto-dismiss via inherited timer.

# Constraints
- No DOM output while not visible and not animating out; dismiss button only when dismissible is true.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only; lifecycle/timers untouched). Appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
