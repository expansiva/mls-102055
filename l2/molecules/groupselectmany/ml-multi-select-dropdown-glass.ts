/// <mls fileReference="_102055_/l2/molecules/groupselectmany/ml-multi-select-dropdown-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// MULTI SELECT DROPDOWN — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupSelectMany
// Herda MultiSelectDropdownMolecule (mls-102040): seleção múltipla, parsing de
// slots (Group/Item), busca, min/max, foco/teclado, outside-click e estado
// reativo (isOpen/searchQuery). Sobrescreve apenas render() + helpers de template
// com classes glass. i18n próprio (o `messages` do pai é const local).
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupselectmany--ml-multi-select-dropdown); inofensivo: usamos a tag -glass.
import { MultiSelectDropdownMolecule } from '/_102040_/l2/molecules/groupselectmany/ml-multi-select-dropdown.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select options',
  loading: 'Loading...',
  searchPlaceholder: 'Search...',
  empty: 'No options available',
  selectedCount: 'selected',
  requiredError: 'Select at least one option',
  minSelectionError: 'Select at least {min} options',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione opções',
    loading: 'Carregando...',
    searchPlaceholder: 'Buscar...',
    empty: 'Nenhuma opção disponível',
    selectedCount: 'selecionado(s)',
    requiredError: 'Selecione pelo menos uma opção',
    minSelectionError: 'Selecione pelo menos {min} opções',
  },
};
/// **collab_i18n_end**

type ParsedItem = {
  value: string;
  labelHtml: string;
  labelText: string;
  disabled: boolean;
  groupLabel?: string;
};
type ParsedGroup = {
  label: string;
  items: ParsedItem[];
};

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem na
// instância (private de TS é apagado); o cast preserva o tipo.
interface MultiSelectInternals {
  // estado reativo (@state private no pai)
  isOpen: boolean;
  searchQuery: string;
  // handlers
  handleTriggerClick(): void;
  handleTriggerKeydown(e: KeyboardEvent): void;
  handlePanelKeydown(e: KeyboardEvent): void;
  handleSearchInput(e: Event): void;
  handleOptionClick(value: string): void;
  handleFocusIn(): void;
  handleFocusOut(e: FocusEvent): void;
  // parsing / dados
  getSelectedValues(): string[];
  getGroupedItems(): ParsedGroup[];
  getUngroupedItems(): ParsedItem[];
  getAllItems(): ParsedItem[];
  getComputedError(selectedCount: number): string;
}

@customElement('groupselectmany--ml-multi-select-dropdown-glass')
export class MlMultiSelectDropdownGlass extends MultiSelectDropdownMolecule {
  private gMsg: MessageType = messages.en;
  private gUid = `msd-glass-${Math.random().toString(36).slice(2)}`;
  private gLabelId = `${this.gUid}-label`;
  private gHelperId = `${this.gUid}-helper`;
  private gErrorId = `${this.gUid}-error`;
  private gPanelId = `${this.gUid}-panel`;

