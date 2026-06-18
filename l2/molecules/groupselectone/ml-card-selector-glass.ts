/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-card-selector-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CARD SELECTOR — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupSelectOne
// Herda MlCardSelectorMolecule (mls-102040): parsing de Item/Group, busca,
// navegação por teclado, abertura/fechamento de painel, outside-click e estado
// (isOpen/searchQuery/focusedIndex). Sobrescreve apenas render() + helpers
// presentacionais com classes glass. This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
// Importar registra a tag do pai (groupselectone--ml-card-selector); inofensivo: usamos a tag -glass.
import { MlCardSelectorMolecule } from '/_102040_/l2/molecules/groupselectone/ml-card-selector.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select an option',
  noResults: 'No results found',
  loading: 'Loading...',
  searchPlaceholder: 'Search...',
  noValue: '—',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione uma opção',
    noResults: 'Nenhum resultado encontrado',
    loading: 'Carregando...',
    searchPlaceholder: 'Buscar...',
    noValue: '—',
  },
};
/// **collab_i18n_end**

// =============================================================================
// TYPES (estruturais — espelham os tipos privados do pai)
// =============================================================================
interface ParsedItem {
  value: string;
  label: string;
  disabled: boolean;
  content: string;
  group?: string;
}

interface ParsedGroup {
  label: string;
  items: ParsedItem[];
}

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem no
// prototype/instância (private de TS é apagado); o cast preserva o tipo.
interface CardSelectorInternals {
  // estado reativo (@state private no pai)
  isOpen: boolean;
  searchQuery: string;
  focusedIndex: number;
  // parsers / filtros / helpers puros
  parseItems(): ParsedItem[];
  parseGroups(): ParsedGroup[];
  getFilteredItems(items: ParsedItem[]): ParsedItem[];
  getSelectableItems(): ParsedItem[];
  findItem(value: string | null): ParsedItem | undefined;
  // handlers
  handleTriggerClick(e: Event): void;
  handleSelect(value: string): void;
  handleSearchInput(e: Event): void;
}

