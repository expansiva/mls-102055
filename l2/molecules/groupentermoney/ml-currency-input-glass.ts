/// <mls fileReference="_102055_/l2/molecules/groupentermoney/ml-currency-input-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// CURRENCY INPUT — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupEnterMoney
// Herda GroupEnterMoneyMlCurrencyInputMolecule (mls-102040): parsing BigInt,
// clamp min/max, formatação Intl, estado (rawValue). Sobrescreve só render().
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { GroupEnterMoneyMlCurrencyInputMolecule } from '/_102040_/l2/molecules/groupentermoney/ml-currency-input.js';

/// **collab_i18n_start**
const message_en = { loading: 'Loading...', placeholder: 'Enter amount', noValue: '—' };
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: { loading: 'Carregando...', placeholder: 'Digite o valor', noValue: '—' },
};
/// **collab_i18n_end**

interface CurrencyInternals {
  rawValue: string;
  onFocus(e: FocusEvent): void;
  onInput(e: InputEvent): void;
  onBlur(): void;
  formatNumber(num: number | null): string;
  formatToRaw(num: number | null): string;
}

@customElement('groupentermoney--ml-currency-input-glass')
export class CurrencyInputGlass extends GroupEnterMoneyMlCurrencyInputMolecule {
  private gMsg: MessageType = messages.en;
  private gUid = `cur-glass-${Math.random().toString(36).slice(2, 9)}`;

  private get x(): CurrencyInternals {
    return this as unknown as CurrencyInternals;
  }

  private glassInputClasses(): string {
    return [
      'glass-cur-input w-full px-3 py-2 text-sm',
      this.error ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }
  private glassContainerClasses(): string {
    return ['relative', this.loading ? 'is-loading' : ''].filter(Boolean).join(' ');
  }

  private glassLabel(): TemplateResult | typeof nothing {
    if (!this.hasSlot('Label')) return nothing;
    return html`<label id="${this.gUid}-label" class="glass-cur-label block mb-1 text-sm font-medium">
      ${unsafeHTML(this.getSlotContent('Label'))}
    </label>`;
  }
  private glassHelperOrError(): TemplateResult | typeof nothing {
    const describedId = `${this.gUid}-desc`;
    if (this.error) {
      return html`<p id="${describedId}" class="glass-error-text mt-1 text-xs">${unsafeHTML(this.error)}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id="${describedId}" class="glass-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return nothing;
  }
  private glassInput(): TemplateResult {
    const describedId = this.error || this.hasSlot('Helper') ? `${this.gUid}-desc` : undefined;
    const placeholder = this.placeholder || this.getSlotAttr('Label', 'placeholder') || this.gMsg.placeholder;
    return html`
      <input
        id="${this.gUid}-input"
        name="${this.name}"
        class="${this.glassInputClasses()}"
        .value=${this.x.rawValue}
        ?disabled=${this.disabled || this.loading}
        ?readonly=${this.readonly}
        placeholder="${placeholder}"
        maxlength="20"
        aria-labelledby="${this.hasSlot('Label') ? `${this.gUid}-label` : undefined}"
        aria-describedby="${describedId}"
        aria-invalid="${this.error ? 'true' : 'false'}"
        aria-required="${this.required ? 'true' : 'false'}"
        @focus="${(e: FocusEvent) => this.x.onFocus(e)}"
        @input="${(e: InputEvent) => this.x.onInput(e)}"
        @blur="${() => this.x.onBlur()}"
      />
    `;
  }
  private glassViewMode(): TemplateResult {
    const display = this.value === null ? this.gMsg.noValue : this.x.formatNumber(this.value);
    return html`<span class="glass-cur-view block w-full text-sm">${unsafeHTML(display)}</span>`;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];
    if (this.x.rawValue === '' && this.value !== null) {
      this.x.rawValue = this.x.formatToRaw(this.value);
    }
    return html`
      <div class="${this.glassContainerClasses()}">
        ${this.glassLabel()}
        ${this.isEditing ? this.glassInput() : this.glassViewMode()}
        ${this.glassHelperOrError()}
        ${this.loading
          ? html`<div class="glass-cur-loading absolute inset-0 flex items-center justify-center"><span class="text-sm">${this.gMsg.loading}</span></div>`
          : nothing}
      </div>
    `;
  }
}
