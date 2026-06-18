/// <mls fileReference="_102055_/l2/molecules/groupentertime/ml-clock-time-picker-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupEnterTime';
export const skill = `# Metadata
- TagName: groupentertime--ml-clock-time-picker-glass

# Objective
A glassmorphism time picker built by INHERITANCE: extends ClockTimePickerMolecule (mls-102040) and overrides only render() with translucent/glass markup. All business logic (time parsing, hour→minute→second stages, 12/24h with AM/PM, minute step, min/max bounds, confirm/clear, outside-click) is inherited. The value is a time string (HH:mm or HH:mm:ss).

# Responsibilities
- Reuse the inherited popover flow: pick hour → minute → (second); toggle AM/PM in 12-hour mode; confirm to commit.
- Render the field, clock options, AM/PM toggle and actions with glass classes.
- Format the field locally via Intl.DateTimeFormat (own i18n map).

# Constraints
- Logic is NOT reimplemented; only the visual layer (render + glass class helpers) is overridden.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism by inheritance (mls-102055, parent mls-102040). Translucent field; popover uses rgba(30,27,75,0.85) + blur(18px); circular time options, selected in indigo; confirm is a solid indigo accent. Assumes a rich/dark background (container contract).`;
