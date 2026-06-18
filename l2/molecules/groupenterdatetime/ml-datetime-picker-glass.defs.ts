/// <mls fileReference="_102055_/l2/molecules/groupenterdatetime/ml-datetime-picker-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterDatetime';
export const skill = `# Metadata
- TagName: groupenterdatetime--ml-datetime-picker-glass

# Objective
A glassmorphism datetime picker built by INHERITANCE: extends MlDatetimePickerMolecule (mls-102040) and overrides only render() with translucent/glass markup. All business logic (ISO parsing, month navigation, day/hour/minute selection, min/max bounds, minute step, confirm/clear, outside-click) is inherited. The value is an ISO datetime string (YYYY-MM-DDTHH:mm:ss).

# Responsibilities
- Reuse the inherited popover flow: select a day, then an hour and minute; confirm to commit.
- Render the trigger, calendar, time columns and actions with glass classes.
- Format the trigger/view locally via Intl.DateTimeFormat (own i18n map).

# Constraints
- Logic is NOT reimplemented; only the visual layer (render + glass class helpers) is overridden.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism by inheritance (mls-102055, parent mls-102040). Translucent trigger; popover uses rgba(30,27,75,0.85) + blur(18px); selected day/time in indigo; confirm button is a solid indigo accent. Assumes a rich/dark background (container contract).`;
