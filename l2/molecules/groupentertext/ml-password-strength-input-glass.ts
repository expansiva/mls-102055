/// <mls fileReference="_102055_/l2/molecules/groupentertext/ml-password-strength-input-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// PASSWORD STRENGTH INPUT — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupEnterText
// Herda PasswordStrengthInputMolecule (mls-102040): máscara, visibilidade,
// cálculo de força/critérios, estado. Sobrescreve só render().
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { PasswordStrengthInputMolecule } from '/_102040_/l2/molecules/groupentertext/ml-password-strength-input.js';

/// **collab_i18n_start**
const message_en = {
  placeholder: 'Enter password',
  emptyValue: '—',
  maskedValue: '••••••••',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  strengthWeak: 'Weak',
  strengthMedium: 'Medium',
  strengthStrong: 'Strong',
  strengthVeryStrong: 'Very Strong',
  criteriaMinLength: 'Minimum length',
  criteriaUppercase: 'Uppercase letter',
  criteriaNumber: 'Number',
  criteriaSymbol: 'Symbol',
  loading: 'Loading...',
};
type MessageType = typeof message_en;
const messages: Record<string, MessageType> = {
  en: message_en,
  pt: {
    placeholder: 'Digite a senha',
    emptyValue: '—',
    maskedValue: '••••••••',
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
    strengthWeak: 'Fraca',
    strengthMedium: 'Média',
    strengthStrong: 'Forte',
    strengthVeryStrong: 'Muito Forte',
    criteriaMinLength: 'Comprimento mínimo',
    criteriaUppercase: 'Letra maiúscula',
    criteriaNumber: 'Número',
    criteriaSymbol: 'Símbolo',
    loading: 'Carregando...',
  },
};
/// **collab_i18n_end**

type StrengthLevel = 'weak' | 'medium' | 'strong' | 'veryStrong';
interface CriteriaStatus {
  minLength: boolean;
  uppercase: boolean;
  number: boolean;
  symbol: boolean;
}

interface PasswordInternals {
  isPasswordVisible: boolean;
  isFocused: boolean;
  rawDisplay: string;
  handleInput(e: Event): void;
  handleFocus(): void;
  handleBlur(): void;
  togglePasswordVisibility(): void;
  getCriteriaStatus(): CriteriaStatus;
  getStrengthLevel(c: CriteriaStatus): StrengthLevel;
}

@customElement('groupentertext--ml-password-strength-input-glass')
export class PasswordStrengthInputGlass extends PasswordStrengthInputMolecule {
  private gMsg: MessageType = messages.en;

  private get x(): PasswordInternals {
    return this as unknown as PasswordInternals;
  }

  private strengthLabel(level: StrengthLevel): string {
    switch (level) {
      case 'weak': return this.gMsg.strengthWeak;
      case 'medium': return this.gMsg.strengthMedium;
      case 'strong': return this.gMsg.strengthStrong;
      case 'veryStrong': return this.gMsg.strengthVeryStrong;
    }
  }