@customElement('groupselectone--ml-card-selector-glass')
export class MlCardSelectorGlass extends MlCardSelectorMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): CardSelectorInternals {
    return this as unknown as CardSelectorInternals;
  }

  // ===========================================================================
  // CSS CLASSES (glass)
  // ===========================================================================
  private glassTriggerClasses(): string {
    const hasError = this.error !== '';
    return [
      'glass-cs-trigger w-full min-h-[44px] px-4 py-3 text-sm',
      'flex items-center justify-between gap-2',
      hasError ? 'is-error' : '',
      this.x.isOpen ? 'is-open' : '',
      this.disabled ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }

  private glassPanelClasses(): string {
    return 'glass-cs-panel absolute z-50 mt-2 w-full max-h-[400px] overflow-auto';
  }

  private glassCardClasses(item: ParsedItem, isSelected: boolean, isFocused: boolean): string {
    return [
      'glass-cs-card p-4',
      isSelected ? 'is-selected' : '',
      isFocused && !isSelected ? 'is-focused' : '',
      item.disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private glassSearchInputClasses(): string {
    return 'glass-cs-search w-full px-3 py-2 text-sm';
  }

  private glassGroupLabelClasses(): string {
    return 'glass-cs-group text-xs font-semibold uppercase tracking-wider mb-2';
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    const labelContent = this.getSlotContent('Label');
    const labelId = `label-${this.name || 'card-selector'}`;
    return html`
      <label id="${labelId}" class="glass-cs-label block text-sm font-medium mb-1.5">
        ${unsafeHTML(labelContent)}
        ${this.required ? html`<span class="glass-cs-req ml-0.5">*</span>` : html``}
      </label>
    `;
  }

  private glassTrigger(): TemplateResult {
    const x = this.x;
    const selectedItem = x.findItem(this.value);
    const placeholderText = this.placeholder || this.getSlotContent('Trigger') || this.gMsg.placeholder;
    const hasError = this.error !== '';
    const labelId = `label-${this.name || 'card-selector'}`;
    const errorId = `error-${this.name || 'card-selector'}`;

    return html`
      <button
        type="button"
        role="combobox"
        aria-expanded="${x.isOpen}"
        aria-haspopup="listbox"
        aria-labelledby="${this.hasSlot('Label') ? labelId : ''}"
        aria-describedby="${hasError ? errorId : ''}"
        aria-invalid="${hasError}"
        aria-required="${this.required}"
        ?disabled="${this.disabled}"
        class="${this.glassTriggerClasses()}"
        @click="${(e: Event) => x.handleTriggerClick(e)}"
      >
        <span class="glass-cs-value flex-1 text-left ${!selectedItem ? 'is-placeholder' : ''}">
          ${this.loading
            ? html`<span class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ${this.gMsg.loading}
              </span>`
            : selectedItem
              ? selectedItem.label
              : unsafeHTML(placeholderText)
          }
        </span>
        <svg
          class="glass-cs-chevron w-5 h-5 transition-transform ${x.isOpen ? 'rotate-180' : ''}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    `;
  }

  private glassSearch(): TemplateResult {
    if (!this.searchable) return html``;
    const x = this.x;

    return html`
      <div class="glass-cs-search-row p-3">
        <input
          type="text"
          class="${this.glassSearchInputClasses()}"
          placeholder="${this.gMsg.searchPlaceholder}"
          .value="${x.searchQuery}"
          @input="${(e: Event) => x.handleSearchInput(e)}"
        />
      </div>
    `;
  }

  private glassCard(item: ParsedItem): TemplateResult {
    const x = this.x;
    const isSelected = this.value === item.value;
    const selectableItems = x.getSelectableItems();
    const selectableIndex = selectableItems.findIndex(i => i.value === item.value);
    const isFocused = selectableIndex === x.focusedIndex;

    return html`
      <div
        role="option"
        aria-selected="${isSelected}"
        aria-disabled="${item.disabled}"
        class="${this.glassCardClasses(item, isSelected, isFocused)}"
        @click="${() => !item.disabled && x.handleSelect(item.value)}"
      >
        <div class="flex items-start gap-3">
          <div class="flex-1">
            ${unsafeHTML(item.content)}
          </div>
          ${isSelected ? html`
            <div class="flex-shrink-0">
              <svg class="glass-cs-check w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
          ` : html``}
        </div>
      </div>
    `;
  }

  private glassCardGrid(): TemplateResult {
    const x = this.x;
    const standaloneItems = x.getFilteredItems(x.parseItems());
    const groups = x.parseGroups();
    const hasItems = standaloneItems.length > 0 || groups.some(g => x.getFilteredItems(g.items).length > 0);

    if (!hasItems) {
      return this.glassEmpty();
    }

    return html`
      <div class="p-4">
        ${groups.map(group => {
          const filteredGroupItems = x.getFilteredItems(group.items);
          if (filteredGroupItems.length === 0) return html``;
          return html`
            <div class="mb-4 last:mb-0">
              <div class="${this.glassGroupLabelClasses()}">${group.label}</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                ${filteredGroupItems.map(item => this.glassCard(item))}
              </div>
            </div>
          `;
        })}
        ${standaloneItems.length > 0 ? html`
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${standaloneItems.map(item => this.glassCard(item))}
          </div>
        ` : html``}
      </div>
    `;
  }

  private glassEmpty(): TemplateResult {
    const emptyContent = this.hasSlot('Empty')
      ? this.getSlotContent('Empty')
      : this.gMsg.noResults;

    return html`
      <div class="glass-cs-empty p-8 text-center">
        ${unsafeHTML(emptyContent)}
      </div>
    `;
  }

  private glassPanel(): TemplateResult {
    if (!this.x.isOpen || this.loading) return html``;

    return html`
      <div role="listbox" class="${this.glassPanelClasses()}">
        ${this.glassSearch()}
        ${this.glassCardGrid()}
      </div>
    `;
  }

  private glassHelper(): TemplateResult {
    if (!this.hasSlot('Helper')) return html``;
    const helperContent = this.getSlotContent('Helper');
    return html`<p class="glass-helper mt-1.5 text-xs">${unsafeHTML(helperContent)}</p>`;
  }

  private glassError(): TemplateResult {
    if (!this.error) return html``;
    const errorId = `error-${this.name || 'card-selector'}`;
    return html`<p id="${errorId}" class="glass-error-text mt-1.5 text-xs">${unsafeHTML(this.error)}</p>`;
  }

  private glassFeedback(): TemplateResult {
    if (this.error) {
      return this.glassError();
    }
    return this.glassHelper();
  }

  private glassViewMode(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);
    const displayValue = selectedItem
      ? selectedItem.label
      : (this.placeholder || this.gMsg.noValue);

    return html`
      <div class="glass-cs-view text-sm">
        ${this.hasSlot('Label') ? html`
          <span class="glass-cs-view-label">
            ${unsafeHTML(this.getSlotContent('Label'))}:
          </span>
          <span class="ml-1">${displayValue}</span>
        ` : html`
          <span>${displayValue}</span>
        `}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    if (!this.isEditing) {
      return this.glassViewMode();
    }

    return html`
      <div class="relative w-full">
        ${this.glassLabel()}
        ${this.glassTrigger()}
        ${this.glassPanel()}
        ${this.glassFeedback()}
      </div>
    `;
  }
}
