/// <mls fileReference="_102055_/l2/molecules/groupnotifyuser/ml-notify-banner-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupNotifyUser';
export const skill = `# Metadata
- TagName: groupnotifyuser--ml-notify-banner-glass

# Objective
A contextual inline or floating notification banner in the Glassmorphism model. Same contract/logic as groupnotifyuser--ml-notify-banner (mls-102040): inherits it and overrides only the appearance.

# Responsibilities
- Render only when visible is true; nothing when false. Apply type-specific tint/icon (info, success, warning, error).
- Render optional Title/Action/Icon slots and the Message slot (fallback text when absent); dispatch action/dismiss custom events (bubbling, composed).
- Show a dismiss button when dismissible; auto-dismiss via inherited timer when visible and duration > 0; apply position classes.

# Constraints
- No DOM output while visible is false; dismiss button only when dismissible is true.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Inheritance from mls-102040 (override of render() only; lifecycle/timers untouched). Appearance in the .less scoped to the -glass tag. Assumes a rich/dark background (container contract).`;
