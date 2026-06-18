/// <mls fileReference="_102055_/l2/molecules/groupexpandcontent/ml-reveal-overlay-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// REVEAL OVERLAY — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupExpandContent
// Herda toda a lógica de RevealOverlayMolecule (mls-102040): estado de seções
// abertas (openSections), toggle, navegação por teclado e inicialização no
// firstUpdated. Sobrescreve apenas render() e os helpers de classe (glass).
// A lógica do pai é acessada via this.x (membros private/@state de TS são
// apagados em runtime mas existem na instância; o cast preserva o tipo).
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupexpandcontent--ml-reveal-overlay); inofensivo: usamos a tag -glass.
import { RevealOverlayMolecule } from '/_102040_/l2/molecules/groupexpandcontent/ml-reveal-overlay.js';

/// **collab_i18n_start**
const message_en = {
  reveal: 'Reveal',
  hide: 'Hide',
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
};
/// **collab_i18n_end**

// Membros private (TS) / @state do pai usados pelo render() glass. Em runtime
// existem na instância (private de TS é apagado); o cast preserva o tipo.
interface RevealOverlayInternals {
  // estado reativo (@state private no pai)
  openSections: Set<number>;
  // handlers
  handleToggle(index: number, title: string, sectionDisabled: boolean): void;
  handleHeaderKeydown(e: KeyboardEvent, index: number, title: string, sectionDisabled: boolean): void;
}

@customElement('groupexpandcontent--ml-reveal-overlay-glass')
export class MlRevealOverlayGlass extends RevealOverlayMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): RevealOverlayInternals {
    return this as unknown as RevealOverlayInternals;
  }

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassHeaderClasses(sectionDisabled: boolean): string {
    return [
      'glass-reveal-header',
      'w-full flex items-center justify-between px-4 py-3 text-sm font-medium',
      this.disabled || sectionDisabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassContainerClasses(sectionDisabled: boolean): string {
    return ['glass-reveal-container', 'relative mt-2', this.disabled || sectionDisabled ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private glassOverlayClasses(expanded: boolean, sectionDisabled: boolean): string {
    return [
      'glass-reveal-overlay',
      'absolute inset-0 flex items-center justify-center transition',
      expanded ? 'is-open' : '',
      this.disabled || sectionDisabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassActionButtonClasses(sectionDisabled: boolean): string {
    return ['glass-reveal-btn', 'px-4 py-2 text-sm font-medium', this.disabled || sectionDisabled ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassRenderLoading(): TemplateResult {
    return html`<div class="glass-reveal-loading p-4 text-sm">${this.gMsg.loading}</div>`;
  }

  private glassRenderSectionContent(content: string): TemplateResult {
    return html`<div class="glass-reveal-content relative p-4 text-sm">${unsafeHTML(content)}</div>`;
  }

  // ===========================================================================
  // RENDER (override) — lógica herdada via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;

    if (this.loading) {
      return this.glassRenderLoading();
    }

    const warning = this.hasSlot('Label') ? this.getSlotContent('Label') : '';
    const sections = this.getSlots('Section').map((el, index) => ({
      index,
      title: el.getAttribute('title') || '',
      content: el.innerHTML || '',
      sectionDisabled: el.hasAttribute('disabled'),
      expanded: x.openSections.has(index),
    }));

    return html`
      <div class="space-y-4">
        ${sections.map((section) => {
          const headerId = `g-reveal-header-${section.index}`;
          const regionId = `g-reveal-region-${section.index}`;
          const actionLabel = section.expanded
            ? `${this.gMsg.hide} ${section.title}`
            : `${this.gMsg.reveal} ${section.title}`;
          return html`
            <div>
              <button
                id=${headerId}
                class=${this.glassHeaderClasses(section.sectionDisabled)}
                role="button"
                aria-expanded=${section.expanded ? 'true' : 'false'}
                aria-controls=${regionId}
                aria-disabled=${this.disabled || section.sectionDisabled ? 'true' : 'false'}
                data-header="true"
                data-index=${section.index}
                tabindex=${this.disabled || section.sectionDisabled ? '-1' : '0'}
                @click=${() => x.handleToggle(section.index, section.title, section.sectionDisabled)}
                @keydown=${(e: KeyboardEvent) =>
                  x.handleHeaderKeydown(e, section.index, section.title, section.sectionDisabled)}
              >
                <span>${section.title}</span>
                <span class="glass-reveal-action">${actionLabel}</span>
              </button>
              ${warning
                ? html`<div class="glass-reveal-warning mt-2 px-4 py-3 text-sm">${unsafeHTML(warning)}</div>`
                : html``}
              <div id=${regionId} class=${this.glassContainerClasses(section.sectionDisabled)} role="region" aria-labelledby=${headerId}>
                ${this.glassRenderSectionContent(section.content)}
                <div class=${this.glassOverlayClasses(section.expanded, section.sectionDisabled)}>
                  <button
                    class=${this.glassActionButtonClasses(section.sectionDisabled)}
                    @click=${() => x.handleToggle(section.index, section.title, section.sectionDisabled)}
                    ?disabled=${this.disabled || section.sectionDisabled}
                  >
                    ${actionLabel}
                  </button>
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
