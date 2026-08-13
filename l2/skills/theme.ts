/// <mls fileReference="_102055_/l2/skills/theme.ts" enhancement="_blank"/>

// Theme skill (contract v1): themeInfo + skill (payload only) + examples.
// Procedure/template knowledge (Strategy D, migration techniques) lives in the
// agents' prompts — this file describes ONLY the theme.

export const themeInfo = {
    name: 'glass',
    suffix: '-glass',
    displayName: 'Glassmorphism',
    description: 'Translucent blurred surfaces over a rich dark backdrop, thin light borders, soft shadows, rounded corners, smooth motion, specular light edge.',
    background: {
        kind: 'dark' as 'light' | 'dark' | 'image',
        css: 'background: linear-gradient(135deg, #0f172a 0%, #312e81 45%, #7e22ce 100%);',
        note: 'Glass REQUIRES a rich/dark backdrop (gradient or image) — on white the blur is invisible. Text is light (rgba(255,255,255,x)).',
    },
};

export const skill = `
# Theme — Glassmorphism

## 1. Visual Signature

| Aspect | Value |
|---|---|
| Background | INLINE surfaces (on the dark backdrop): translucent \`rgba(255,255,255,0.04–0.16)\`. OVERLAYS over page content (modal/dialog/dropdown/popover/tooltip): OPAQUE dark \`--ml-surface-dim\` — see Canonical Rules. accents \`rgba(99,102,241,x)\` |
| Border | \`1px solid rgba(255,255,255,0.25)\` |
| Radius | \`12px\` (surfaces) / \`14px\` (popovers/panels) |
| Shadow | soft, e.g. \`0 4px 18px rgba(0,0,0,0.18)\` |
| Blur | \`backdrop-filter: blur(10px)\` surfaces, \`blur(18px)\` panels |
| Font | \`'Inter', system-ui, sans-serif\`, weight 600 |
| Transition | smooth, \`250ms ease\` |
| Extras | specular edge via \`::before\` (top/left light border) |
| Background contract | rich/dark backdrop required; light text — assume dark behind |

## 2. Tokens

Canonical values, validated in the pilot.

| Token | Glass value | Role |
|---|---|---|
| \`--ml-font-family\` | \`'Inter', system-ui, sans-serif\` | font |
| \`--ml-font-weight-medium\` | \`600\` | emphasis weight |
| \`--ml-radius-sm\` | \`12px\` | buttons/inputs |
| \`--ml-radius-md\` | \`12px\` | fields |
| \`--ml-radius-lg\` | \`14px\` | panels/popovers |
| \`--ml-border-width\` | \`1px\` | borders |
| \`--ml-outline-variant\` | \`rgba(255,255,255,0.25)\` | default border |
| \`--ml-outline-focus\` | \`rgba(199,210,254,0.9)\` | theme extra — focus border |
| \`--ml-outline-error\` | \`rgba(255,120,120,0.85)\` | theme extra — error border |
| \`--ml-primary\` | \`rgba(99,102,241,0.55)\` | primary action bg |
| \`--ml-on-primary\` | \`#ffffff\` | text on primary |
| \`--ml-surface\` | \`rgba(255,255,255,0.1)\` | field/secondary bg (some molecules use 0.14 — per-molecule token value) |
| \`--ml-surface-dim\` | \`rgba(30,27,75,0.55)\` | overlay bg (panel/popover/dropdown/tooltip/modal) |
| \`--ml-on-surface\` | \`rgba(255,255,255,0.95)\` | primary text |
| \`--ml-on-surface-muted\` | \`rgba(255,255,255,0.55)\` | secondary text |
| \`--ml-error\` | \`#ffb4ab\` (text) / \`rgba(244,63,94,0.55)\` (bg) | feedback |
| \`--ml-shadow-1\` | \`0 4px 18px rgba(0,0,0,0.18)\` | resting |
| \`--ml-shadow-2\` | \`0 6px 24px rgba(0,0,0,0.26)\` | hover |
| \`--ml-transition\` | \`250ms ease\` | theme extra — motion |
| \`--ml-focus-ring-width\` | \`3px\` | theme extra — focus ring |
| \`--ml-focus-ring-color\` | \`rgba(255,255,255,0.5)\` or \`rgba(199,210,254,0.3)\` | theme extra — focus ring |
| \`--ml-disabled-opacity\` | \`0.5\` | disabled |
| \`--ml-backdrop-blur\` | \`10px\` | theme extra — surface glass |
| \`--ml-backdrop-blur-strong\` | \`18px\` | theme extra — panel/popover glass |

## 3. Canonical CSS Rules

**Glass surface** (root interactive element — \`.ml-button\`, \`.ml-select-trigger\`, ...):
\`\`\`less
position: relative;           // anchors the ::before specular edge
overflow: hidden;             // buttons only (clips the edge)
border-radius: var(--ml-radius-sm, 12px);
border: var(--ml-border-width, 1px) solid var(--ml-outline-variant, rgba(255,255,255,0.25));
backdrop-filter: blur(var(--ml-backdrop-blur, 10px));
-webkit-backdrop-filter: blur(var(--ml-backdrop-blur, 10px));   // ALWAYS pair
box-shadow: var(--ml-shadow-1, 0 4px 18px rgba(0,0,0,0.18));
&::before {                   // specular edge — pure CSS, never markup
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  border-top: 1px solid rgba(255,255,255,0.5);
  border-left: 1px solid rgba(255,255,255,0.25);
  pointer-events: none;
}
\`\`\`

**Specular dedup**: if an old shadow already carries a top inset highlight
(\`inset 0 1px 1px rgba(255,255,255,x)\`), DROP the inset when adding the
\`::before\` — they are the same effect; keeping both doubles the glow.

**Motion stance**: smooth transitions using \`--ml-transition\` (\`250ms ease\`)
on interactive elements.

**Overlay surfaces** — ANY floating container shown OVER page content: panels/
dropdowns (\`.ml-select-panel\`), popovers, tooltips, and MODALS/DIALOGS. They must
stay READABLE regardless of what is behind them → use the OPAQUE dark surface
\`--ml-surface-dim\` (\`rgba(30,27,75,0.55)\`), NEVER the light
\`rgba(255,255,255,0.04–0.16)\` surface (invisible / illegible over content). Plus
\`--ml-radius-lg\`, \`--ml-backdrop-blur-strong\`, heavier shadow
\`0 16px 44px rgba(0,0,0,0.4)\` + inner light \`inset 0 1px 0 rgba(255,255,255,0.35)\`.
A modal/dialog also needs its scrim/backdrop dimmed (a dark veil) so the dialog reads.

**States** — style the ml-* state classes the base emits:
\`.ml-disabled\` (opacity, \`cursor: not-allowed\`, \`pointer-events: none\`),
\`.ml-select-trigger-open\`/\`-error\`, \`.ml-select-item-selected\`/\`-highlighted\`.
Exclude states from hover with \`:not(.ml-disabled)\`, \`:not(.ml-select-item-selected)\`.

**Link-like variants** (\`.ml-button-link\`): kill the glass —
\`background: transparent; border-color: transparent; backdrop-filter: none;\`
\`box-shadow: none;\` and \`&::before { display: none; }\`.

## 4. Theme Nuances

- Per-molecule surface alpha: \`--ml-surface\` is \`0.1\` by default, but some
  molecules use \`0.14\` — set it as that molecule's token value, don't
  change the table.
- One-off alphas (a unique \`0.65\`, a \`0.45\` disabled) may stay literal.
- Old dead decorations are common in copied-render variants (e.g. a
  \`display: none\` highlight layer) — delete them instead of porting.
- Migration precedence examples: an old \`radius 10px\` (vs 12px) or an old
  \`shadow 14px\` (vs 18px) WINS over the token table for that molecule's
  scope.
- \`overflow: hidden\` is for BUTTONS only (to clip the specular edge). Do NOT add
  it to larger surfaces (cards, calendars, lists, panels, modals): it clips child
  focus rings, selected halos and any overflowing decoration. The \`::before\` edge
  works without it (\`border-radius: inherit\`).
`;

export const examples = [
    { pattern: 'simple', ref: '_102055_/l2/molecules/grouptriggeraction/ml-button-standard-glass' },
    { pattern: 'portal', ref: '_102055_/l2/molecules/groupselectone/ml-select-dropdown-glass' },
];
