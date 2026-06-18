/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/ml-accordion-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML ACCORDION — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: expand + content
// Herda toda a lógica de MlAccordionMolecule (mls-102040): estado openSections,
// toggle, navegação WAI-ARIA por teclado, evento 'toggle', inicialização por
// atributo expanded. Sobrescreve apenas render() e helpers presentacionais
// (glass*). i18n próprio (gMsg) para não depender do `msg` privado do pai.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
// Importar registra a tag do pai (groupexpandcontent--ml-accordion); inofensivo: usamos a tag -glass.
import { MlAccordionMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-accordion.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
  empty: 'No sections available',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    loading: 'Carregando...',
    empty: 'Nenhuma seção disponível',
  },
};
/// **collab_i18n_end**

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype/instância (private de TS é apagado); o cast preserva o tipo.
interface AccordionInternals {
  // estado reativo (@state private no pai)
  openSections: Set<number>;
  // handlers
  handleToggle(index: number, title: string, isDisabled: boolean): void;
  handleHeaderKeydown(event: KeyboardEvent, index: number, title: string, isDisabled: boolean): void;
  // helpers puros
  getSectionContent(el: Element): string;
}

@customElement('groupexpandcontent--ml-accordion-glass')
export class MlAccordionGlass extends MlAccordionMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): AccordionInternals {
    return this as unknown as AccordionInternals;
  }

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassHeaderClasses(isOpen: boolean, isDisabled: boolean): string {
    return [
      'glass-acc-header',
      'w-full flex items-center justify-between gap-3 px-4 py-3 text-sm',
      isOpen ? 'is-open' : '',
      this.disabled || isDisabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassContentClasses(isOpen: boolean): string {
    return [
      'glass-acc-content overflow-hidden transition-all duration-200',
      isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassChevronClasses(isOpen: boolean): string {
    return [
      'glass-acc-chevron flex items-center justify-center transition-transform duration-200',
      isOpen ? 'rotate-180 is-open' : 'rotate-0',
    ]
      .filter(Boolean)
      .join(' ');
  }

  // ===========================================================================
  // RENDER (override) — lógica herdada via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    return html`
      <div class="w-full"> ${this.glassLabel()} ${this.loading ? this.glassLoading() : this.glassSections()} </div>
    `;
  }

  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<div class="glass-acc-label">${unsafeHTML(this.getSlotContent('Label'))}</div>`;
  }

  private glassLoading(): TemplateResult {
    return html`
      <div class="space-y-2">
        <div class="glass-acc-skeleton h-10 w-full"></div>
        <div class="glass-acc-skeleton h-10 w-full"></div>
        <div class="glass-acc-muted text-xs">${this.gMsg.loading}</div>
      </div>
    `;
  }

  private glassSections(): TemplateResult {
    const sectionElements = this.getSlots('Section');
    if (sectionElements.length === 0) {
      return html`<div class="glass-acc-muted text-sm">${this.gMsg.empty}</div>`;
    }
    return html`<div class="space-y-2">${sectionElements.map((el, index) => this.glassSection(el, index))}</div>`;
  }

  private glassSection(el: Element, index: number): TemplateResult {
    const title = el.getAttribute('title') || '';
    const isDisabled = el.hasAttribute('disabled');
    const isOpen = this.x.openSections.has(index);
    const headerId = `gaccordion-header-${index}`;
    const contentId = `gaccordion-content-${index}`;
    const content = this.x.getSectionContent(el);
    return html`
      <div class="glass-acc-section">
        <div
          id=${headerId}
          data-accordion-header="true"
          role="button"
          aria-expanded=${String(isOpen)}
          aria-controls=${contentId}
          aria-disabled=${String(this.disabled || isDisabled)}
          class=${this.glassHeaderClasses(isOpen, isDisabled)}
          tabindex=${this.disabled || isDisabled ? -1 : 0}
          @click=${() => this.x.handleToggle(index, title, isDisabled)}
          @keydown=${(e: KeyboardEvent) => this.x.handleHeaderKeydown(e, index, title, isDisabled)}
        >
          <span class="truncate">${title}</span>
          <span class=${this.glassChevronClasses(isOpen)} aria-hidden="true">
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div id=${contentId} role="region" aria-labelledby=${headerId} class=${this.glassContentClasses(isOpen)}>
          <div class="glass-acc-body px-4 pb-4 pt-2 text-sm">${unsafeHTML(content)}</div>
        </div>
      </div>
    `;
  }
}