  // ---- classes/render glass (nomes próprios) ----
  private glassContainerClasses(): string {
    return ['glass-pw w-full', this.disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }
  private glassWrapperClasses(): string {
    return [
      'glass-pw-wrapper flex items-center w-full',
      this.error ? 'is-error' : '',
      this.x.isFocused ? 'is-focused' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
      this.readonly ? 'is-readonly' : '',
    ].filter(Boolean).join(' ');
  }
  private glassInputClasses(): string {
    return ['glass-pw-input flex-1 w-full px-3 py-2 text-sm', this.disabled || this.loading ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }
  private glassToggleClasses(): string {
    return ['glass-pw-toggle flex items-center justify-center w-10 h-10', this.disabled || this.loading ? 'is-disabled' : ''].filter(Boolean).join(' ');
  }
  private glassBarClasses(level: StrengthLevel): string {
    return ['glass-pw-bar', `is-${level}`].join(' ');
  }
  private glassTextClasses(level: StrengthLevel): string {
    return ['glass-pw-strength-text text-xs font-medium', `is-${level}`].join(' ');
  }
  private glassCriteriaClasses(isMet: boolean): string {
    return ['glass-pw-criteria flex items-center gap-2 text-xs', isMet ? 'is-met' : ''].filter(Boolean).join(' ');
  }

  private glassLabel(): TemplateResult {
    if (!this.hasSlot('Label')) return html``;
    return html`
      <label class="glass-pw-label block mb-1.5 text-sm font-medium" id="label-${this.name}">
        ${unsafeHTML(this.getSlotContent('Label'))}
        ${this.required ? html`<span class="glass-pw-req ml-0.5">*</span>` : html``}
      </label>
    `;
  }
  private glassPrefix(): TemplateResult {
    if (!this.hasSlot('Prefix')) return html``;
    return html`<span class="glass-pw-affix flex items-center pl-3">${unsafeHTML(this.getSlotContent('Prefix'))}</span>`;
  }
  private glassSuffix(): TemplateResult {
    if (!this.hasSlot('Suffix')) return html``;
    return html`<span class="glass-pw-affix flex items-center pr-1">${unsafeHTML(this.getSlotContent('Suffix'))}</span>`;
  }
  private glassToggleButton(): TemplateResult {
    if (this.rows > 1 || this.readonly) return html``;
    const iconPath = this.x.isPasswordVisible
      ? 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
      : 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z';
    return html`
      <button
        type="button"
        class=${this.glassToggleClasses()}
        @click=${() => this.x.togglePasswordVisibility()}
        ?disabled=${this.disabled || this.loading}
        aria-label=${this.x.isPasswordVisible ? this.gMsg.hidePassword : this.gMsg.showPassword}
        tabindex="-1"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d=${iconPath} />
        </svg>
      </button>
    `;
  }
  private glassInput(): TemplateResult {
    const placeholderText = this.placeholder || this.gMsg.placeholder;
    const inputType = this.x.isPasswordVisible ? 'text' : 'password';
    const displayValue = this.mask ? this.x.rawDisplay : this.value;
    return html`
      <div class=${this.glassWrapperClasses()}>
        ${this.glassPrefix()}
        <input
          type=${inputType}
          class=${this.glassInputClasses()}
          .value=${displayValue}
          placeholder=${placeholderText}
          ?disabled=${this.disabled || this.loading}
          ?readonly=${this.readonly}
          ?required=${this.required}
          name=${this.name}
          autocomplete=${this.autocomplete || 'off'}
          aria-labelledby=${this.hasSlot('Label') ? `label-${this.name}` : ''}
          aria-describedby=${this.error ? `error-${this.name}` : ''}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-required=${this.required ? 'true' : 'false'}
          @input=${(e: Event) => this.x.handleInput(e)}
          @focus=${() => this.x.handleFocus()}
          @blur=${() => this.x.handleBlur()}
        />
        ${this.glassSuffix()} ${this.glassToggleButton()}
      </div>
    `;
  }
  private glassStrengthIndicator(): TemplateResult {
    if (this.loading) return html``;
    const criteria = this.x.getCriteriaStatus();
    const level = this.x.getStrengthLevel(criteria);
    return html`
      <div class="mt-3 space-y-2">
        <div class="flex items-center gap-3">
          <div class="glass-pw-track flex-1 h-2 overflow-hidden">
            <div class=${this.glassBarClasses(level)}></div>
          </div>
          <span class=${this.glassTextClasses(level)}> ${this.strengthLabel(level)} </span>
        </div>
        <div class="grid grid-cols-2 gap-1">
          ${this.glassCriteriaItem(criteria.minLength, this.minLength !== null ? `${this.gMsg.criteriaMinLength} (${this.minLength})` : this.gMsg.criteriaMinLength)}
          ${this.glassCriteriaItem(criteria.uppercase, this.gMsg.criteriaUppercase)}
          ${this.glassCriteriaItem(criteria.number, this.gMsg.criteriaNumber)}
          ${this.glassCriteriaItem(criteria.symbol, this.gMsg.criteriaSymbol)}
        </div>
      </div>
    `;
  }
  private glassCriteriaItem(isMet: boolean, label: string): TemplateResult {
    const iconPath = isMet ? 'M4.5 12.75l6 6 9-13.5' : 'M6 18L18 6M6 6l12 12';
    return html`
      <div class=${this.glassCriteriaClasses(isMet)}>
        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d=${iconPath} />
        </svg>
        <span>${label}</span>
      </div>
    `;
  }
  private glassHelper(): TemplateResult {
    if (!this.hasSlot('Helper')) return html``;
    return html`<p class="glass-helper mt-1.5 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
  }
  private glassErrorMsg(): TemplateResult {
    if (!this.error) return html``;
    return html`<p class="glass-error-text mt-1.5 text-xs" id="error-${this.name}" role="alert">${unsafeHTML(String(this.error))}</p>`;
  }
  private glassLoading(): TemplateResult {
    return html`
      <div class="glass-pw-loading flex items-center justify-center py-4">
        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-2 text-sm">${this.gMsg.loading}</span>
      </div>
    `;
  }
  private glassViewMode(): TemplateResult {
    const displayValue = this.value ? this.gMsg.maskedValue : this.gMsg.emptyValue;
    return html`
      <div class="flex items-center gap-2">
        ${this.glassPrefix()}
        <span class="glass-pw-view text-sm">${displayValue}</span>
        ${this.glassSuffix()}
      </div>
    `;
  }

  // ===========================================================================
  // RENDER (override)
  // ===========================================================================
  render() {
    const lang = this.getMessageKey(messages);
    this.gMsg = messages[lang];

    if (!this.isEditing) {
      return html`<div class=${this.glassContainerClasses()}>${this.glassLabel()} ${this.glassViewMode()}</div>`;
    }
    if (this.loading) {
      return html`<div class=${this.glassContainerClasses()}>${this.glassLabel()} ${this.glassLoading()}</div>`;
    }
    return html`
      <div class=${this.glassContainerClasses()}>
        ${this.glassLabel()} ${this.glassInput()} ${this.glassStrengthIndicator()}
        ${this.error ? this.glassErrorMsg() : this.glassHelper()}
      </div>
    `;
  }
}
