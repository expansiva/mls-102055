/// <mls fileReference="_102055_/l2/molecules/groupenternumber/ml-number-stepper-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// NUMBER STEPPER — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupEnterNumber
// Herda NumberStepperMolecule (mls-102040): parse/format, clamp, increment/decrement,
// estado (rawValue). Sobrescreve só render().
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { NumberStepperMolecule } from '/_102040_/l2/molecules/groupenternumber/ml-number-stepper.js';

/// **collab_i18n_start**
const message_en = { increment: 'Increment', decrement: 'Decrement', loading: 'Loading...', required: 'Required', emptyValue: '—' };
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: { increment: 'Incrementar', decrement: 'Decrementar', loading: 'Carregando...', required: 'Obrigatório', emptyValue: '—' },
};
/// **collab_i18n_end**

interface NumberStepperInternals {
  rawValue: string;
  handleInput(e: Event): void;
  handleBlur(): void;
  handleFocus(): void;
  increment(): void;
  decrement(): void;
  formatToDisplay(value: number | null): string;
}

@customElement('groupenternumber--ml-number-stepper-glass')
export class NumberStepperGlass extends NumberStepperMolecule {
  private gMsg: MessageType = messages.en;
  private gUid = `ns-glass-${Math.random().toString(36).slice(2, 9)}`;
  private get gLabelId() { return `${this.gUid}-label`; }
  private get gHelperId() { return `${this.gUid}-helper`; }
  private get gErrorId() { return `${this.gUid}-error`; }
  private get gInputId() { return `${this.gUid}-input`; }

  private get x(): NumberStepperInternals {
    return this as unknown as NumberStepperInternals;
  }

  private glassInputClasses(hasError: boolean): string {
    return [
      'glass-ns-input w-full flex-1 px-3 py-2 text-sm outline-none',
      hasError ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }
  private glassButtonClasses(): string {
    return 'glass-ns-btn h-9 w-9 inline-flex items-center justify-center text-sm';
  }
  private glassContainerClasses(): string {
    return ['w-full', this.disabled || this.loading ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }

  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`<label id="${this.gLabelId}" class="glass-ns-label mb-1 block text-sm">${unsafeHTML(this.getSlotContent('Label'))}</label>`;
  }
  private glassHelperOrError(effectiveError: string): TemplateResult {
    if (String(effectiveError).length > 0) {
      return html`<p id="${this.gErrorId}" class="glass-error-text mt-1 text-xs">${unsafeHTML(String(effectiveError))}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id="${this.gHelperId}" class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }
  private glassPrefix(): TemplateResult {
    if (!this.hasSlot('Prefix')) return html``;
    return html`<span class="glass-ns-affix text-sm">${unsafeHTML(this.getSlotContent('Prefix'))}</span>`;
  }
  private glassSuffix(): TemplateResult {
    if (!this.hasSlot('Suffix')) return html``;
    return html`<span class="glass-ns-affix text-sm">${unsafeHTML(this.getSlotContent('Suffix'))}</span>`;
  }
  private glassViewMode(): TemplateResult {
    const display = this.value === null || this.value === undefined ? this.gMsg.emptyValue : this.x.formatToDisplay(this.value);
    return html`
      <div class="${this.glassContainerClasses()}">
        ${this.glassLabel()}
        <div class="glass-ns-view flex items-center gap-2 text-sm">
          ${this.glassPrefix()}<span>${display}</span>${this.glassSuffix()}
        </div>
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    if (!this.isEditing) return this.glassViewMode();

    const effectiveError =
      this.error || (this.required && (this.value === null || this.value === undefined) ? this.gMsg.required : '');
    const hasError = String(effectiveError).length > 0;
    const ariaDescribedBy = hasError ? this.gErrorId : this.hasSlot('Helper') ? this.gHelperId : undefined;
    const placeholder = this.placeholder || '';

    return html`
      <div class="${this.glassContainerClasses()}">
        ${this.glassLabel()}
        <div class="flex items-center gap-2">
          ${this.glassPrefix()}
          <input
            id="${this.gInputId}"
            class="${this.glassInputClasses(hasError)}"
            type="text"
            inputmode="${this.decimals > 0 ? 'decimal' : 'numeric'}"
            .value=${this.x.rawValue}
            placeholder="${this.value === null ? placeholder : ''}"
            ?disabled=${this.disabled || this.loading}
            ?readonly=${this.readonly}
            aria-labelledby="${this.hasSlot('Label') ? this.gLabelId : nothing}"
            aria-describedby="${ariaDescribedBy || nothing}"
            aria-invalid="${hasError ? 'true' : 'false'}"
            aria-required="${this.required ? 'true' : 'false'}"
            @input=${(e: Event) => this.x.handleInput(e)}
            @blur=${() => this.x.handleBlur()}
            @focus=${() => this.x.handleFocus()}
          />
          ${this.glassSuffix()}
          <button type="button" class="${this.glassButtonClasses()}" aria-label="${this.gMsg.decrement}" ?disabled=${this.disabled || this.readonly || this.loading} @click=${() => this.x.decrement()}>−</button>
          <button type="button" class="${this.glassButtonClasses()}" aria-label="${this.gMsg.increment}" ?disabled=${this.disabled || this.readonly || this.loading} @click=${() => this.x.increment()}>+</button>
        </div>
        ${this.loading ? html`<div class="glass-ns-loading mt-2 text-xs">${this.gMsg.loading}</div>` : this.glassHelperOrError(effectiveError)}
      </div>
    `;
  }
}
