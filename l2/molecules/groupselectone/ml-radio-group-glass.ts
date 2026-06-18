/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-radio-group-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// RADIO GROUP — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupSelectOne
// Herda MlRadioGroupMolecule (mls-102040): parsing, teclado, eventos e estado
// reativo (focusedValue). Sobrescreve só render() com markup/classes glass.
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlRadioGroupMolecule } from '/_102040_/l2/molecules/groupselectone/ml-radio-group.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'No selection',
  noOptions: 'No options available',
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Nenhuma seleção',
    noOptions: 'Nenhuma opção disponível',
    loading: 'Carregando...',
  },
};
/// **collab_i18n_end**

interface ParsedItem {
  value: string;
  label: string;
  disabled: boolean;
}
interface ParsedGroup {
  label: string;
  items: ParsedItem[];
}

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem na
// instância; o cast preserva o tipo.
interface RadioGroupInternals {
  // estado reativo (@state private no pai)
  focusedValue: string | null;
  // parsing / lookup
  parseItems(): ParsedItem[];
  parseGroups(): ParsedGroup[];
  findItem(value: string | null): ParsedItem | undefined;
  // handlers
  handleSelect(item: ParsedItem): void;
  handleFocus(): void;
  handleBlur(): void;
}

@customElement('groupselectone--ml-radio-group-glass')
export class MlRadioGroupGlass extends MlRadioGroupMolecule {
  private gMsg: MessageType = messages.en;
  private gLabelId = `label-${Math.random().toString(36).slice(2, 9)}`;
  private gErrorId = `error-${Math.random().toString(36).slice(2, 9)}`;

  private get x(): RadioGroupInternals {
    return this as unknown as RadioGroupInternals;
  }

  // ===========================================================================
  // CLASSES (glass) — nomes próprios p/ não colidir com os private do pai
  // ===========================================================================
  private glassContainerClasses(): string {
    return ['flex flex-col gap-2', this.disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }
  private glassOptionClasses(item: ParsedItem): string {
    const isSelected = this.value === item.value;
    const isFocused = this.x.focusedValue === item.value;
    const hasError = this.error !== '';
    return [
      'glass-rg-option',
      'flex items-center gap-3 px-3 py-2',
      isSelected ? 'is-selected' : '',
      isFocused && !isSelected ? 'is-focused' : '',
      hasError && !isSelected ? 'is-error' : '',
      item.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
  private glassRadioClasses(item: ParsedItem): string {
    const isSelected = this.value === item.value;
    return [
      'glass-rg-radio',
      'w-4 h-4 flex items-center justify-center flex-shrink-0',
      isSelected ? 'is-selected' : '',
      item.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
  private glassTextClasses(item: ParsedItem): string {
    const isSelected = this.value === item.value;
    return [
      'glass-rg-text',
      'text-sm',
      isSelected ? 'is-selected' : '',
      item.disabled ? 'is-disabled' : '',
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
      <label id=${this.gLabelId} class="glass-rg-label text-sm">
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="glass-required ml-0.5">*</span>` : html``}
      </label>
    `;
  }
  private glassRadioIndicator(item: ParsedItem): TemplateResult {
    const isSelected = this.value === item.value;
    return html`<span class=${this.glassRadioClasses(item)}>${isSelected ? html`<span class="glass-rg-dot"></span>` : html``}</span>`;
  }
  private glassOption(item: ParsedItem): TemplateResult {
    const isSelected = this.value === item.value;
    return html`
      <div
        role="radio"
        aria-checked=${isSelected ? 'true' : 'false'}
        aria-disabled=${item.disabled || this.disabled || this.readonly || this.loading ? 'true' : 'false'}
        tabindex=${item.disabled || this.disabled || this.readonly || this.loading ? '-1' : '0'}
        class=${this.glassOptionClasses(item)}
        @click=${() => this.x.handleSelect(item)}
        @focus=${() => this.x.handleFocus()}
        @blur=${() => this.x.handleBlur()}
      >
        ${this.glassRadioIndicator(item)}
        <span class=${this.glassTextClasses(item)}>${unsafeHTML(item.label)}</span>
      </div>
    `;
  }
  private glassGroup(group: ParsedGroup): TemplateResult {
    if (group.items.length === 0) return html``;
    return html`
      <div class="flex flex-col gap-1">
        <span class="glass-rg-group-label text-xs font-semibold uppercase tracking-wide px-1">${group.label}</span>
        <div class="flex flex-col gap-1">${group.items.map((item) => this.glassOption(item))}</div>
      </div>
    `;
  }
  private glassRadioOptions(): TemplateResult {
    const standaloneItems = this.x.parseItems();
    const groups = this.x.parseGroups();
    const hasItems = standaloneItems.length > 0 || groups.some((g) => g.items.length > 0);
    if (!hasItems) {
      const emptyContent = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.gMsg.noOptions;
      return html`<div class="glass-rg-empty text-sm py-2">${unsafeHTML(emptyContent)}</div>`;
    }
    return html`
      <div
        role="radiogroup"
        aria-labelledby=${this.hasSlot('Label') ? this.gLabelId : ''}
        aria-required=${this.required ? 'true' : 'false'}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-describedby=${this.error ? this.gErrorId : ''}
        class="flex flex-col gap-2"
      >
        ${standaloneItems.map((item) => this.glassOption(item))} ${groups.map((group) => this.glassGroup(group))}
      </div>
    `;
  }
  private glassLoading(): TemplateResult {
    return html`
      <div class="flex items-center gap-2 py-2">
        <div class="glass-rg-spinner w-4 h-4 rounded-full animate-spin"></div>
        <span class="glass-rg-loading-text text-sm">${this.gMsg.loading}</span>
      </div>
    `;
  }
  private glassFeedback(): TemplateResult {
    if (this.error) {
      return html`<p id=${this.gErrorId} class="glass-error-text text-xs">${unsafeHTML(this.error)}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p class="glass-helper text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }
  private glassViewMode(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);
    const displayText = selectedItem ? selectedItem.label : this.placeholder || this.gMsg.placeholder;
    return html`
      <div class="flex flex-col gap-1">
        ${this.glassLabel()}
        <span class="glass-rg-view-value text-sm">${selectedItem ? unsafeHTML(displayText) : displayText}</span>
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
      <div class=${this.glassContainerClasses()}>
        ${this.glassLabel()} ${this.loading ? this.glassLoading() : this.glassRadioOptions()} ${this.glassFeedback()}
      </div>
    `;
  }
}