  private get x(): MultiSelectInternals {
    return this as unknown as MultiSelectInternals;
  }

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassTriggerClasses(hasError: boolean): string {
    return [
      'glass-trigger',
      'w-full px-3 py-2 text-sm flex flex-wrap items-center gap-2',
      hasError ? 'is-error' : '',
      this.disabled || this.readonly || this.loading ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassItemClasses(isSelected: boolean, isDisabled: boolean): string {
    return [
      'glass-item',
      'flex w-full items-center justify-between px-3 py-2 text-sm',
      isSelected ? 'is-selected' : '',
      isDisabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`
      <label id="${this.gLabelId}" class="glass-label mb-1 block text-sm">${unsafeHTML(this.getSlotContent('Label'))}</label>
    `;
  }

  private glassHelperOrError(errorMessage: string): TemplateResult {
    if (!this.isEditing) return html``;
    if (errorMessage) {
      return html`<p id="${this.gErrorId}" class="glass-error-text mt-1 text-xs">${unsafeHTML(errorMessage)}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id="${this.gHelperId}" class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }

  private glassSelectedTags(items: ParsedItem[], selectedValues: string[]): TemplateResult {
    const selectedItems = selectedValues
      .map((value) => items.find((item) => item.value === value) || { value, labelHtml: value, labelText: value, disabled: false })
      .filter(Boolean) as ParsedItem[];
    if (selectedItems.length === 0) {
      const placeholder = this.placeholder || this.gMsg.placeholder;
      return html`<span class="glass-placeholder">${placeholder}</span>`;
    }
    if (selectedItems.length > 3) {
      return html`<span class="glass-count">${selectedItems.length} ${this.gMsg.selectedCount}</span>`;
    }
    return html`
      <div class="flex flex-wrap gap-1">
        ${selectedItems.map((item) => html`<span class="glass-tag px-2 py-0.5 text-xs">${unsafeHTML(item.labelHtml)}</span>`)}
      </div>
    `;
  }

  private glassTriggerContent(items: ParsedItem[], selectedValues: string[]): TemplateResult {
    if (this.hasSlot('Trigger')) {
      return html`${unsafeHTML(this.getSlotContent('Trigger'))}`;
    }
    return this.glassSelectedTags(items, selectedValues);
  }

  private glassOptionButton(item: ParsedItem, isSelected: boolean, isDisabled: boolean): TemplateResult {
    const x = this.x;
    return html`
      <button
        class="${this.glassItemClasses(isSelected, isDisabled)}"
        role="option"
        aria-selected="${isSelected}"
        aria-disabled="${isDisabled}"
        type="button"
        ?disabled=${isDisabled}
        @mousedown=${(e: Event) => e.preventDefault()}
        @click=${() => x.handleOptionClick(item.value)}
        .data-option=${true}
        .data-option-value=${item.value}
      >
        <span>${unsafeHTML(item.labelHtml)}</span>
        ${isSelected ? html`<span class="glass-check">✓</span>` : html``}
      </button>
    `;
  }

  private glassOptionList(groups: ParsedGroup[], items: ParsedItem[], selectedValues: string[]): TemplateResult {
    const query = this.x.searchQuery.trim().toLowerCase();
    const filterItem = (item: ParsedItem) => !query || item.labelText.toLowerCase().includes(query);
    const filteredGroups = groups
      .map((group) => ({ ...group, items: group.items.filter(filterItem) }))
      .filter((group) => group.items.length > 0);
    const filteredItems = items.filter(filterItem);
    if (!filteredGroups.length && !filteredItems.length) {
      const emptyContent = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.gMsg.empty;
      return html`<div class="glass-empty px-3 py-4 text-sm">${unsafeHTML(emptyContent)}</div>`;
    }
    const maxReached = this.maxSelection > 0 && selectedValues.length >= this.maxSelection;
    return html`
      <div class="max-h-60 overflow-auto p-2" role="listbox" aria-multiselectable="true" id="${this.gPanelId}">
        ${filteredGroups.map(
          (group) => html`
            <div class="mb-2">
              ${group.label ? html`<div class="glass-group-label px-2 py-1 text-xs font-semibold">${group.label}</div>` : html``}
              ${group.items.map((item) => {
                const isSelected = selectedValues.includes(item.value);
                const isDisabled = item.disabled || (!isSelected && maxReached);
                return this.glassOptionButton(item, isSelected, isDisabled);
              })}
            </div>
          `
        )}
        ${filteredItems.map((item) => {
          const isSelected = selectedValues.includes(item.value);
          const isDisabled = item.disabled || (!isSelected && maxReached);
          return this.glassOptionButton(item, isSelected, isDisabled);
        })}
      </div>
    `;
  }

  private glassViewMode(): TemplateResult {
    const items = this.x.getAllItems();
    const selectedValues = this.x.getSelectedValues();
    return html`
      <div class="w-full">
        ${this.glassLabel()}
        <div class="glass-view-box px-3 py-2 text-sm">${this.glassSelectedTags(items, selectedValues)}</div>
        ${this.name ? html`<input type="hidden" name="${this.name}" value="${this.value}" />` : html``}
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

    if (!this.isEditing) {
      return this.glassViewMode();
    }

    const groups = x.getGroupedItems();
    const items = x.getUngroupedItems();
    const allItems = [...groups.flatMap((g) => g.items), ...items];
    const selectedValues = x.getSelectedValues();
    const errorMessage = x.getComputedError(selectedValues.length);
    const hasError = Boolean(errorMessage);
    const describedBy = hasError ? this.gErrorId : this.hasSlot('Helper') ? this.gHelperId : undefined;
    const labelAttr = this.hasSlot('Label') ? this.gLabelId : undefined;
    const isPanelOpen = x.isOpen && !this.loading;
    return html`
      <div
        class="w-full"
        @focusin=${(e: FocusEvent) => x.handleFocusIn()}
        @focusout=${(e: FocusEvent) => x.handleFocusOut(e)}
        @keydown=${(e: KeyboardEvent) => x.handlePanelKeydown(e)}
      >
        ${this.glassLabel()}
        <div class="relative">
          <button
            class="${this.glassTriggerClasses(hasError)}"
            type="button"
            role="combobox"
            aria-expanded="${isPanelOpen}"
            aria-haspopup="listbox"
            aria-required="${this.required}"
            aria-invalid="${hasError}"
            ${labelAttr ? html`aria-labelledby="${labelAttr}"` : html`aria-label="${this.placeholder || this.gMsg.placeholder}"`}
            ${describedBy ? html`aria-describedby="${describedBy}"` : html``}
            @keydown=${(e: KeyboardEvent) => x.handleTriggerKeydown(e)}
            @click=${() => x.handleTriggerClick()}
            .data-trigger=${true}
          >
            ${this.loading
              ? html`<span class="glass-placeholder">${this.gMsg.loading}</span>`
              : this.glassTriggerContent(allItems, selectedValues)}
          </button>
          ${isPanelOpen
            ? html`
                <div class="glass-panel absolute z-20 mt-2 w-full">
                  ${this.searchable
                    ? html`
                        <div class="glass-search-wrap p-2">
                          <input
                            class="glass-search w-full px-3 py-2 text-sm"
                            type="text"
                            placeholder="${this.gMsg.searchPlaceholder}"
                            .value=${x.searchQuery}
                            @input=${(e: Event) => x.handleSearchInput(e)}
                            data-search
                          />
                        </div>
                      `
                    : html``}
                  ${this.glassOptionList(groups, items, selectedValues)}
                </div>
              `
            : html``}
        </div>
        ${this.glassHelperOrError(errorMessage)}
        ${this.name ? html`<input type="hidden" name="${this.name}" value="${this.value}" />` : html``}
      </div>
    `;
  }
}
