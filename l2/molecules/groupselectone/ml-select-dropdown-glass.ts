/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-select-dropdown-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SELECT DROPDOWN — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupSelectOne
// Herda MlSelectDropdownMolecule (mls-102040): parsing, busca, teclado,
// outside-click, eventos e estado reativo (isOpen/searchQuery/focusedIndex).
// Sobrescreve só render() com markup/classes glass (popover translúcido).
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlSelectDropdownMolecule } from '/_102040_/l2/molecules/groupselectone/ml-select-dropdown.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select an option',
  noResults: 'No results found',
  loading: 'Loading...',
  searchPlaceholder: 'Search...',
  noSelection: '—',
};

type MessageType = typeof message_en;

const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione uma opção',
    noResults: 'Nenhum resultado encontrado',
    loading: 'Carregando...',
    searchPlaceholder: 'Buscar...',
    noSelection: '—',
  },
};
/// **collab_i18n_end**

interface ParsedItem {
  value: string;
  label: string;
  disabled: boolean;
  group?: string;
}

interface ParsedGroup {
  label: string;
  items: ParsedItem[];
}

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem na
// instância; o cast preserva o tipo.
interface SelectDropdownInternals {
  // estado reativo (@state private no pai)
  isOpen: boolean;
  searchQuery: string;
  focusedIndex: number;
  // parsing / lookup
  parseItems(): ParsedItem[];
  parseGroups(): ParsedGroup[];
  findItem(value: string | null): ParsedItem | undefined;
  getFilteredItems(): ParsedItem[];
  getSelectableItems(): ParsedItem[];
  // handlers
  handleTriggerClick(e: Event): void;
  handleSelect(item: ParsedItem): void;
  handleSearchInput(e: Event): void;
}

