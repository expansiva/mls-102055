/// <mls fileReference="_102055_/l2/molecules/groupnavigatesection/ml-navigate-pills-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NAVIGATE PILLS — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupNavigateSection
// Herda NavigatePillsMolecule (mls-102040): parse de slots Tab, índice ativo,
// click/keyboard e estado (instanceId/lastActiveIndex). Sobrescreve apenas
// render() e os helpers de aparência (glass-prefix). O i18n é refeito localmente
// (gMsg) para não depender do `msg` privado do pai.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupnavigatesection--ml-navigate-pills); inofensivo: usamos a tag -glass.
import { NavigatePillsMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-navigate-pills.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    loading: 'Carregando...',
  },
};
/// **collab_i18n_end**

interface NavigateTab {
  value: string;
  title: string;
  icon: string;
  disabled: boolean;
  content: string;
}

// Membros private (TS) do pai usados pelo render() glass.
interface NavigatePillsInternals {
  instanceId: string;
  lastActiveIndex: number;
  handleTabClick(tab: NavigateTab): void;
  handleKeyDown(e: KeyboardEvent, index: number, tabs: NavigateTab[]): void;
  getTabs(): NavigateTab[];
  getActiveIndex(tabs: NavigateTab[]): number;
}

@customElement('groupnavigatesection--ml-navigate-pills-glass')
export class NavigatePillsGlass extends NavigatePillsMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): NavigatePillsInternals {
    return this as unknown as NavigatePillsInternals;
  }

  // ===========================================================================
  // HELPERS DE APARÊNCIA (glass)
  // ===========================================================================
  private glassTabClasses(isActive: boolean, isDisabled: boolean): string {
    return ['glass-pill', 'flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap', isActive ? 'is-active' : '', isDisabled || this.disabled || this.loading ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    const labelContent = this.getSlotContent('Label');
    return html`<div class="glass-nav-label mb-2 text-sm font-semibold">${unsafeHTML(labelContent)}</div>`;
  }

  private glassLoading(): TemplateResult {
    return html`
      <div class="space-y-2">
        ${this.glassLabel()}
        <div class="glass-nav-loading flex items-center gap-2 px-4 py-3 text-sm">${this.gMsg.loading}</div>
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

    if (this.loading) {
      return this.glassLoading();
    }

    const tabs = x.getTabs();
    const activeIndex = x.getActiveIndex(tabs);
    x.lastActiveIndex = activeIndex;
    const activeTab = activeIndex >= 0 ? tabs[activeIndex] : null;

    return html`
      <div class="w-full">
        ${this.glassLabel()}
        <div
          class="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="${this.hasSlot('Label') ? this.getSlotContent('Label') : 'Navigation'}"
        >
          ${tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            const isDisabled = tab.disabled;
            const tabId = `${x.instanceId}-tab-${index}`;
            const panelId = `${x.instanceId}-panel-${index}`;
            return html`
              <button
                class="${this.glassTabClasses(isActive, isDisabled)}"
                role="tab"
                aria-selected="${isActive ? 'true' : 'false'}"
                aria-disabled="${isDisabled || this.disabled || this.loading ? 'true' : 'false'}"
                aria-controls="${panelId}"
                id="${tabId}"
                data-tab-index="${index}"
                ?disabled=${isDisabled || this.disabled || this.loading}
                @click=${() => x.handleTabClick(tab)}
                @keydown=${(e: KeyboardEvent) => x.handleKeyDown(e, index, tabs)}
              >
                ${tab.icon ? html`<span class="text-base">${unsafeHTML(tab.icon)}</span>` : html``}
                <span>${unsafeHTML(tab.title)}</span>
              </button>
            `;
          })}
        </div>
        ${activeTab
          ? html`
              <div
                class="glass-pill-panel mt-4 p-4"
                role="tabpanel"
                id="${x.instanceId}-panel-${activeIndex}"
                aria-labelledby="${x.instanceId}-tab-${activeIndex}"
              >
                ${unsafeHTML(activeTab.content)}
              </div>
            `
          : html``}
        ${this.error ? html`<p class="glass-error-text mt-2 text-xs">${unsafeHTML(this.error)}</p>` : html``}
      </div>
    `;
  }
}
