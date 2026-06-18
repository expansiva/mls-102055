/// <mls fileReference="_102055_/l2/molecules/groupselectone/ml-segmented-control-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// SEGMENTED CONTROL — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupSelectOne
// Herda SegmentedControlMolecule (mls-102040): parsing, teclado, eventos e estado
// reativo (focusedIndex/parsedItems). Sobrescreve só render() com markup/classes
// glass (track + segmentos translúcidos).
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { SegmentedControlMolecule } from '/_102040_/l2/molecules/groupselectone/ml-segmented-control.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Select an option',
  noOptions: 'No options available',
  loading: 'Loading...',
};

type MessageType = typeof message_en;

const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Selecione uma opção',
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

// Membros private (TS) do pai usados pelo render() glass. Em runtime existem na
// instância; o cast preserva o tipo.
interface SegmentedControlInternals {
  // estado reativo (@state private no pai)
  parsedItems: ParsedItem[];
  // parsing / lookup
  parseItems(): void;
  findItem(value: string | null): ParsedItem | undefined;
  // handlers
  handleSelect(item: ParsedItem): void;
  handleKeyDown(e: KeyboardEvent, index: number): void;
  handleFocus(): void;
  handleBlur(): void;
}

@customElement('groupselectone--ml-segmented-control-glass')
export class SegmentedControlGlass extends SegmentedControlMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): SegmentedControlInternals {
    return this as unknown as SegmentedControlInternals;
  }

  // ===========================================================================
  // CLASSES (glass) — nomes próprios p/ não colidir com os private do pai
  // ===========================================================================
  private glassContainerClasses(): string {
    return [
      'glass-seg-track',
      'flex w-full p-1 gap-1',
      this.error ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
      this.loading ? 'is-loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassSegmentClasses(item: ParsedItem, isSelected: boolean): string {
    return [
      'glass-seg',
      'px-4 py-2 text-sm font-medium',
      isSelected ? 'is-selected' : '',
      item.disabled ? 'is-disabled' : '',
      this.readonly && !item.disabled ? 'is-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private glassLabelClasses(): string {
    return 'glass-seg-label block text-xs';
  }

  private glassHelperClasses(): string {
    return 'glass-helper mt-1.5 text-xs';
  }

  private glassErrorClasses(): string {
    return 'glass-error-text mt-1.5 text-xs';
  }

  private glassViewModeClasses(): string {
    return 'glass-seg-view-value text-sm';
  }

  // ===========================================================================
  // RENDER HELPERS (glass)
  // ===========================================================================
  private glassViewMode(): TemplateResult {
    const selectedItem = this.x.findItem(this.value);
    const displayText = selectedItem
      ? selectedItem.label
      : this.placeholder || this.getSlotContent('Trigger') || this.gMsg.placeholder;

    return html`<div class=${this.glassViewModeClasses()}>${unsafeHTML(displayText)}</div>`;
  }

  private glassEditMode(): TemplateResult {
    const labelId = `label-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const errorId = `error-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!this.error;

    return html`
      <div class="flex flex-col w-full">
        <div class="min-h-[1rem]">${this.glassLabel(labelId)}</div>
        ${this.loading ? this.glassLoading() : this.glassSegments(labelId, errorId, hasError)}
        ${this.glassFeedback(errorId, hasError)}
      </div>
    `;
  }

  private glassLabel(labelId: string): TemplateResult {
    if (!this.hasSlot('Label')) {
      return html``;
    }

    return html`
      <label id=${labelId} class=${this.glassLabelClasses()}>
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="glass-required ml-0.5">*</span>` : html``}
      </label>
    `;
  }

  private glassLoading(): TemplateResult {
    return html`
      <div class=${this.glassContainerClasses()}>
        <div class="glass-seg-loading px-4 py-2 text-sm">${this.gMsg.loading}</div>
      </div>
    `;
  }

  private glassSegments(labelId: string, errorId: string, hasError: boolean): TemplateResult {
    if (this.x.parsedItems.length === 0) {
      return this.glassEmpty();
    }

    return html`
      <div
        role="listbox"
        aria-labelledby=${this.hasSlot('Label') ? labelId : ''}
        aria-required=${this.required}
        aria-invalid=${hasError}
        aria-describedby=${hasError ? errorId : ''}
        class=${this.glassContainerClasses()}
        @focus=${() => this.x.handleFocus()}
        @blur=${() => this.x.handleBlur()}
      >
        ${this.x.parsedItems.map((item, index) => this.glassSegment(item, index))}
      </div>
    `;
  }

  private glassSegment(item: ParsedItem, index: number): TemplateResult {
    const isSelected = this.value === item.value;
    const tabIndex =
      this.disabled || this.loading || item.disabled ? -1 : isSelected || (this.value === null && index === 0) ? 0 : -1;

    return html`
      <button
        type="button"
        role="option"
        aria-selected=${isSelected}
        aria-disabled=${item.disabled}
        tabindex=${tabIndex}
        class=${this.glassSegmentClasses(item, isSelected)}
        @click=${() => this.x.handleSelect(item)}
        @keydown=${(e: KeyboardEvent) => this.x.handleKeyDown(e, index)}
        ?disabled=${this.disabled || this.loading}
      >
        ${unsafeHTML(item.label)}
      </button>
    `;
  }

  private glassEmpty(): TemplateResult {
    const emptyContent = this.hasSlot('Empty') ? this.getSlotContent('Empty') : this.gMsg.noOptions;
    return html`<div class="glass-seg-empty px-4 py-2 text-sm">${unsafeHTML(emptyContent)}</div>`;
  }

  private glassFeedback(errorId: string, hasError: boolean): TemplateResult {
    if (hasError) {
      return html`<p id=${errorId} class=${this.glassErrorClasses()}>${unsafeHTML(this.error)}</p>`;
    }

    if (this.hasSlot('Helper')) {
      return html`<p class=${this.glassHelperClasses()}>${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }

    return html``;
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado herdados via this.x
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    this.x.parseItems();

    if (!this.isEditing) {
      return this.glassViewMode();
    }

    return this.glassEditMode();
  }
}
