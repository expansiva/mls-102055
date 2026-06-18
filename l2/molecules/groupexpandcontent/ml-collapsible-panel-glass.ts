/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/ml-collapsible-panel-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// COLLAPSIBLE PANEL — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupExpandContent
// Herda toda a lógica de MlCollapsiblePanelMolecule (mls-102040): estado das
// seções abertas (openSections), toggle, navegação por teclado e parsing dos
// slots Section. Sobrescreve apenas render() + helpers glass-*. Os membros
// private/@state do pai são acessados via cast tipado (this.x).
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupexpandcontent--ml-collapsible-panel); inofensivo: usamos a tag -glass.
import { MlCollapsiblePanelMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-collapsible-panel.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
};
/// **collab_i18n_end**

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype/instância (private de TS é apagado); o cast preserva o tipo.
interface CollapsiblePanelInternals {
  // estado reativo (@state private no pai)
  openSections: Set<number>;
  // helpers e handlers (private no pai)
  msg: MessageType;
  handleHeaderClick(index: number): void;
  handleHeaderKeydown(event: KeyboardEvent, index: number): void;
  getSectionContent(el: Element): string;
}

@customElement('groupexpandcontent--ml-collapsible-panel-glass')
export class MlCollapsiblePanelGlass extends MlCollapsiblePanelMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): CollapsiblePanelInternals {
    return this as unknown as CollapsiblePanelInternals;
  }

  // ===========================================================================
  // RENDER (override) — lógica herdada via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    return html`
      <div class="w-full">
        ${this.glassLabel()}
        ${this.loading ? this.glassLoading() : this.glassSections()}
      </div>
    `;
  }

  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div class="glass-clp-label mb-2 text-sm font-medium">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private glassLoading(): TemplateResult {
    const items = [0, 1, 2];
    return html`
      <div class="space-y-2" aria-busy="true" aria-live="polite">
        ${items.map(() => html`<div class="glass-clp-skel h-12 w-full animate-pulse"></div>`)}
        <div class="sr-only">${this.gMsg.loading}</div>
      </div>
    `;
  }

  private glassSections(): TemplateResult {
    const sections = this.getSlots('Section');
    return html`
      <div class="space-y-2">
        ${sections.map((el, index) => {
          const title = el.getAttribute('title') || '';
          const subtitle = el.getAttribute('subtitle') || '';
          const icon = el.getAttribute('icon') || '';
          const isDisabled = this.disabled || el.hasAttribute('disabled');
          const isOpen = this.x.openSections.has(index);
          const headerId = `${this.localName}-header-${index}`;
          const contentId = `${this.localName}-content-${index}`;

          return html`
            <div class="glass-clp-section w-full ${isOpen ? 'is-open' : ''}">
              <div
                id=${headerId}
                role="button"
                tabindex=${isDisabled ? -1 : 0}
                aria-expanded=${isOpen ? 'true' : 'false'}
                aria-disabled=${isDisabled ? 'true' : 'false'}
                data-header="true"
                class=${this.glassHeaderClasses(isOpen, isDisabled)}
                @click=${() => this.x.handleHeaderClick(index)}
                @keydown=${(e: KeyboardEvent) => this.x.handleHeaderKeydown(e, index)}
              >
                <div class="flex items-center gap-3">
                  ${icon ? html`<span class="glass-clp-icon">${unsafeHTML(icon)}</span>` : html``}
                  <div class="flex flex-col">
                    <span class="glass-clp-title text-sm font-medium">${title}</span>
                    ${subtitle ? html`<span class="glass-clp-subtitle text-xs">${subtitle}</span>` : html``}
                  </div>
                </div>
                <span class=${this.glassChevronClasses(isOpen)} aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" class="h-4 w-4">
                    ${svg`<path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`}
                  </svg>
                </span>
              </div>
              <div id=${contentId} role="region" aria-labelledby=${headerId} class=${this.glassContentClasses(isOpen)}>
                <div class="glass-clp-body px-4 pb-4 pt-0 text-sm">${unsafeHTML(this.x.getSectionContent(el))}</div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private glassHeaderClasses(isOpen: boolean, isDisabled: boolean): string {
    return [
      'glass-clp-header flex w-full items-center justify-between gap-3 px-4 py-3 text-left',
      isOpen ? 'is-open' : '',
      isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private glassChevronClasses(isOpen: boolean): string {
    return ['glass-clp-chevron transition-transform', isOpen ? 'rotate-180' : 'rotate-0'].join(' ');
  }

  private glassContentClasses(isOpen: boolean): string {
    return [
      'overflow-hidden transition-all duration-300 ease-in-out',
      isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
    ].join(' ');
  }
}
