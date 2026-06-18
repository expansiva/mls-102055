/// <mls fileReference="_102055_/l2/molecules/grouptriggeraction/ml-split-button-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SPLIT BUTTON — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupTriggerAction
// Herda MlSplitButtonMolecule (mls-102040): coleta de opções secundárias, estado
// (isOpen), evento 'action' (primário e por opção), sizes, loading. Sobrescreve só
// render() + helpers presentacionais glass. Menu = popover glass. i18n próprio (gMsg).
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MlSplitButtonMolecule } from '/_102040_/l2/molecules/grouptriggeraction/ml-split-button.js';

/// **collab_i18n_start**
const message_en = {
  defaultLabel: 'Action',
  moreOptions: 'More options',
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
};
/// **collab_i18n_end**

type SecondaryItem = {
  value: string;
  label: string;
  disabled: boolean;
};

// Membros private (TS) do pai usados pelo render() glass.
interface SplitButtonInternals {
  isOpen: boolean;
  handlePrimaryClick(): void;
  handleToggleMenu(): void;
  handleOptionClick(item: SecondaryItem): void;
  collectSecondaryItems(): SecondaryItem[];
  getPrimaryLabelText(): string;
  getAriaLabel(): string;
  getSizeClasses(region: 'primary' | 'chevron'): string;
}

@customElement('grouptriggeraction--ml-split-button-glass')
export class MlSplitButtonGlass extends MlSplitButtonMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): SplitButtonInternals {
    return this as unknown as SplitButtonInternals;
  }

  // ---- helpers presentacionais (glass) ----
  private glassPrimaryClasses(): string {
    return ['glass-split-primary', 'inline-flex items-center justify-center gap-2', this.x.getSizeClasses('primary')]
      .filter(Boolean)
      .join(' ');
  }

  private glassChevronClasses(): string {
    return ['glass-split-chevron', 'inline-flex items-center justify-center', this.x.getSizeClasses('chevron')]
      .filter(Boolean)
      .join(' ');
  }

  private glassOptionClasses(item: SecondaryItem): string {
    return ['glass-split-option', 'w-full text-left px-3 py-2 text-sm', item.disabled ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private glassRenderIcon(): TemplateResult {
    if (this.loading) {
      return this.glassRenderSpinner();
    }
    if (!this.hasSlot('Icon')) return html``;
    return html`<span class="inline-flex items-center">${unsafeHTML(this.getSlotContent('Icon'))}</span>`;
  }

  private glassRenderLabel(): TemplateResult {
    const label = this.getSlotContent('Label') || this.gMsg.defaultLabel;
    return html`<span class="inline-flex items-center">${unsafeHTML(label)}</span>`;
  }

  private glassRenderSpinner(): TemplateResult {
    const sizeMap: Record<string, string> = {
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-4.5 w-4.5',
      lg: 'h-5 w-5',
    };
    const sizeClass = sizeMap[this.size] || sizeMap.md;
    return html`
      <span class="inline-flex items-center" aria-hidden="true">
        <svg class="${sizeClass} animate-spin" viewBox="0 0 24 24" fill="none">
          ${svg`<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25"></circle>`}
          ${svg`<path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>`}
        </svg>
      </span>
    `;
  }

  private glassRenderChevron(): TemplateResult {
    return html`<svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">${svg`<path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>`}</svg>`;
  }

  private glassRenderMenuOptions(items: SecondaryItem[]): TemplateResult {
    const x = this.x;
    if (!x.isOpen || items.length === 0) return html``;
    return html`
      <div class="glass-split-menu absolute right-0 top-full z-10 mt-1 min-w-full p-2">
        <div class="flex flex-col gap-1">
          ${items.map(
            (item) => html`
              <button
                type="button"
                class="${this.glassOptionClasses(item)}"
                ?disabled=${this.disabled || this.loading || item.disabled}
                aria-disabled=${this.disabled || this.loading || item.disabled ? 'true' : 'false'}
                @click=${() => x.handleOptionClick(item)}
              >
                ${unsafeHTML(item.label)}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    const items = x.collectSecondaryItems();
    const hasLabel = this.hasSlot('Label') || !!x.getPrimaryLabelText();
    const hasIcon = this.hasSlot('Icon') || this.loading;
    const ariaLabel = !hasLabel && hasIcon ? x.getAriaLabel() : undefined;
    return html`
      <div class="relative inline-flex items-stretch" role="group">
        <button
          type=${this.type}
          class="${this.glassPrimaryClasses()}"
          ?disabled=${this.disabled || this.loading}
          aria-busy=${this.loading ? 'true' : 'false'}
          aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}
          aria-label=${ariaLabel || this.gMsg.defaultLabel}
          @click=${() => x.handlePrimaryClick()}
        >
          ${this.iconPosition === 'start' ? this.glassRenderIcon() : html``} ${this.glassRenderLabel()}
          ${this.iconPosition === 'end' ? this.glassRenderIcon() : html``}
        </button>
        <button
          type="button"
          class="${this.glassChevronClasses()}"
          ?disabled=${this.disabled || this.loading}
          aria-busy=${this.loading ? 'true' : 'false'}
          aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}
          aria-label=${this.gMsg.moreOptions}
          @click=${() => x.handleToggleMenu()}
        >
          ${this.glassRenderChevron()}
        </button>
        ${this.glassRenderMenuOptions(items)}
      </div>
    `;
  }
}
