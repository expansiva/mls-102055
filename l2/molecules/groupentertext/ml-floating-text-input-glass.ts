/// <mls fileReference="_102055_/l2/molecules/groupentertext/ml-floating-text-input-glass.ts" enhancement="_102020_/l2/enhancementAura"/>
// =============================================================================
// ML FLOATING TEXT INPUT — GLASSMORPHISM por HERANÇA (mls-102055)
// =============================================================================
// Skill Group: groupEnterText
// Herda MlFloatingTextInputMolecule (mls-102040): máscara, label flutuante,
// prefix/suffix, view mode, estado (rawDisplay/isFocused). Sobrescreve só render().
// This molecule does NOT contain business logic.
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement } from 'lit/decorators.js';
import { MlFloatingTextInputMolecule } from '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';

interface FloatingTextInternals {
  rawDisplay: string;
  isFocused: boolean;
  handleInput(e: Event): void;
  handleBlur(): void;
  handleFocus(): void;
  getViewValue(): string;
  getLabelText(): string;
  getInputPlaceholder(labelText: string): string;
  shouldUseMask(): boolean;
}

@customElement('groupentertext--ml-floating-text-input-glass')
export class MlFloatingTextInputGlass extends MlFloatingTextInputMolecule {
  private gUid = `flt-glass-${Math.random().toString(36).slice(2, 9)}`;

  private get x(): FloatingTextInternals {
    return this as unknown as FloatingTextInternals;
  }

  // ---- helpers presentacionais (glass) — nomes próprios p/ não colidir com os private do pai ----
  private glassPrefix(): TemplateResult {
    if (!this.hasSlot('Prefix')) return html``;
    return html`<div class="glass-input-affix">${unsafeHTML(this.getSlotContent('Prefix'))}</div>`;
  }

  private glassSuffix(): TemplateResult {
    if (!this.hasSlot('Suffix') && !this.loading) return html``;
    return html`
      <div class="glass-input-affix flex items-center gap-2">
        ${this.hasSlot('Suffix') ? unsafeHTML(this.getSlotContent('Suffix')) : html``}
        ${this.loading ? html`<span class="glass-input-spinner inline-block h-4 w-4 animate-spin rounded-full"></span>` : html``}
      </div>
    `;
  }

  private glassFeedback(labelId: string): TemplateResult {
    if (!this.isEditing) return html``;
    if (this.error) {
      return html`<p id="${labelId}-error" class="glass-input-error mt-1 text-xs">${unsafeHTML(this.error)}</p>`;
    }
    if (this.hasSlot('Helper')) {
      return html`<p id="${labelId}-helper" class="glass-input-helper mt-1 text-xs">${unsafeHTML(this.getSlotContent('Helper'))}</p>`;
    }
    return html``;
  }

  private glassInlineLabel(labelText: string, labelId: string): TemplateResult {
    if (!labelText) return html``;
    const labelClasses = [
      this.hasSlot('Prefix') ? 'left-10' : 'left-3',
      'glass-input-inline-label',
      'absolute pointer-events-none top-1/2 -translate-y-1/2 text-sm transition-all',
      this.disabled || this.loading ? 'opacity-50' : '',
    ].filter(Boolean).join(' ');
    return html`<label id="${labelId}" class="${labelClasses}">${unsafeHTML(labelText)}</label>`;
  }

  private glassFloatingLabel(labelText: string, labelId: string): TemplateResult {
    if (!labelText) return html``;
    return html`<label id="${labelId}" class="glass-input-floating-label mb-1 block text-xs">${unsafeHTML(labelText)}</label>`;
  }

  private glassContainerClasses(hasInlineLabel: boolean): string {
    return [
      'glass-input-container relative flex w-full items-center gap-2',
      hasInlineLabel ? 'pt-4 pb-1 px-3' : 'py-2 px-3',
      this.error ? 'is-error' : '',
      this.disabled || this.loading ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');
  }

  private glassInputClasses(): string {
    return ['glass-input-field flex-1 bg-transparent outline-none text-sm', this.readonly ? 'is-readonly' : ''].filter(Boolean).join(' ');
  }

  // ===========================================================================
  // RENDER (override) — lógica/estado/format herdados via this.x
  // ===========================================================================
  render() {
    const x = this.x;
    const labelText = x.getLabelText();
    const labelId = `${this.gUid}-label`;

    if (!this.isEditing) {
      return html`
        <div class="w-full">
          ${labelText ? html`<div class="glass-input-view-label mb-1 text-sm">${unsafeHTML(labelText)}</div>` : html``}
          <div class="glass-input-view-value flex items-center gap-2 text-sm">
            ${this.glassPrefix()}
            <span>${x.getViewValue()}</span>
            ${this.glassSuffix()}
          </div>
        </div>
      `;
    }

    const floating = x.isFocused || Boolean(this.value);
    const showFloatingLabel = Boolean(labelText) && floating;
    const showInlineLabel = Boolean(labelText) && !floating;
    const inputValue = x.shouldUseMask() ? x.rawDisplay : this.value;
    const inputPlaceholder = x.getInputPlaceholder(labelText);
    const inputDisabled = this.disabled || this.loading;
    const describedBy = this.error ? `${labelId}-error` : this.hasSlot('Helper') ? `${labelId}-helper` : undefined;

    return html`
      <div class="w-full">
        <div class="min-h-[1rem]">${showFloatingLabel ? this.glassFloatingLabel(labelText, labelId) : html``}</div>
        <div class="${this.glassContainerClasses(showInlineLabel)}">
          ${showInlineLabel ? this.glassInlineLabel(labelText, labelId) : html``} ${this.glassPrefix()}
          <input
            class="${this.glassInputClasses()}"
            type="${this.inputType}"
            .value="${inputValue}"
            placeholder="${inputPlaceholder}"
            maxlength=${ifDefined(this.maxLength ?? undefined)}
            minlength=${ifDefined(this.minLength ?? undefined)}
            name="${this.name}"
            autocomplete="${this.autocomplete}"
            ?disabled=${inputDisabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            aria-labelledby=${ifDefined(labelText ? labelId : undefined)}
            aria-describedby=${ifDefined(describedBy)}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-required=${this.required ? 'true' : 'false'}
            @input=${(e: Event) => x.handleInput(e)}
            @blur=${() => x.handleBlur()}
            @focus=${() => x.handleFocus()}
          />
          ${this.glassSuffix()}
        </div>
        ${this.glassFeedback(labelId)}
      </div>
    `;
  }
}
