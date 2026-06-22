/// <mls fileReference="_102055_/l2/molecules/groupselectmany/ml-popover-multi-select-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML POPOVER MULTI SELECT — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupSelectMany
// Herda MlPopoverMultiSelectMolecule (mls-102040): seleção múltipla, parsing de
// slots, busca, navegação por teclado (activeIndex), min/max, outside-click e
// estado reativo (isOpen/searchQuery/activeIndex). Sobrescreve apenas render() +
// helpers de template com classes glass. i18n próprio (o `messages` do pai é
// const local). Mantém data-ml-item + data-index para o focusActiveItem do pai.
// This molecule does NOT contain business logic.
import { html, svg, TemplateResult, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// Importar registra a tag do pai (groupselectmany--ml-popover-multi-select); inofensivo: usamos a tag -glass.
import { MlPopoverMultiSelectMolecule } from '/_102040_/l2/molecules/groupselectmany/ml-popover-multi-select.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select options',
  noResults: 'No results found',
  loading: 'Loading...',
  search: 'Search',
  selected: 'selected',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione opções',
    noResults: 'Nenhum resultado encontrado',
    loading: 'Carregando...',
    search: 'Buscar',
    selected: 'selecionado',
  },
};
/// **collab_i18n_end**

type ItemData = {
  value: string;
  labelHtml: string;
  labelText: string;
  disabled: boolean;
  groupLabel?: string;
};
type GroupData = {
  label: string;
  items: ItemData[];
};

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem na
// instância (private de TS é apagado); o cast preserva o tipo.
interface PopoverMultiSelectInternals {
  // estado reativo (@state private no pai)
  isOpen: boolean;
  searchQuery: string;
  activeIndex: number;
  // handlers
  handleTriggerFocus(): void;
  handleTriggerBlur(): void;
  handleTriggerClick(): void;
  handleSearchInput(e: Event): void;
  handlePanelKeyDown(e: KeyboardEvent): void;
  handleItemClick(item: ItemData, isItemDisabled: boolean): void;
  openPanel(): void;
  // data prep
  collectSlotData(): { groups: GroupData[]; items: ItemData[]; allItems: ItemData[] };
  filterData(
    data: { groups: GroupData[]; items: ItemData[] },
    query: string
  ): { groups: GroupData[]; items: ItemData[] };
  getSelectionState(): {
    selectedValues: string[];
    selectedSet: Set<string>;
    selectedCount: number;
    selectionFull: boolean;
  };
  getValidationError(selectedCount: number): string;
  getItemDisabled(item: ItemData, selectionFull: boolean, selectedSet: Set<string>): boolean;
  getSelectedLabelMap(items: ItemData[]): Map<string, string>;
}

@customElement('groupselectmany--ml-popover-multi-select-glass')
export class MlPopoverMultiSelectGlass extends MlPopoverMultiSelectMolecule {
  protected portalClassName = 'glass-pms-portal';
  private gMsg: MessageType = messages.en;
  private gUid = `pms-glass-${Math.random().toString(36).slice(2)}`;
  private gLabelId = `${this.gUid}-label`;
  private gErrorId = `${this.gUid}-error`;
  private gPanelId = `${this.gUid}-panel`;

  private get x(): PopoverMultiSelectInternals {
    return this as unknown as PopoverMultiSelectInternals;
  }

