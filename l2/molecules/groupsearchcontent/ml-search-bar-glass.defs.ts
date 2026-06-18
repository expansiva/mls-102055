/// <mls fileReference="_102055_/l2/molecules/groupsearchcontent/ml-search-bar-glass.defs.ts" enhancement="_blank" />

// Do not change – automatically generated code.

export const group = 'groupSearchContent';
export const skill = `# Metadata
- TagName: groupsearchcontent--ml-search-bar-glass

# Objective
A search input in the Glassmorphism model. Same contract/logic as groupsearchcontent--ml-search-bar (mls-102040): it inherits that component and overrides only the appearance (translucent input + frosted suggestion panel).

# Responsibilities
- Track the query, debounce 'search' events, and dispatch 'change' on commit (Enter or suggestion click) and 'clear' when emptied.
- Render suggestions from Suggestion slots; support ArrowUp/Down/Enter/Escape and mouse selection.
- Show loading and empty states inside the suggestion panel; show label, helper or error.

# Constraints
- No interaction while disabled.
- The component must not contain business logic; slot content is rendered via unsafeHTML and not sanitized here.

# Notes
- Visual model: glassmorphism (mls-102055). Implemented by inheritance from mls-102040 (override of render() only; query/debounce/keyboard navigation and events are inherited). Appearance lives in the .less scoped to the -glass tag; suggestion panel uses rgba(30,27,75,0.85) + blur(18px). Assumes a rich/dark background (container contract).`;
