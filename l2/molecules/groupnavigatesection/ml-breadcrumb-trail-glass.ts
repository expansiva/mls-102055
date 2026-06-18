/// <mls fileReference="_102055_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// BREADCRUMB TRAIL — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupNavigateSection
// Herda BreadcrumbTrailMolecule (mls-102040): parse de slots Tab, valor ativo,
// overflow no mobile, click/keyboard (handleKeyDown é ligado no firstUpdated do
// pai e consulta [data-tab-button]) e estado (isOverflowOpen). Sobrescreve apenas
// render() e os helpers de aparência (glass-prefix). O i18n é refeito localmente
// (gMsg) para não depender do `msg` privado do pai.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupnavigatesection--ml-breadcrumb-trail); inofensivo: usamos a tag -glass.
import { BreadcrumbTrailMolecule } from '/_102040_/l2/molecules/groupnavigatesection/ml-breadcrumb-trail.js';

/// **collab_i18n_start**
const message_en = {
  loading: 'Loading...',
  overflow: 'More levels',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    loading: 'Carregando...',
    overflow: 'Mais níveis',
  },
};
/// **collab_i18n_end**

type ParsedTab = {
  value: string;
  title: string;
  icon: string;
  disabled: boolean;
  content: string;
  index: number;
  isLast: boolean;
};

// Membros private (TS) do pai usados pelo render() glass.
interface BreadcrumbInternals {
  isOverflowOpen: boolean;
  getTabs(): ParsedTab[];
  getActiveValue(tabs: ParsedTab[]): string | null;
  handleTabClick(tab: ParsedTab, closeOverflow?: boolean): void;
  handleOverflowToggle(): void;
}

@customElement('groupnavigatesection--ml-breadcrumb-trail-glass')
export class BreadcrumbTrailGlass extends BreadcrumbTrailMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): BreadcrumbInternals {
    return this as unknown as BreadcrumbInternals;
  }

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassTabClasses(isActive: boolean, disabled: boolean, interactive: boolean): string {
    return ['glass-bc-item', 'inline-flex items-center gap-1 px-1.5 py-0.5 text-sm whitespace-nowrap', isActive ? 'is-active' : '', interactive ? 'is-interactive' : '', disabled ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private glassDelimiterClasses(): string {
    return 'glass-bc-sep mx-1 select-none';
  }

  private glassOverflowButtonClasses(): string {
    return ['glass-bc-overflow-btn', 'inline-flex items-center px-1.5 py-0.5 text-sm whitespace-nowrap', this.disabled || this.loading ? 'is-disabled' : '']
      .filter(Boolean)
      .join(' ');
  }

  private glassPanelClasses(): string {
    return 'glass-bc-panel pt-2 text-sm';
  }

  private glassLabelClasses(): string {
    return 'glass-bc-label block text-xs font-medium mb-1';
  }

  private glassErrorClasses(): string {
    return 'glass-error-text pt-1 text-xs';
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassRenderTab(tab: ParsedTab, activeValue: string | null): TemplateResult {
    const isActive = tab.value === activeValue;
    const interactive = !tab.isLast && !tab.disabled && !this.disabled && !this.loading;
    if (tab.isLast) {
      return html`
        <span class="${this.glassTabClasses(isActive, tab.disabled, false)}" role="tab" aria-selected="${isActive}" aria-disabled="true">
          ${tab.icon ? html`<span class="text-base">${tab.icon}</span>` : ''}
          <span>${tab.title}</span>
        </span>
      `;
    }
    return html`
      <button
        class="${this.glassTabClasses(isActive, tab.disabled || this.disabled || this.loading, interactive)}"
        role="tab"
        aria-selected="${isActive}"
        aria-disabled="${tab.disabled || this.disabled || this.loading}"
        ?disabled=${tab.disabled || this.disabled || this.loading}
        data-tab-button="true"
        @click=${() => this.x.handleTabClick(tab)}
      >
        ${tab.icon ? html`<span class="text-base">${tab.icon}</span>` : ''}
        <span>${tab.title}</span>
      </button>
    `;
  }

  private glassRenderOverflowMenu(hiddenTabs: ParsedTab[], activeValue: string | null): TemplateResult {
    if (!hiddenTabs.length) return html``;
    return html`
      <div class="relative inline-flex items-center">
        <button
          class="${this.glassOverflowButtonClasses()}"
          aria-label="${this.gMsg.overflow}"
          ?disabled=${this.disabled || this.loading}
          @click=${() => this.x.handleOverflowToggle()}
        >
          ...
        </button>
        ${this.x.isOverflowOpen
          ? html`
              <div class="glass-bc-menu absolute left-0 top-full mt-1 w-48 z-10">
                <div class="p-1">
                  ${hiddenTabs.map(
                    (tab) => html`
                      <button
                        class="${this.glassTabClasses(tab.value === activeValue, tab.disabled || this.disabled || this.loading, !tab.disabled)} w-full justify-start"
                        role="tab"
                        aria-selected="${tab.value === activeValue}"
                        aria-disabled="${tab.disabled || this.disabled || this.loading}"
                        ?disabled=${tab.disabled || this.disabled || this.loading}
                        data-tab-button="true"
                        @click=${() => this.x.handleTabClick(tab, true)}
                      >
                        ${tab.icon ? html`<span class="text-base">${tab.icon}</span>` : ''}
                        <span>${tab.title}</span>
                      </button>
                    `
                  )}
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private glassRenderTrail(tabs: ParsedTab[], activeValue: string | null): TemplateResult {
    if (!tabs.length) return html``;
    const first = tabs[0];
    const last = tabs[tabs.length - 1];
    const middle = tabs.slice(1, tabs.length - 1);
    return html`
      <div class="flex items-center whitespace-nowrap" role="tablist">
        <div class="flex items-center sm:hidden">
          ${this.glassRenderTab(first, activeValue)}
          <span class="${this.glassDelimiterClasses()}">/</span>
          ${this.glassRenderOverflowMenu(middle, activeValue)}
          <span class="${this.glassDelimiterClasses()}">/</span>
          ${this.glassRenderTab(last, activeValue)}
        </div>
        <div class="hidden sm:flex items-center">
          ${tabs.map(
            (tab, index) => html`
              ${index > 0 ? html`<span class="${this.glassDelimiterClasses()}">/</span>` : ''} ${this.glassRenderTab(tab, activeValue)}
            `
          )}
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado/keyboard herdados via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;
    const tabs = x.getTabs();
    const activeValue = x.getActiveValue(tabs);
    const activeTab = tabs.find((tab) => tab.value === activeValue) || tabs[0];
    const labelContent = this.hasSlot('Label') ? this.getSlotContent('Label') : '';
    const activeContent = activeTab ? activeTab.content : '';
    return html`
      <div class="w-full">
        ${labelContent ? html`<span class="${this.glassLabelClasses()}">${unsafeHTML(labelContent)}</span>` : ''}
        <div class="relative">
          ${this.loading ? html`<div class="glass-bc-muted text-sm">${this.gMsg.loading}</div>` : this.glassRenderTrail(tabs, activeValue)}
        </div>
        <div class="${this.glassPanelClasses()}" role="tabpanel">${activeContent ? unsafeHTML(activeContent) : ''}</div>
        ${this.error ? html`<div class="${this.glassErrorClasses()}">${unsafeHTML(this.error)}</div>` : ''}
      </div>
    `;
  }
}