  // ===========================================================================
  // CLASSES (glass)
  // ===========================================================================
  private glassTriggerClasses(hasError: boolean): string {
    return [
      'glass-pms-trigger w-full min-h-[40px] px-3 py-2 text-sm flex items-center justify-between gap-2',
      hasError ? 'is-error' : '',
      this.disabled || this.readonly || this.loading ? 'is-disabled' : '',
      this.x.isOpen ? 'is-open' : '',
    ].filter(Boolean).join(' ');
  }
  private glassItemClasses(isSelected: boolean, isDisabled: boolean): string {
    return [
      'glass-pms-item w-full px-3 py-2 text-sm flex items-center justify-between',
      isSelected ? 'is-selected' : '',
      isDisabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassLabel(): TemplateResult | typeof nothing {
    if (!this.hasSlot('Label')) return nothing;
    return html`<label id="${this.gLabelId}" class="glass-pms-label text-sm font-medium">${unsafeHTML(this.getSlotContent('Label'))}</label>`;
  }
  private glassHelper(hasError: boolean): TemplateResult | typeof nothing {
    if (hasError || !this.hasSlot('Helper')) return nothing;
    return html`<p class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
  }
  private glassError(hasError: boolean): TemplateResult | typeof nothing {
    if (!hasError) return nothing;
    const message = this.error || '';
    return html`<p id="${this.gErrorId}" class="glass-error-text mt-1 text-xs">${unsafeHTML(message)}</p>`;
  }
  private glassSelectedTag(label: string, isHtml: boolean): TemplateResult {
    return html`
      <span class="glass-pms-tag px-2 py-0.5 rounded-full text-xs">
        ${isHtml ? unsafeHTML(label) : label}
      </span>
    `;
  }
  private glassTriggerContent(selectedLabels: { label: string; isHtml: boolean }[], selectedCount: number): TemplateResult {
    if (this.loading) {
      return html`<span class="glass-pms-muted">${this.gMsg.loading}</span>`;
    }
    if (this.hasSlot('Trigger')) {
      return html`${unsafeHTML(this.getSlotContent('Trigger'))}`;
    }
    if (selectedCount === 0) {
      const placeholder = this.placeholder || this.gMsg.placeholder;
      return html`<span class="glass-pms-placeholder">${placeholder}</span>`;
    }
    const visible = selectedLabels.slice(0, 2);
    const extraCount = selectedCount - visible.length;
    return html`
      <div class="flex flex-wrap items-center gap-1">
        ${visible.map((item) => this.glassSelectedTag(item.label, item.isHtml))}
        ${extraCount > 0
          ? html`<span class="glass-pms-muted text-xs">+${extraCount}</span>`
          : nothing}
      </div>
    `;
  }
  private glassEmpty(): TemplateResult {
    const content = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.gMsg.noResults;
    return html`<div class="glass-pms-empty px-3 py-2 text-sm">${unsafeHTML(content)}</div>`;
  }
  private glassOptionButton(item: ItemData, isSelected: boolean, isDisabled: boolean, itemIndex: number): TemplateResult {
    const x = this.x;
    return html`
      <button
        type="button"
        role="option"
        aria-selected="${isSelected}"
        aria-disabled="${isDisabled}"
        class="${this.glassItemClasses(isSelected, isDisabled)}"
        ?disabled=${isDisabled}
        @mouseenter=${() => { x.activeIndex = itemIndex; }}
        @click=${() => x.handleItemClick(item, isDisabled)}
        @keydown=${(e: KeyboardEvent) => x.handlePanelKeyDown(e)}
        data-ml-item
        data-index="${itemIndex}"
      >
        <span>${unsafeHTML(item.labelHtml || item.labelText)}</span>
        ${isSelected
          ? html`<span class="glass-pms-check text-xs">✓</span>`
          : nothing}
      </button>
    `;
  }
  private glassGroup(group: GroupData, selectedSet: Set<string>, selectionFull: boolean, baseIndex: number): TemplateResult {
    const x = this.x;
    let runningIndex = baseIndex;
    return html`
      <div class="mb-2">
        ${group.label
          ? html`<div class="glass-pms-group px-3 py-1 text-xs font-semibold">${group.label}</div>`
          : nothing}
        <div class="flex flex-col gap-1">
          ${group.items.map((item) => {
            const isSelected = selectedSet.has(item.value);
            const isDisabled = x.getItemDisabled(item, selectionFull, selectedSet);
            const itemIndex = runningIndex++;
            return this.glassOptionButton(item, isSelected, isDisabled, itemIndex);
          })}
        </div>
      </div>
    `;
  }
  private glassItems(groups: GroupData[], items: ItemData[], selectedSet: Set<string>, selectionFull: boolean): TemplateResult {
    const x = this.x;
    let indexCounter = 0;
    return html`
      ${groups.map((group) => {
        const template = this.glassGroup(group, selectedSet, selectionFull, indexCounter);
        indexCounter += group.items.length;
        return template;
      })}
      ${items.length
        ? html`<div class="flex flex-col gap-1">
            ${items.map((item) => {
              const isSelected = selectedSet.has(item.value);
              const isDisabled = x.getItemDisabled(item, selectionFull, selectedSet);
              const itemIndex = indexCounter++;
              return this.glassOptionButton(item, isSelected, isDisabled, itemIndex);
            })}
          </div>`
        : nothing}
    `;
  }
  protected getPortalTemplate(): TemplateResult {
    const x = this.x;
    const slotData = x.collectSlotData();
    const filtered = x.filterData(slotData, x.searchQuery);
    const { selectedSet, selectionFull } = x.getSelectionState();
    const showEmpty = filtered.groups.length === 0 && filtered.items.length === 0;
    return html`
      <div
        class="glass-pms-panel w-full"
        role="listbox"
        aria-multiselectable="true"
        @keydown=${(e: KeyboardEvent) => x.handlePanelKeyDown(e)}
      >
        ${this.searchable
          ? html`
            <div class="glass-pms-search-row p-2">
              <input
                class="glass-pms-search w-full px-3 py-2 text-sm"
                .placeholder=${this.gMsg.search}
                value=${x.searchQuery}
                @input=${(e: Event) => x.handleSearchInput(e)}
                data-ml-search
              />
            </div>`
          : nothing}
        <div class="max-h-64 overflow-auto p-2">
          ${showEmpty ? this.glassEmpty() : this.glassItems(filtered.groups, filtered.items, selectedSet, selectionFull)}
        </div>
      </div>
    `;
  }

  private glassViewMode(selectedLabels: { label: string; isHtml: boolean }[]): TemplateResult {
    const hasSelection = selectedLabels.length > 0;
    const placeholder = this.placeholder || this.gMsg.placeholder;
    return html`
      <div class="flex flex-col gap-1">
        ${this.glassLabel()}
        <div class="glass-pms-view min-h-[40px] px-3 py-2 text-sm">
          ${hasSelection
            ? html`<div class="flex flex-wrap gap-1">
                ${selectedLabels.map((item) => this.glassSelectedTag(item.label, item.isHtml))}
              </div>`
            : html`<span class="glass-pms-placeholder">${placeholder}</span>`}
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado/teclado herdados via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    const x = this.x;
    const slotData = x.collectSlotData();
    const filtered = x.filterData(slotData, x.searchQuery);
    const { selectedValues, selectedSet, selectedCount, selectionFull } = x.getSelectionState();
    const hasError = this.isEditing ? Boolean(x.getValidationError(selectedCount)) : false;
    const labelMap = x.getSelectedLabelMap(slotData.allItems);
    const selectedLabels = selectedValues.map((val) => {
      const label = labelMap.get(val);
      if (label) {
        return { label, isHtml: true };
      }
      return { label: val, isHtml: false };
    });
    if (!this.isEditing) {
      return this.glassViewMode(selectedLabels);
    }
    const triggerClasses = this.glassTriggerClasses(hasError);
    return html`
      <div class="w-full" role="group">
        <div class="flex items-start gap-3">
          ${this.glassLabel()}
          <div class="relative flex-1">
            <button
              id="${this.name || this.gPanelId}"
              type="button"
              class="${triggerClasses}"
              role="combobox"
              aria-expanded="${x.isOpen}"
              aria-haspopup="listbox"
              aria-controls="${this.gPanelId}"
              aria-labelledby="${this.hasSlot('Label') ? this.gLabelId : ''}"
              aria-invalid="${hasError}"
              aria-required="${this.required}"
              ?disabled=${this.disabled || this.readonly || this.loading}
              @focus=${() => x.handleTriggerFocus()}
              @blur=${() => x.handleTriggerBlur()}
              @click=${() => x.handleTriggerClick()}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  x.openPanel();
                }
              }}
            >
              <div class="flex-1 flex items-center gap-2">
                ${this.glassTriggerContent(selectedLabels, selectedCount)}
              </div>
              <span class="glass-pms-chevron">
                <svg viewBox="0 0 20 20" class="w-4 h-4" aria-hidden="true">
                  ${svg`<path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>`}
                </svg>
              </span>
            </button>
          </div>
        </div>
        ${this.glassError(hasError)}
        ${this.glassHelper(hasError)}
      </div>
    `;
  }
}