@customElement('groupselectone--ml-select-dropdown-glass')
export class MlSelectDropdownGlass extends MlSelectDropdownMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): SelectDropdownInternals {
    return this as unknown as SelectDropdownInternals;
  }

  // ===========================================================================
  // CLASSES (glass) — nomes próprios p/ não colidir com os private do pai
  // ===========================================================================
  private glassTriggerClasses(): string {
    return [
      'glass-trigger',
      'w-full flex items-center justify-between gap-2 px-3 py-2 text-sm',
      this.error !== '' ? 'is-error' : '',
      this.x.isOpen ? 'is-open' : '',
      this.disabled ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassDropdownClasses(): string {
    return 'glass-dropdown absolute z-50 w-full mt-1 max-h-60 overflow-auto';
  }

  private glassItemClasses(item: ParsedItem, isSelected: boolean, isFocused: boolean): string {
    return [
      'glass-item',
      'w-full px-3 py-2 text-sm text-left',
      isSelected ? 'is-selected' : '',
      isFocused ? 'is-focused' : '',
      item.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassSearchClasses(): string {
    return 'glass-search w-full px-3 py-2 text-sm';
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;

    const labelContent = this.getSlotContent('Label');
    const labelId = `label-${this.name || 'select'}`;

    return html`
      <label id="${labelId}" class="glass-label block text-sm mb-1">
        ${unsafeHTML(labelContent)} ${this.required ? html`<span class="glass-required ml-0.5">*</span>` : html``}
      </label>
    `;
  }

  private glassTriggerContent(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);

    if (this.loading) {
      return html`
        <span class="glass-placeholder flex items-center gap-2">
          <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          ${this.gMsg.loading}
        </span>
      `;
    }

    if (selectedItem) {
      return html`<span class="truncate">${unsafeHTML(selectedItem.label)}</span>`;
    }

    if (this.hasSlot('Trigger')) {
      return html`<span class="glass-placeholder truncate">${unsafeHTML(this.getSlotContent('Trigger'))}</span>`;
    }

    const placeholderText = this.placeholder || this.gMsg.placeholder;
    return html`<span class="glass-placeholder truncate">${placeholderText}</span>`;
  }

  private glassChevron(): TemplateResult {
    const rotateClass = this.x.isOpen ? 'rotate-180' : '';
    return html`
      <svg class="glass-chevron w-4 h-4 transition-transform ${rotateClass} flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    `;
  }

  private glassTrigger(): TemplateResult {
    const hasError = this.error !== '';
    const labelId = this.hasSlot('Label') ? `label-${this.name || 'select'}` : undefined;
    const errorId = hasError ? `error-${this.name || 'select'}` : undefined;

    return html`
      <button
        type="button"
        role="combobox"
        aria-expanded="${this.x.isOpen}"
        aria-haspopup="listbox"
        aria-invalid="${hasError}"
        aria-required="${this.required}"
        aria-labelledby="${labelId || ''}"
        aria-describedby="${errorId || ''}"
        class="${this.glassTriggerClasses()}"
        ?disabled="${this.disabled}"
        @click="${(e: Event) => this.x.handleTriggerClick(e)}"
      >
        ${this.glassTriggerContent()} ${this.glassChevron()}
      </button>
    `;
  }

  private glassSearchInput(): TemplateResult {
    if (!this.searchable) return html``;

    return html`
      <div class="glass-search-wrap sticky top-0">
        <input
          type="text"
          class="${this.glassSearchClasses()}"
          placeholder="${this.gMsg.searchPlaceholder}"
          .value="${this.x.searchQuery}"
          @input="${(e: Event) => this.x.handleSearchInput(e)}"
          @click="${(e: Event) => e.stopPropagation()}"
        />
      </div>
    `;
  }

  private glassItems(): TemplateResult {
    const filteredItems = this.x.getFilteredItems();
    const selectableItems = this.x.getSelectableItems();

    if (filteredItems.length === 0) {
      return this.glassEmpty();
    }

    const groups = this.x.parseGroups();
    const standaloneItems = this.x.parseItems();

    const filteredStandalone = standaloneItems.filter((item) => {
      if (!this.searchable || !this.x.searchQuery.trim()) return true;
      return item.label.toLowerCase().includes(this.x.searchQuery.toLowerCase().trim());
    });

    const filteredGroups = groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (!this.searchable || !this.x.searchQuery.trim()) return true;
          return item.label.toLowerCase().includes(this.x.searchQuery.toLowerCase().trim());
        }),
      }))
      .filter((group) => group.items.length > 0);

    return html`
      <div role="listbox" class="py-1">
        ${filteredStandalone.map((item) => {
          const isSelected = item.value === this.value;
          const selectableIndex = selectableItems.findIndex((si) => si.value === item.value);
          const isFocused = selectableIndex === this.x.focusedIndex;

          return html`
            <button
              type="button"
              role="option"
              aria-selected="${isSelected}"
              aria-disabled="${item.disabled}"
              class="${this.glassItemClasses(item, isSelected, isFocused)}"
              @click="${() => this.x.handleSelect(item)}"
            >
              ${unsafeHTML(item.label)}
            </button>
          `;
        })}
        ${filteredGroups.map(
          (group) => html`
            <div class="pt-2 first:pt-0">
              <div class="glass-group-label px-3 py-1 text-xs font-semibold uppercase tracking-wider">${group.label}</div>
              ${group.items.map((item) => {
                const isSelected = item.value === this.value;
                const selectableIndex = selectableItems.findIndex((si) => si.value === item.value);
                const isFocused = selectableIndex === this.x.focusedIndex;

                return html`
                  <button
                    type="button"
                    role="option"
                    aria-selected="${isSelected}"
                    aria-disabled="${item.disabled}"
                    class="${this.glassItemClasses(item, isSelected, isFocused)}"
                    @click="${() => this.x.handleSelect(item)}"
                  >
                    ${unsafeHTML(item.label)}
                  </button>
                `;
              })}
            </div>
          `
        )}
      </div>
    `;
  }

  private glassEmpty(): TemplateResult {
    const emptyContent = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.gMsg.noResults;
    return html`<div class="glass-empty px-3 py-4 text-sm text-center">${unsafeHTML(emptyContent)}</div>`;
  }

  private glassDropdown(): TemplateResult {
    if (!this.x.isOpen || this.loading) return html``;
    return html`
      <div class="${this.glassDropdownClasses()}">
        <span class="glass-dropdown-highlight" aria-hidden="true"></span>
        ${this.glassSearchInput()} ${this.glassItems()}
      </div>
    `;
  }

  private glassHelper(): TemplateResult {
    if (!this.hasSlot('Helper')) return html``;
    return html`<p class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
  }

  private glassError(): TemplateResult {
    if (this.error === '') return html``;
    const errorId = `error-${this.name || 'select'}`;
    return html`<p id="${errorId}" class="glass-error-text mt-1 text-xs">${this.error}</p>`;
  }

  private glassFeedback(): TemplateResult {
    if (this.error !== '') {
      return this.glassError();
    }
    return this.glassHelper();
  }

  private glassViewMode(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);
    const displayValue = selectedItem ? selectedItem.label : this.gMsg.noSelection;

    return html`
      <div class="text-sm">
        ${this.hasSlot('Label')
          ? html`
              <span class="glass-view-label">${unsafeHTML(this.getSlotContent('Label'))}:</span>
              <span class="glass-view-value ml-1">${unsafeHTML(displayValue)}</span>
            `
          : html`<span class="glass-view-value">${unsafeHTML(displayValue)}</span>`}
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
        ${this.glassLabel()} ${this.glassTrigger()} ${this.glassDropdown()} ${this.glassFeedback()}
      </div>
    `;
  }
}
