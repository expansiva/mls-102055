/// <mls fileReference="_102055_/l2/molecules/groupentertext/ml-tag-input-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// TAG INPUT — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupEnterText
// Herda MlTagInputMolecule (mls-102040): parsing de tags, add/remove, dedup,
// modo multilinha, estado. Sobrescreve só render().
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { MlTagInputMolecule } from '/_102040_/l2/molecules/groupentertext/ml-tag-input.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Type and press Enter to add tags',
  noValue: '—',
  removeTag: 'Remove tag',
  charactersRemaining: 'characters remaining',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Digite e pressione Enter para adicionar tags',
    noValue: '—',
    removeTag: 'Remover tag',
    charactersRemaining: 'caracteres restantes',
  },
};
/// **collab_i18n_end**

interface TagInputInternals {
  currentInput: string;
  isFocused: boolean;
  readonly tags: string[];
  readonly isInteractive: boolean;
  readonly isMultiLine: boolean;
  handleInput(e: Event): void;
  handleKeyDown(e: KeyboardEvent): void;
  handleFocus(): void;
  handleBlur(): void;
  handleContainerClick(e: Event): void;
  removeTagByIndex(index: number): void;
}

@customElement('groupentertext--ml-tag-input-glass')
export class MlTagInputGlass extends MlTagInputMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): TagInputInternals {
    return this as unknown as TagInputInternals;
  }

  private glassContainerClasses(): string {
    const hasError = this.error && this.error.length > 0;
    return [
      'glass-tag-box w-full',
      hasError ? 'is-error' : '',
      this.x.isFocused && this.x.isInteractive ? 'is-focused' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }
  private glassInputClasses(): string {
    return [
      'glass-tag-input flex-1 min-w-[120px] text-sm',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }
  private glassRemoveClasses(): string {
    return ['glass-tag-remove inline-flex items-center justify-center w-4 h-4', !this.x.isInteractive ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }

  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`
      <label class="glass-tag-label block text-sm font-medium mb-1">
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="glass-tag-req ml-0.5">*</span>` : ''}
      </label>
    `;
  }
  private glassPrefix(): TemplateResult {
    if (!this.hasSlot('Prefix')) return html``;
    return html`<span class="glass-tag-affix flex-shrink-0">${unsafeHTML(this.getSlotContent('Prefix'))}</span>`;
  }
  private glassSuffix(): TemplateResult {
    if (!this.hasSlot('Suffix')) return html``;
    return html`<span class="glass-tag-affix flex-shrink-0">${unsafeHTML(this.getSlotContent('Suffix'))}</span>`;
  }
  private glassTag(tag: string, index: number): TemplateResult {
    return html`
      <span class="glass-tag inline-flex items-center gap-1 px-2 py-1 text-sm">
        <span class="max-w-[150px] truncate">${tag}</span>
        ${this.x.isInteractive ? html`
          <button
            type="button"
            class="${this.glassRemoveClasses()}"
            @click=${(e: Event) => { e.stopPropagation(); this.x.removeTagByIndex(index); }}
            aria-label="${this.gMsg.removeTag}: ${tag}"
            ?disabled=${!this.x.isInteractive}
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        ` : ''}
      </span>
    `;
  }
  private glassTags(): TemplateResult {
    if (this.x.tags.length === 0) return html``;
    return html`${this.x.tags.map((tag, index) => this.glassTag(tag, index))}`;
  }
  private glassInput(): TemplateResult {
    const placeholderText = this.placeholder || this.gMsg.placeholder;
    return html`
      <input
        type="${this.inputType}"
        class="${this.glassInputClasses()}"
        .value=${this.x.currentInput}
        placeholder=${this.x.tags.length === 0 ? placeholderText : ''}
        ?disabled=${this.disabled || this.loading}
        ?readonly=${this.readonly}
        autocomplete=${this.autocomplete || 'off'}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-required=${this.required ? 'true' : 'false'}
        @input=${(e: Event) => this.x.handleInput(e)}
        @keydown=${(e: KeyboardEvent) => this.x.handleKeyDown(e)}
        @focus=${() => this.x.handleFocus()}
        @blur=${() => this.x.handleBlur()}
      />
    `;
  }
  private glassTextarea(): TemplateResult {
    const placeholderText = this.placeholder || this.gMsg.placeholder;
    const currentLength = this.value?.length || 0;
    return html`
      <textarea
        class="${this.glassInputClasses()} w-full resize-none py-2"
        .value=${this.value || ''}
        placeholder=${placeholderText}
        rows=${this.rows}
        ?disabled=${this.disabled || this.loading}
        ?readonly=${this.readonly}
        autocomplete=${this.autocomplete || 'off'}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-required=${this.required ? 'true' : 'false'}
        @input=${(e: Event) => this.x.handleInput(e)}
        @focus=${() => this.x.handleFocus()}
        @blur=${() => this.x.handleBlur()}
      ></textarea>
      ${this.maxLength !== null ? html`
        <div class="glass-tag-counter text-xs text-right mt-1" aria-live="polite">${currentLength} / ${this.maxLength}</div>
      ` : ''}
    `;
  }
  private glassEditMode(): TemplateResult {
    if (this.x.isMultiLine) {
      return html`<div class="${this.glassContainerClasses()} p-2">${this.glassPrefix()} ${this.glassTextarea()} ${this.glassSuffix()}</div>`;
    }
    return html`
      <div class="${this.glassContainerClasses()} p-2 min-h-[42px]" @click=${(e: Event) => this.x.handleContainerClick(e)}>
        <div class="flex flex-wrap items-center gap-2">
          ${this.glassPrefix()} ${this.glassTags()} ${this.glassInput()} ${this.glassSuffix()}
        </div>
      </div>
    `;
  }
  private glassViewMode(): TemplateResult {
    const displayValue = this.value && this.value.trim() !== '' ? this.value : this.gMsg.noValue;
    return html`
      <div class="glass-tag-view flex items-center gap-2 py-2 text-sm">
        ${this.glassPrefix()}<span>${displayValue}</span>${this.glassSuffix()}
      </div>
    `;
  }
  private glassHelper(): TemplateResult {
    if (!this.isEditing) return html``;
    if (this.error && this.error.length > 0) {
      return html`<p class="glass-error-text mt-1 text-xs" role="alert">${unsafeHTML(this.error)}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<div class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</div>`;
    }
    return html``;
  }
  private glassLoading(): TemplateResult {
    if (!this.loading) return html``;
    return html`
      <div class="glass-tag-loading absolute inset-0 flex items-center justify-center">
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    return html`
      <div class="w-full">
        ${this.glassLabel()}
        <div class="relative">
          ${this.isEditing ? this.glassEditMode() : this.glassViewMode()}
          ${this.glassLoading()}
        </div>
        ${this.glassHelper()}
      </div>
    `;
  }
}
